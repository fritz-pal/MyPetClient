import { useNavigate, useParams } from "react-router"
import { JSONPet, Pet, PetAPI, getPetChanges, Pets } from "../models/Pet";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import RoundImage from "./RoundImage";
import placeholderPet from '/placeholderPet.png';
import './css/PetProfile.css';
import { useEffect, useState } from "react";
import { ReminderAPI } from "../models/Reminder";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";
import noIcon from '/no-profile-picture-icon.webp';
import { Button, Input, TextArea } from "react-aria-components";



const PetProfile = () => {
    const [isJumping, setIsJumping] = useState(false);
    const navigate = useNavigate();
    const [editClicked, setEditClicked] = useState(false);
    const [editPet, setEditPet] = useState<Pet | null>();
    const [queryClient] = useState(() => new QueryClient());

    const handleClick = () => {
        if (!isJumping) {
            setIsJumping(true);
            setTimeout(() => setIsJumping(false), 500); // Animation dauert 0.5s
        }
    };

    const openUser = () => {
        navigate("/user/" + petQuery.data?.owner.id);
    }

    const [t, _] = useTranslation("reminders");
    const [z, _z] = useTranslation("addPet");
    const [k, _k] = useTranslation("species");

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

    const petUpdate = useMutation({
        mutationFn: (newPet: Pet) => PetAPI.updatePet(Pets.PetToJSONPet(newPet)),
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["pets", id]
            });
        }
    });

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

    useEffect(() => {
        if (petQuery.isSuccess && petQuery.data) {
          setEditPet(Pets.JSONPetToPet(petQuery.data));
        }
      }, [petQuery.isSuccess, petQuery.data]);

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
                    <Button className="poster-info-pet" onPress={openUser}>
                        <img className="poster-info-image" src={noIcon} />


                    </Button>
                    <div>{t("unitWeight")}: <input type="text" value={editPet?.name} onChange={(e) => {if(editPet) setEditPet({ ...editPet, name: e.target.value })}} /></div>
                    <div className="title_pets">{petQuery.data?.name}</div>
                    <Button onPress={() => {if(editPet) petUpdate.mutate(editPet) }}>{t("edit")}</Button>
                    <RoundImage className={`pet-profile-image ${isJumping ? 'jump' : ''}`} imageSource={petQuery.data?.imageSource} placeholder={placeholderPet} />
                    <button className="test-button-jump" onClick={handleClick}>HEY</button>
                    <div className="pet-profile-text-container"><div className="pet-profile-text">{z("birthday")}</div>
                        <div className="pet-profile">{petQuery.data?.dateOfBirth?.length === 0 ? "-" : petQuery.data?.dateOfBirth}</div>
                    </div>
                    <div className="pet-profile-text-container"><div className="pet-profile-text">{z("castrated")}</div>
                        <div className="pet-profile">{petQuery.data?.castrated ? "Kastriert" : "nicht Kastriert"}</div>
                    </div>
                    <div className="pet-profile-text-container"><div className="pet-profile-text">{z("subSpecies")}</div>
                        <div className="pet-profile">{petQuery.data?.subSpecies.length === 0 ? "-" : petQuery.data?.subSpecies}</div>
                    </div>
                    <div className="pet-profile-text-container"><div className="pet-profile-text">{z("weight")}</div>
                        <div className="pet-profile">{petQuery.data?.weight === 0 ? "-" : petQuery.data?.weight + " " + z(petQuery.data ? petQuery.data.species.unitWeight ? petQuery.data.species.unitWeight : "" : "")}</div>
                    </div>
                    <div className="pet-profile-text-container"><div className="pet-profile-text">{z("gender")}</div>
                        <div className="pet-profile">{petQuery.data?.isMale ? "Männlich" : "Weiblich"}</div>
                    </div>
                    <div className="pet-profile-text-container"><div className="pet-profile-text">{z("allergies")}</div>
                        <div className="pet-profile">{petQuery.data?.allergies?.length === 0 ? "-" : petQuery.data?.allergies}</div>
                    </div>
                    <div className="pet-profile-text-container"><div className="pet-profile-text">{z("disabilities")}</div>
                        <div className="pet-profile">{petQuery.data?.disabilities?.length === 0 ? "-" : petQuery.data?.disabilities}</div>
                    </div>
                    <div className="pet-profile-text-container"><div className="pet-profile-text">{z("speciesType")}</div>
                        <div className="pet-profile">{petQuery.data?.species.name.length != null ? k(petQuery.data?.species.name) : "-"}</div>
                    </div>
                    <div className="pet-profile-text-container">
                        <div className="pet-profile-text">{z("size")}</div>
                        <div className="pet-profile">{petQuery.data?.size === 0 ? "-" : z(petQuery.data ? petQuery.data.species.typeOfSize ? petQuery.data.species.typeOfSize : "" : "") + ": " + petQuery.data?.size + " " + z(petQuery.data ? petQuery.data.species.unitSize ? petQuery.data.species.unitSize : "" : "")}</div>
                    </div>
                    <div className="pet-profile-text-container"><div className="pet-profile-text">{z("medications")}</div></div>

                </div>
                <div className="pet-profile-reminder">
                    <div className="reminder_title_profile">Reminder</div>
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
                                        <div className="reminder-name-w">
                                            {reminder.name}
                                        </div>
                                        <div className="reminder-tag">
                                            {reminder.repeatingInterval != null ? `${removeFirstLast(reminder.repeatingInterval?.toString())}` : ""}
                                        </div>
                                    </div>
                                    <div className="reminder-area-w" key={reminder.name}>
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