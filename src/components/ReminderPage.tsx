import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { SetStateAction, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import { JSONReminder, ReminderAPI } from "../models/Reminder";
import { UserContext } from "../context/UserContext";
import ReminderList from './ReminderList';
import Pets, { JSONPet, Pet, PetAPI } from "../models/Pet";
import './css/ReminderPage.css'
import PetSelection from "./PetSelection"



const ReminderPage = () => {
    const queryClient = useQueryClient();
    const {user} = useContext(UserContext);
    const [t,] = useTranslation("reminders");
    const nav = useNavigate();

    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [associatedPets, setAssociatedPets] = useState<Pet[]>([])

    
    const reminderMut = useMutation({
        mutationFn: (reminder: JSONReminder) => ReminderAPI.addReminder(reminder),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["reminders", user.id]});
            nav("/");
        }
    })

    const validate = (): boolean => {
        if (name == "")
            return false;
        if (date == null)
            return false;
        return true;
    }
    return (
        <div className="reminder-page">
            <div className="set-reminder-name">
                <div>{t("reminderName")}:</div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value.trim())} />
            </div>
            <div className="reminder-datepicker">
                <div>{t("reminderDate")}:</div>
                <input type="date" value={date ? date.toISOString().substring(0,10) : ""} onChange={(e) => setDate(new Date(e.target.value))} />
            </div>   
            <div>
                <PetSelection userId={user.id} setAssociatedPets={setAssociatedPets}/>
            </div>         
            <div className="add-reminder-buttons">
                <button className="cancel-button" onClick={() => nav("/")}>
                    {t("cancel")}
                </button>
                <button className="submit-button" disabled={!validate() || reminderMut.isPending} onClick={() => {
                    if (!validate())
                        return;
                    if (date == null)
                        return;
                    reminderMut.mutate({
                        id: 0,
                        name: name,
                        date: new Date().toISOString().substring(0, 10),
                        associatedPets: associatedPets
                    });
                    
                }}>
                    {reminderMut.isPending ? <Loader/> : t("submit")}
                </button>
            </div>
            <div className='reminderlist-container'>
                <ReminderList />
            </div>
        </div>
    )
}

export default ReminderPage;
