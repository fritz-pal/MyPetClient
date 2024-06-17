import { useNavigate, useParams } from "react-router";
import { PetAPI, Pets, Pet } from "../models/Pet";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import './css/PetProfile.css';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import noIcon from '/no-profile-picture-icon.webp';
import { Button } from "react-aria-components";
import ReminderList from "./ReminderList";
import ImageSelector from "./ImageSelector";
import useFile from "../hooks/useFile";
import placeholderImage from '/placeholderPet.png';

const PetProfile = () => {
    const [isJumping, setIsJumping] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const petImageFile = useFile(null);
    const [stringArray, setStringArray] = useState<string[]>([]);

    const handleClick = () => {
        if (!isJumping) {
            setIsJumping(true);
            setTimeout(() => setIsJumping(false), 500);
        }
    };

    const openUser = () => {
        navigate("/user/" + petQuery.data?.owner.id);
    };

    const petQuery = useQuery({
        queryKey: ["pets", id],
        queryFn: () => PetAPI.getPetByID(id ? Number(id) : 0)
    });

    const petUpdate = useMutation({
        mutationFn: (pet: Pet) => PetAPI.updatePet(Pets.PetToJSONPet(pet)),
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["pets", id]
            });
        }
    });

    useEffect(() => {
        if (petQuery.data && petQuery.data.species) {
            const { typeOfSize, unitSize, unitWeight } = petQuery.data.species;
            const newArray: string[] = [];
            if (typeof typeOfSize === 'string') {
                newArray.push(typeOfSize);
            }
            if (typeof unitSize === 'string') {
                newArray.push(unitSize);
            }
            setStringArray(newArray);
            if (typeof unitWeight === 'string') {
                newArray.push(unitWeight);
            }
        } else {
            setStringArray([]);
        }
    }, [petQuery.data]);

    if (petQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (petQuery.error) {
        return <div>Error: {petQuery.error.message}</div>;
    }

    return (
        <div className="pet-profile-main scroll-page">
            <div className="pet-profile-container">
                <div className="pet-profile-attribute">
                    <Button className="poster-info-pet" onPress={openUser}>
                        <img className="poster-info-image" src={noIcon} />
                    </Button>
                    <ImageSelector
                        className={`add-pet-image ${isJumping ? 'jump' : ''}`}
                        fileHook={petImageFile}
                        placeHolderImage={petQuery.data && petQuery.data.imageSource ? petQuery.data.imageSource : placeholderImage}
                    />
                    <button className="test-button-jump" onClick={handleClick}>HEY</button>
                    <PetAttributeElement
                        attributeKey="isMale"
                        value={petQuery.data?.isMale?.toString()}
                        unit={stringArray}
                        onSave={(newValue) => {
                            if (petQuery.data) {
                                const updatedPet = { ...petQuery.data, isMale: Boolean(newValue) };
                                petUpdate.mutate(Pets.JSONPetToPet(updatedPet));
                            }
                        }}
                    />

                    <PetAttributeElement
                        attributeKey="name"
                        value={petQuery.data?.name}
                        unit={stringArray}
                        onSave={(newValue) => {
                            if (petQuery.data) {
                                const updatedPet = { ...petQuery.data, name: newValue };
                                petUpdate.mutate(Pets.JSONPetToPet(updatedPet));
                            }
                        }}
                    />
                    <PetAttributeElement
                        attributeKey="subSpecies"
                        value={petQuery.data?.subSpecies}
                        unit={stringArray}
                        onSave={(newValue) => {
                            if (petQuery.data) {
                                const updatedPet = { ...petQuery.data, subSpecies: newValue };
                                petUpdate.mutate(Pets.JSONPetToPet(updatedPet));
                            }
                        }}
                    />
                    <PetAttributeElement
                        attributeKey="size"
                        value={petQuery.data?.size?.toString()}
                        unit={stringArray}
                        onSave={(newValue) => {
                            if (petQuery.data) {
                                const updatedPet = { ...petQuery.data, size: Number(newValue) };
                                petUpdate.mutate(Pets.JSONPetToPet(updatedPet));
                            }
                        }}
                    />
                    <PetAttributeElement
                        attributeKey="castrated"
                        value={petQuery.data?.castrated?.toString()}
                        unit={stringArray}
                        onSave={(newValue) => {
                            if (petQuery.data) {
                                const updatedPet = { ...petQuery.data, castrated: Boolean(newValue) };
                                petUpdate.mutate(Pets.JSONPetToPet(updatedPet));
                            }
                        }}
                    />
                    <PetAttributeElement
                        attributeKey="weight"
                        value={petQuery.data?.weight?.toString()}
                        unit={stringArray}
                        onSave={(newValue) => {
                            if (petQuery.data) {
                                const updatedPet = { ...petQuery.data, weight: Number(newValue) };
                                petUpdate.mutate(Pets.JSONPetToPet(updatedPet));
                            }
                        }}
                    />
                </div>
                <ReminderList id={Number(petQuery.data?.id)} />
            </div>
        </div>
    );
};

export default PetProfile;


const PetAttributeElement = ({ attributeKey, value, unit, onSave }: { attributeKey: string, value: string | undefined, unit: string[], onSave: (newValue: string) => void }) => {

    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [z, _z] = useTranslation("addPet");
    const [inputValue, setInputValue] = useState(value);
    const [isMale, setIsMale] = useState(false);
    const [castrated, setCastrated] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [buttonBoolean, setButtonBoolean] = useState(false);
    const [buttonIsMale, setButtonIsMale] = useState(false);

    const isNumeric = () => {
        if (value && /^[0-9]+$/.test(value)) {
            return true;
        };
        return false;
    }


    useEffect(() => {
        if (attributeKey === "isMale" || attributeKey === "castrated") {
            setIsDisabled(false);
            setButtonBoolean(true);
            if (attributeKey === "isMale") {
                setButtonIsMale(true);
            }
            if (value === "true") {
                setIsButtonPressed(true);
                if (attributeKey === "isMale") {
                    setIsMale(true);
                }
                if (attributeKey === "castrated") {
                    setCastrated(true);
                }
            }
            else if (value === "false") {
                if (attributeKey === "isMale") {
                    setIsMale(false);
                }
                if (attributeKey === "castrated") {
                    setCastrated(false);
                }
            }
        }
    }, [value, attributeKey]);



    return (
        <div className="pet-profile-text-container"><div className="pet-profile-text">{z(attributeKey)}</div>
            <div className="pet-profile">
                {isButtonPressed && (
                    <>
                        {isDisabled && (
                            <div>
                                <input
                                    type="text"
                                    defaultValue={value}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <Button
                                    onPress={() => {
                                        setIsButtonPressed(false);
                                        onSave(inputValue || "");
                                    }}>Save</Button>
                            </div>
                        )}
                        {buttonBoolean && (
                            <>
                                {buttonIsMale && (
                                    <div>
                                        <Button className={"gender-button " + (isMale ? "selected" : "")} onPress={() => { setInputValue("true"); console.log(inputValue); }}>
                                            <svg fill="currentColor" viewBox="0 0 16 16" width="1em" height="1em">
                                                <path fillRule="evenodd" d="M9.5 2a.5.5 0 010-1h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2.707L9.871 6.836a5 5 0 11-.707-.707L13.293 2H9.5zM6 6a4 4 0 100 8 4 4 0 000-8z" />
                                            </svg>
                                        </Button>
                                        <Button className={"gender-button " + (isMale ? "" : "selected")} onPress={() => { setInputValue("false"); console.log(inputValue); }}>
                                            <svg fill="currentColor" viewBox="0 0 16 16" width="1em" height="1em">
                                                <path fillRule="evenodd" d="M8 1a4 4 0 100 8 4 4 0 000-8zM3 5a5 5 0 115.5 4.975V12h2a.5.5 0 010 1h-2v2.5a.5.5 0 01-1 0V13h-2a.5.5 0 010-1h2V9.975A5 5 0 013 5z" />
                                            </svg>
                                        </Button>
                                    </div>
                                )}
                                {!buttonIsMale && (
                                    <div>
                                        <input className="normal_checkbox" type="checkbox" defaultChecked={castrated} onChange={() => setInputValue("true")} />
                                    </div>
                                )}

                            </>
                        )}
                    </>
                )}
                {!isButtonPressed &&
                    <>
                        <div className="pet-profile">{isDisabled ? (isNumeric() ? (attributeKey === "size" ? z(unit[0]) + ": " + value + " " + z(unit[1]) : value + " " + z(unit[2])) : value) : (buttonIsMale ? (isMale ? z("isMale") : z("isFemale")) : (castrated ? z("castrated") : z("castratedNo")))}</div>
                        <Button onPress={() => { setIsButtonPressed(true) }}>Edit</Button>
                    </>
                }
            </div>
        </div>
    );
}


