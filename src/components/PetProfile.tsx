import { useParams } from "react-router"
import { PetAPI } from "../models/Pet";
import { useQuery } from "@tanstack/react-query";
import RoundImage from "./RoundImage";
import placeholderPet from '/placeholderPet.png';
import './css/PetProfile.css';
import { useState } from "react";
import { ReminderAPI } from "../models/Reminder";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";



const PetProfile = () => {
    const [isJumping, setIsJumping] = useState(false);

    const handleClick = () => {
        if (!isJumping) {
            setIsJumping(true);
            setTimeout(() => setIsJumping(false), 500); // Animation dauert 0.5s
        }
    };

    const [t, _] = useTranslation("reminders");

    function removeFirstLast(text: string) {
        let result = text.slice(1, -1) + t("day"); // Default-Wert

        if (text.slice(1, -1) === "1") {
            if (text.endsWith("D")) {
                result = t("everySingle2") + " " + t("day");
            } else if (text.endsWith("Y")) {
                result = t("everySingle3") + " " + t("year");
            } else if (text.endsWith("M")) {
                result = t("everySingle2") + " " + t("month");
            } else if (text.endsWith("H")) {
                result = t("everySingle") + " " + t("hour");
            }
        } else {
            if (text.endsWith("D")) {
                result = t("everyPlural") + " " + text.slice(1, -1) + " " + t("days");
            } else if (text.endsWith("Y")) {
                result = t("everyPlural") + " " + text.slice(1, -1) + " " + t("years");
            } else if (text.endsWith("M")) {
                result = t("everyPlural") + " " + text.slice(1, -1) + " " + t("months");
            } else if (text.endsWith("H")) {
                result = t("everyPlural") + " " + text.slice(1, -1) + " " + t("hours");
            }
        }

        return result;
    }

    function formatDateTime(dateString: string): string {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        const date = new Date(dateString);
        const formattedDate = date
            .toLocaleDateString("en-EN", options)
            .replace(",", "");

        return formattedDate;
    }
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
        <div className="pet-profile-main scroll-page">
            <div className="pet-profile-container">
                <div className="pet-profile-attribute">
                    <div className="pet-profile">{petQuery.data?.name}</div>
                    <RoundImage className={`pet-profile-image ${isJumping ? 'jump' : ''}`} imageSource={petQuery.data?.imageSource} placeholder={placeholderPet} />
                    <button className="test-button-jump" onClick={handleClick}>HEY</button>
                    <div className="pet-profile">{petQuery.data?.dateOfBirth}</div>
                    <div className="pet-profile">{petQuery.data?.castrated ? "Kastriert" : "nicht Kastriert"}</div>
                    <div className="pet-profile">{petQuery.data?.owner.username}</div>
                    <div className="pet-profile">{petQuery.data?.subSpecies}</div>
                    <div className="pet-profile">{petQuery.data?.weight}</div>
                    <div className="pet-profile">{petQuery.data?.isMale ? "Männlich" : "Weiblich"}</div>
                </div>
                <div className="pet-profile-reminder">
                    <div className="pet-profile">Reminder</div>
                    {petReminderQuery.isLoading && (
                        <div className="load">
                            <Loader />
                        </div>
                    )}
                    {petReminderQuery.isSuccess && (
                        <div className="reminders">
                            {petReminderQuery.data.map((reminder) => (
                                <div className="reminder-tag-container">
                                    <div className="reminder-tag-name">
                                        <div className="reminder-name">
                                            {reminder.name}
                                        </div>
                                        <div className="reminder-tag">
                                            {reminder.repeatingInterval != null ? `${removeFirstLast(reminder.repeatingInterval?.toString())}` : ""}
                                        </div>
                                    </div>
                                    <div className="reminder-area" key={reminder.name}>
                                        <div className="reminder-info"></div>
                                        <div className="reminder-date">
                                            {formatDateTime(reminder.date.toString())}
                                        </div>
                                        <div className="reminder-pets-container">
                                            {reminder.pets.map((pet) => (
                                                <div key={pet.id} className="reminder-pets">
                                                    {pet.name}
                                                    <RoundImage className="pet-image3" imageSource={pet.imageSource} placeholder={placeholderPet} />
                                                </div>
                                            ))}
                                        </div>


                                    </div >
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PetProfile;