import { useNavigate, useParams } from "react-router"
import { Medication, PetAPI, Pets, UpdatePet } from "../models/Pet";
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
    const [petMedication, setPetMedication] = useState<Medication[]>([]);
    const { id } = useParams();
    const queryClient = useQueryClient();
    const petImageFile = useFile(null);
    const [stringArray, setStringArray] = useState<string[]>([]);





    const handleClick = () => {
        if (!isJumping) {
            setIsJumping(true);
            setTimeout(() => setIsJumping(false), 500); // Animation dauert 0.5s
        }
    };

    const openUser = () => {
        navigate("/user/" + petQuery.data?.owner.id);
    }

    const petQuery = useQuery({
        queryKey: ["pets", id],
        queryFn: () => PetAPI.getPetByID(id ? Number(id) : 0)
    });


    const petUpdate = useMutation({
        mutationFn: ({ pet, file }: { pet: UpdatePet, file?: File | undefined }) => PetAPI.updatePet(Pets.PetToJSONPet(pet), file),
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["pets", id]
            });
        }
    });

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
                    <ImageSelector className={`add-pet-image ${isJumping ? 'jump' : ''}`} fileHook={petImageFile} placeHolderImage={petQuery.data && petQuery.data.imageSource ? petQuery.data.imageSource : placeholderImage} />
                    <button className="test-button-jump" onClick={handleClick}>HEY</button>
                    <Button onPress={() => { return petQuery.data?.species.typeOfSize && petQuery.data.species.unitSize ? stringArray.push(petQuery.data.species.typeOfSize) && stringArray.push(petQuery.data?.species.unitSize) : null; }}>Hallo</Button>
                    <Button onPress={() => { setPetMedication(petQuery.data?.medications ? petQuery.data.medications : []); console.log(petMedication); console.log(stringArray) }}></Button>
                    <PetAttributeElement
                        attributeKey="isMale"
                        value={petQuery.data?.isMale?.toString()}
                        unit={stringArray}
                        onSave={(newValue) => {
                            if (petQuery.data && petImageFile.file !== null) {
                                const updatedPet = { ...petQuery.data, name: newValue };
                                petUpdate.mutate({
                                    pet: Pets.JSONPetToPet(updatedPet),
                                    file: petImageFile.file ? petImageFile.file : undefined,
                                });
                            }
                        }}
                    />
                    <div className="pet-profile">{petQuery.data?.species.typeOfSize}</div>
                    <div className="pet-profile">{petQuery.data?.species.unitSize}</div>

                    <PetAttributeElement
                        attributeKey="name"
                        value={petQuery.data?.name}
                        unit={stringArray}
                        onSave={(newValue) => {
                            if (petQuery.data && petImageFile.file !== null) {
                                const updatedPet = { ...petQuery.data, name: newValue };
                                console.log(petImageFile)
                                petUpdate.mutate({
                                    pet: Pets.JSONPetToPet(updatedPet),
                                    file: petImageFile.file ? petImageFile.file : undefined,
                                });
                            }
                        }}
                    />
                    <PetAttributeElement
                        attributeKey="subSpecies"
                        value={petQuery.data?.subSpecies}
                        unit={stringArray}
                        onSave={(newValue) => {
                            if (petQuery.data && petImageFile.file !== null) {
                                const updatedPet = { ...petQuery.data, subSpecies: newValue };
                                petUpdate.mutate({
                                    pet: Pets.JSONPetToPet(updatedPet),
                                    file: petImageFile.file ? petImageFile.file : undefined,
                                });
                            }
                        }}
                    />
                    <PetAttributeElement
                        attributeKey="size"
                        value={petQuery.data?.size?.toString()}
                        unit={stringArray}
                        onSave={(newValue) => {
                            if (petQuery.data && petImageFile.file !== null) {
                                const updatedPet = { ...petQuery.data, size: Number(newValue) };
                                petUpdate.mutate({
                                    pet: Pets.JSONPetToPet(updatedPet),
                                    file: petImageFile.file ? petImageFile.file : undefined,
                                });
                            }
                        }}
                    />
                    <PetAttributeElement
                        attributeKey="name"
                        value={petQuery.data?.name}
                        unit={stringArray}
                        onSave={(newValue) => {
                            if (petQuery.data && petImageFile.file !== null) {
                                const updatedPet = { ...petQuery.data, name: newValue };
                                petUpdate.mutate({
                                    pet: Pets.JSONPetToPet(updatedPet)
                                });
                            }
                        }}
                    />
                    <div className="pet-profile">{petQuery.data?.dateOfBirth}</div>
                </div>
                <ReminderList id={Number(petQuery.data?.id)} />
            </div>
        </div>
    );
}

export default PetProfile;

const PetAttributeElement = ({ attributeKey, value, unit, onSave }: { attributeKey: string, value: string | undefined, unit: string[], onSave: (newValue: string) => void }) => {

    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [z, _z] = useTranslation("addPet");
    const [inputValue, setInputValue] = useState(value);
    const [isMale, setIsMale] = useState(false);
    const [castrated, setCastrated] = useState(false);

    useEffect(() => {
        if (value === "true") {
            if (attributeKey === "isMale") {
                setIsMale(true);
            }
            if (attributeKey === "castrated") {
                setCastrated(true);
            }
        } else if (value === "false") {
            if (attributeKey === "isMale") {
                setIsMale(false);
            }
            if (attributeKey === "castrated") {
                setCastrated(false);
            }
        }
    }, [value, attributeKey]);



    return (
        <div className="pet-profile-text-container"><div className="pet-profile-text">{z(attributeKey)}</div>
            <div className="pet-profile">
                {isButtonPressed && (
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
                {!isButtonPressed &&
                    <>
                        <div className="pet-profile">{value ? value : "-"}</div>
                        <Button onPress={() => { setIsButtonPressed(true) }}>Edit</Button>
                    </>
                }
            </div>
        </div>
    );
}


