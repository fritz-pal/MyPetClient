import { useNavigate, useParams } from "react-router"
import { Medication, Pet, PetAPI, Pets } from "../models/Pet";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
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
    const handleClick = () => {
        if (!isJumping) {
            setIsJumping(true);
            setTimeout(() => setIsJumping(false), 500); // Animation dauert 0.5s
        }
    };

    const openUser = () => {
        navigate("/user/" + petQuery.data?.owner.id);
    }
    const { id } = useParams();

    const petQuery = useQuery({
        queryKey: ["pets", id],
        queryFn: () => PetAPI.getPetByID(id ? Number(id) : 0)
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
                        value={petQuery.data?.name}
                    />
                    <div className="pet-profile">{petQuery.data?.dateOfBirth}</div>
                </div>
                <ReminderList id={Number(petQuery.data?.id)}>
                </ReminderList>

            </div>
        </div>
    );
}

export default PetProfile;

const PetAttributeElement = ({ key, value }: { key: string, value: string | undefined }) => {

    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [t, _] = useTranslation("reminders");
    const [z, _z] = useTranslation("addPet");
    const { id } = useParams();

    return (
        <div className="pet-profile-text-container"><div className="pet-profile-text">{z(key)}</div>
            <div className="pet-profile">
                {isButtonPressed && (
                    <div>
                        <input type="text" defaultValue={value} onChange={(e) => { value = e.target.value }
                        }
                        } />
                        <Button onPress={() => { setIsButtonPressed(false) }}>Save</Button>
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


