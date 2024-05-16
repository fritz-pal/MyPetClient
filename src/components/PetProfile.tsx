import { useParams } from "react-router"
import { PetAPI } from "../models/Pet";
import { useQuery } from "@tanstack/react-query";
import RoundImage from "./RoundImage";
import placeholderPet from '/placeholderPet.png';
import './css/PetProfile.css';
import { useState } from "react";
import { ReminderAPI } from "../models/Reminder";
import Loader from "./Loader";


const PetProfile = () => {
    const [isJumping, setIsJumping] = useState(false);

    const handleClick = () => {
        if (!isJumping) {
            setIsJumping(true);
            setTimeout(() => setIsJumping(false), 500); // Animation dauert 0.5s
        }
    };
    const { id } = useParams();

    const petQuery = useQuery({
        queryKey: ["pets", id],
        queryFn: () => PetAPI.getPetByID(id ? Number(id) : 0)
    });

    const petReminderQuery = useQuery({
        queryKey: ["pet-reminders", id],
        queryFn: () => ReminderAPI.getReminderByPetID(Number(id))
    });

    if (petQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (petQuery.error) {
        return <div>Error: {petQuery.error.message}</div>;
    }

    return (
        <div className="pet-profile-container">
            <div>
                <div className="pet-profile">{petQuery.data?.name}</div>
                <RoundImage className={`pet-profile-image ${isJumping ? 'jump' : ''}`} imageSource={petQuery.data?.imageSource} placeholder={placeholderPet} />
                <button className="test-button-jump" onClick={handleClick}>HEY</button>
                <div className="pet-profile">{petQuery.data?.dateOfBirth}</div>
                <div className="pet-profile">{petQuery.data?.id}</div>
                <div className="pet-profile">{petQuery.data?.castrated ? "Kastriert" : "nicht Kastriert"}</div>
                <div className="pet-profile">{petQuery.data?.owner.username}</div>
                <div className="pet-profile">{petQuery.data?.isMale ? "Männlich" : "Weiblich"}</div>
            </div>
            <div>
                <div className="pet-profile">Reminder</div>
                {petReminderQuery.isLoading && (
                    <div className="load">
                        <Loader />
                    </div>
                )}
                {petReminderQuery.isSuccess && (
                    <div className="reminders">
                        {petReminderQuery.data.map((reminder) => (
                            console.log(reminder.id),
                            console.log(reminder.date),
                            <div className="reminder-name">{reminder.name}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PetProfile;