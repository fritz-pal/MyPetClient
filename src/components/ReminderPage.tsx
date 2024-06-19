import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { JSONReminder, ReminderAPI } from "../models/Reminder";
import { UserContext } from "../context/UserContext";
import { Pet } from "../models/Pet";
import './css/ReminderPage.css'
import PetSelection from "./PetSelection"
import SmallLoader from "./SmallLoader";
import { Button } from "react-aria-components";



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
    const [isIntervalVisible, setIsIntervalVisible] = useState<boolean>(false);


    const reminderMut = useMutation({
        mutationFn: (reminder: JSONReminder) => ReminderAPI.addReminder(reminder),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reminders", user.id] });
            nav("/reminders");
        }
    })

    const validate = (): boolean => {
        if (name == "" || name.length > 50)
            return false;
        if (date == null)
            return false;
        return true;
    }

    const handleTimeChange = (e: { target: { value: any; }; }) => {
        const newTime = e.target.value;
        const [hours, minutes] = newTime.split(':');
        const updatedTime = new Date(date);
        updatedTime.setHours(parseInt(hours, 10));
        updatedTime.setMinutes(parseInt(minutes, 10));
        updatedTime.setSeconds(0,0);
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
        if(numberparam === 0){
            return;
        }

        let updatedInterval = "";

        switch (stringparam) {
            case "hours":
                updatedInterval = `PT${numberparam}H`;
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
        setIntervalString(updatedInterval);
    };


    return (
        <div className="reminder-page scroll-page">
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
                <div className="accordion-section">
                    <div className="accordion-header">
                        <div className="inputLabel">{t("setReminderInterval")}</div>
                    <ExpandButton onClick={() => setIsIntervalVisible(!isIntervalVisible)} isOpen={isIntervalVisible} />
                    </div>
                    {isIntervalVisible && (
                        <div className="reminder-interval">
                            <div >{t("reminderInterval")}</div>
                            <div className="reminder-interval-data">
                            <input
                                className="reminder-interval-input"
                                type="number"
                                value={intervalNumber}
                                min="0"
                                inputMode="numeric"
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    if (!isNaN(newValue) && newValue >= 0) {
                                        setIntervalNumber(newValue);
                                        updateIntervalString(newValue, selectedTimeUnit);
                                    }
                                }}
                            />
                                <select
                                    id="timeUnit"
                                    value={selectedTimeUnit}
                                    onChange={async (e) => {
                                        setSelectedTimeUnit(e.target.value);
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
                        </div>
                    )}
                    
                </div>
                <div className="add-reminder-buttons">
                    <Button className="cancel-button" onPress={() => nav("/reminders")}>
                        {t("cancel")}
                    </Button>
                    <Button className="submit-button" isDisabled={!validate() || reminderMut.isPending} onPress={async () => {
                        const handleClick = async () => {
                            const datetime = new Date(date);
                            datetime.setHours(time.getHours());
                            datetime.setMinutes(time.getMinutes());
                            if (!validate()) return;
                            if (date == null) return;

                            reminderMut.mutate({
                                id: 0,
                                name: name.trimStart().trimEnd(),
                                date: datetime.toISOString(),
                                pets: associatedPets,
                                repeatingInterval: intervalString
                            });
                        };

                        handleClick();

                    }}>
                        {reminderMut.isPending ? <SmallLoader /> : t("submit")}
                    </Button>
                </div>
            </div>
        </div>
    )
}

const ExpandButton = ({onClick, isOpen}: { onClick: () => void, isOpen: boolean }) => {
    return (
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="plus-button" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

export default ReminderPage;


