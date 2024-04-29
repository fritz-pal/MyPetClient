import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import { JSONReminder, ReminderAPI } from "../models/Reminder";
import { UserContext } from "../context/UserContext";
import { Pet } from "../models/Pet";
import './css/ReminderPage.css'
import PetSelection from "./PetSelection"



const ReminderPage = () => {
    const queryClient = useQueryClient();
    const { user } = useContext(UserContext);
    const [t,] = useTranslation("reminders");
    const nav = useNavigate();

    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState(new Date());
    const [associatedPets, setAssociatedPets] = useState<Pet[]>([])
    const [intervalString, setIntervalString] = useState<string>("")
    const [selectedTimeUnit, setSelectedTimeUnit] = useState('');
    const [intervalNumber, setIntervalNumber] = useState<number>(0);


    const reminderMut = useMutation({
        mutationFn: (reminder: JSONReminder) => ReminderAPI.addReminder(reminder),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reminders", user.id] });
            nav("/reminders");
        }
    })

    const validate = (): boolean => {
        if (name == "")
            return false;
        if (date == null)
            return false;
        if (associatedPets.length === 0)
            return false;
        return true;
    }

    const handleTimeChange = (e: { target: { value: any; }; }) => {
        const newTime = e.target.value;
        const [hours, minutes] = newTime.split(':');
        const updatedTime = new Date(date);
        updatedTime.setHours(parseInt(hours, 10));
        updatedTime.setMinutes(parseInt(minutes, 10));
        setTime(updatedTime);
    };

    const handleDateChange = (e: { target: { value: string | number | Date; }; }) => {
        const selectedDate = e.target.value;
        if (selectedDate === "") {
            setDate(new Date());
        } else {
            const newDate = new Date(e.target.value);
            setDate(newDate);
        }

    };

    const updateIntervalString = (numberparam: number, stringparam: string) => {
        console.log("selectedTimeUnit:", stringparam);
        console.log("intervalNumber:", numberparam);

        let updatedInterval = "";

        switch (stringparam) {
            case "hours":
                updatedInterval = `P${numberparam}H`;
                break;
            case "days":
                updatedInterval = `P${numberparam}D`;
                break;
            case "weeks":
                updatedInterval = `P${numberparam * 7}D`;
                break;
            case "months":
                updatedInterval = `P${numberparam}M`;
                break;
            case "years":
                updatedInterval = `P${numberparam}Y`;
                break;
            default:
                break;
        }
        console.log("updatedInterval: ", updatedInterval)
        setIntervalString(updatedInterval);
    };


    return (
        <div className="scroll-page">
            <div className="reminder-page">
                <div className="add-reminder-frame">
                    <div className="set-reminder-name">
                        <div className="inputLabel">{t("reminderName")}:</div>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="reminder-datepicker">
                        <div className="inputLabel">{t("reminderDate")}:</div>
                        <input
                            type="date"
                            value={date ? date.toISOString().substring(0, 10) : ""}
                            onChange={handleDateChange} />
                    </div>
                    <div className="reminder-timepicker">
                        <div className="inputLabel">{t("reminderTime")}:</div>
                        <input
                            type="time"
                            value={`${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`}
                            onChange={handleTimeChange}
                        />
                    </div>
                    <div className="inputLabel">
                        <PetSelection userId={user.id} setAssociatedPets={setAssociatedPets} />
                    </div>
                    <div className="reminder-interval">
                        <div className="inputLabel">{t("reminderInterval")}</div>
                        <input
                            type="number"
                            value={intervalNumber}
                            onChange={async (e) => {
                                setIntervalNumber(e.target.valueAsNumber)
                                updateIntervalString(e.target.valueAsNumber, selectedTimeUnit);
                            }}
                        />
                        <select
                            id="timeUnit"
                            value={selectedTimeUnit}
                            onChange={async e => {
                                setSelectedTimeUnit(e.target.value)
                                updateIntervalString(intervalNumber, e.target.value);
                            }}>
                            <option value="">{t("selectTimeUnit")}</option>
                            <option value="hours">{t("hours")}</option>
                            <option value="days">{t("days")}</option>
                            <option value="weeks">{t("weeks")}</option>
                            <option value="months">{t("months")}</option>
                            <option value="years">{t("years")}</option>
                        </select>
                    </div>
                    <div className="add-reminder-buttons">
                        <button className="cancel-button" onClick={() => nav("/reminders")}>
                            {t("cancel")}
                        </button>
                        <button className="submit-button" disabled={!validate() || reminderMut.isPending} onClick={async () => {
                            const handleClick = async () => {
                                const datetime = new Date(date);
                                datetime.setHours(time.getHours());
                                datetime.setMinutes(time.getMinutes());
                                if (!validate()) return;
                                if (date == null) return;


                                console.log("intervalstring was gesendet wird: ", intervalString);

                                reminderMut.mutate({
                                    id: 0,
                                    name: name.trimStart().trimEnd(),
                                    date: datetime.toISOString().substring(0, 25),
                                    pets: associatedPets,
                                    repeatingInterval: intervalString
                                });
                            };

                            handleClick();

                        }}>
                            {reminderMut.isPending ? <Loader /> : t("submit")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReminderPage;
