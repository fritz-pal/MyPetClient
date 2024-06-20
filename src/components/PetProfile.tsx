import { useParams } from "react-router";
import { PetAPI, Pets, Pet } from "../models/Pet";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import './css/PetProfile.css';
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import ReminderList from "./ReminderList";
import ImageSelector from "./ImageSelector";
import useFile from "../hooks/useFile";
import placeholderImage from '/placeholderPet.png';
import PosterInfo from "./PosterInfo";
import Loader from "./Loader";
import RoundImage from "./RoundImage";
import { Button } from "react-aria-components";
import { UserContext } from "../context/UserContext";

const PetProfile = () => {
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const queryClient = useQueryClient();
    const petImageFile = useFile(null);
    const [t] = useTranslation("petProfile");
    const [s] = useTranslation("species"); 

    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState("");
    const [isMale, setIsMale] = useState(false);
    const [isCastrated, setIsCastrated] = useState(false);
    const [subSpecies, setSubSpecies] = useState("");
    const [size, setSize] = useState<number | undefined>(0);
    const [weight, setWeight] = useState<number | undefined>(0);

    const petQuery = useQuery({
        queryKey: ["pets", id],
        queryFn: () => PetAPI.getPetByID(id ? Number(id) : 0)
    });

    const openEdit = () => {
        if (petQuery.data) {
            setName(petQuery.data.name);
            setIsMale(petQuery.data.isMale);
            setIsCastrated(petQuery.data.castrated);
            setSubSpecies(petQuery.data.subSpecies);
            setSize(petQuery.data.size);
            setWeight(petQuery.data.weight);
        }
        setIsEditing(true);
    }

    const petUpdate = useMutation({
        mutationFn: (pet: Pet) => PetAPI.updatePet(Pets.PetToJSONPet(pet)),
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["pets", id]
            });
        }
    });

    if (petQuery.isLoading) {
        return <Loader/>;
    }

    if (petQuery.error) {
        return <div>Error: {petQuery.error.message}</div>;
    }

    if (!petQuery.isSuccess) {
        return <>Error</>;
    }

    return (
        <div className="pet-profile scroll-page">
            <div className="pet-profile-main">
                <PosterInfo poster={petQuery.data.owner}/>
                { !isEditing ? 
                    <RoundImage className="pet-profile-image" imageSource={petQuery.data.imageSource} placeholder={placeholderImage}/> :
                    <ImageSelector
                        className="pet-profile-image"
                        fileHook={petImageFile}
                        placeHolderImage={petQuery.data.imageSource ? petQuery.data.imageSource : placeholderImage}
                    />
                }
                <div className="pet-profile-text-container">
                    <div className="pet-profile-text">{t("name")}</div>
                    {isEditing ?
                        <div className="pet-profile-attribute"><input type="text" value={name} onChange={(e) => setName(e.target.value)}></input></div> :
                        <div className="pet-profile-attribute">{petQuery.data.name}</div>
                    }
                </div>

                <div className="pet-profile-text-container">
                    <div className="pet-profile-text">{t("gender")}</div>
                    {isEditing ?
                        <div className="pet-profile-attribute">
                            <input type="radio" name="gender" value="male" onChange={(e) => setIsMale(e.target.value == "male")} checked={isMale}/>
                            <label>{t("male")}</label><br/>
                            <input type="radio" name="gender" value="female" onChange={(e) => setIsMale(e.target.value == "male")} checked={!isMale}/>
                            <label>{t("female")}</label><br/><br/>
                            <input type="checkbox" onChange={(e) => setIsCastrated(e.target.checked)} checked={isCastrated}></input>
                            <label>{t("castrated")}</label>
                        </div> :
                        <div className="pet-profile-attribute">
                            {t(petQuery.data.isMale ? "male" : "female")}
                            {petQuery.data.castrated && " (" + t("castrated") + ")"}
                        </div>
                    }
                </div>

                <div className="pet-profile-text-container">
                    <div className="pet-profile-text">{t("species")}</div>
                    <div className="pet-profile-attribute">
                        {s(petQuery.data.species.name)}
                    </div>
                </div>

                <div className="pet-profile-text-container">
                    <div className="pet-profile-text">{t("subSpecies")}</div>
                    {isEditing ?
                        <div className="pet-profile-attribute"><input type="text" onChange={(e) => setSubSpecies(e.target.value)} value={subSpecies}/></div> :
                        <div className="pet-profile-attribute">
                            {petQuery.data.subSpecies.length == 0 ? "-" : petQuery.data.subSpecies}
                        </div>
                    }
                </div>

                <div className="pet-profile-text-container">
                    <div className="pet-profile-text">{t(petQuery.data.species.typeOfSize ? petQuery.data.species.typeOfSize : "size")}</div>
                    {isEditing ?
                        <div className="pet-profile-attribute"><input type="text"/></div> :
                        <div className="pet-profile-attribute">
                            {petQuery.data.size ?
                                petQuery.data.species.unitSize ? petQuery.data.size + " " + t(petQuery.data.species.unitSize) : petQuery.data.size :
                                "-"
                            }
                        </div>
                    }
                </div>

                <div className="pet-profile-text-container">
                    <div className="pet-profile-text">{t("weight")}</div>
                    {isEditing ?
                        <div className="pet-profile-attribute"><input type="text"></input></div> :
                        <div className="pet-profile-attribute">
                            {petQuery.data.weight ?
                                petQuery.data.species.unitWeight ? petQuery.data.weight + " " + t(petQuery.data.species.unitWeight) : petQuery.data.weight :
                                "-"
                            }
                        </div>
                    }
                </div>

                {(petQuery.data.owner.id == user.id) && <div className="pet-profile-button-bar">
                    {!isEditing ?
                        <Button>{t("edit")}</Button> :
                        <>
                            {/*<Button>{t("cancel")}</Button>
                            <Button>{t("save")}</Button>*/}
                        </>
                    }
                </div>}
            </div>
            <ReminderList id={petQuery.data.id} />
        </div>
    );
};

export default PetProfile;


