import { useNavigate, useParams } from "react-router"
import { Medication, Pet, PetAPI, Pets } from "../models/Pet";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import RoundImage from "./RoundImage";
import placeholderPet from '/placeholderPet.png';
import './css/PetProfile.css';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import noIcon from '/no-profile-picture-icon.webp';
import { Button } from "react-aria-components";
import ReminderList from "./ReminderList";



const PetProfile = () => {
    const [isJumping, setIsJumping] = useState(false);
    const navigate = useNavigate();
    const [petMedication, setPetMedication] = useState<Medication[]>([]);
    const { id } = useParams();
    const queryClient = useQueryClient();

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
        mutationFn: (pet: Pet) => PetAPI.updatePet(Pets.PetToJSONPet(pet)),
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
                    <RoundImage className={`pet-profile-image ${isJumping ? 'jump' : ''}`} imageSource={petQuery.data?.imageSource} placeholder={placeholderPet} />
                    <button className="test-button-jump" onClick={handleClick}>HEY</button>
                    <Button onPress={() => { setPetMedication(petQuery.data?.medications ? petQuery.data.medications : []); console.log(petMedication) }}></Button>
                    <PetAttributeElement
                        key="name"
                        attributeKey="name"
                        value={petQuery.data?.name}
                        onSave={(newValue) => {
                            if (petQuery.data) {
                                const updatedPet = { ...petQuery.data, name: newValue };
                                petUpdate.mutate(Pets.JSONPetToPet(updatedPet));
                            }
                        }}
                    />
                    <div className="pet-profile">{petQuery.data?.dateOfBirth}</div>
                </div>
                <ReminderList id={Number(petQuery.data?.id)}/>
            </div>
        </div>
    );
}

export default PetProfile;

const PetAttributeElement = ({ attributeKey, value, onSave }: { attributeKey: string, value: string | undefined, onSave: (newValue: string) => void }) => {

    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [t, _] = useTranslation("reminders");
    const [z, _z] = useTranslation("addPet");
    const [inputValue, setInputValue] = useState(value);

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
                                onSave(inputValue || ""); }}>Save</Button>
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


