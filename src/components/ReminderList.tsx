import Reminders, { Reminder, ReminderAPI } from "../models/Reminder";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import placeholderPet from '/placeholderPet.png';
import "./css/ReminderList.css";
import { Button } from "react-aria-components";
import SmallLoader from "./SmallLoader";
import RoundImage from "./RoundImage";

const ReminderList = ({ id }: { id?: number }) => {
    const [t, _] = useTranslation("reminders");
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const reminderQuery = useQuery({
        queryKey: ["reminders", user.id],
        queryFn: () => ReminderAPI.getAllRemindersOfUser(user.id)
    });
    let reminders: Array<Reminder> = [];
    if (reminderQuery.isSuccess) {
        reminderQuery.data.forEach(element => {
            reminders.push(Reminders.JSONReminderToReminder(element))
        });
    }
    const addReminderClicked = () => {
        navigate('/newreminder');
    }

    let petReminders: Array<Reminder> = [];

    const petReminderQuery = useQuery({
        queryKey: ["pet-reminders", id],
        queryFn: () => ReminderAPI.getReminderByPetID(Number(id))
    });

    if (petReminderQuery.isSuccess) {
        petReminderQuery.data?.forEach(element => {
            petReminders.push(Reminders.JSONReminderToReminder(element))
        })
    }

    return (
        <div className="my-reminders-module">
            <div className="reminder_title">{t("reminderListTitle")}</div>
            {reminderQuery.isLoading && !id && (
                <div className="load">
                    <Loader />
                </div>
            )}
            {reminderQuery.isSuccess && !id && (
                <div className="reminders">
                    {reminders.map((reminder) => (
                        <ReminderListItem
                            reminder={reminder}
                            key={reminder.id}
                        ></ReminderListItem>
                    ))}
                </div>
            )}
            {petReminderQuery.isLoading && id && (
                <div className="load">
                    <Loader />
                </div>
            )}
            {petReminderQuery.isSuccess && id && (
                <div className="reminders">
                    {petReminders.map((reminders) => (
                        <ReminderListItem
                            reminder={reminders}
                            key={reminders.id}
                        ></ReminderListItem>
                    ))}
                </div>
            )}
            {reminderQuery.isError && <div>Error fetching reminders</div>}
            <div className="add-reminder-button-container">
                <svg
                    onClick={addReminderClicked}
                    className="add-reminder-button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                    />
                </svg>
            </div>
        </div>
    );
};

const ReminderListItem = ({ reminder }: { reminder: Reminder }) => {
    const [t, _] = useTranslation("reminders");
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const queryClient = useQueryClient();
    const { user } = useContext(UserContext);

    const deleteReminderMut = useMutation({
        mutationFn: (id: number) => ReminderAPI.deleteReminder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["reminders", user.id],
            });
        },
    });

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
                result = t("everyPlural") + " " + text.slice(2, -1) + " " + t("hours");
            }
        }

        return result;
    }

    function formatDateTime(dateString: string, locale: string): string {
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
            .toLocaleDateString(locale, options)
            .replace(",", "");

        return formattedDate;
    }

    const deleteReminder = (id: number) => {
        deleteReminderMut.mutate(id);
    };
    return (
        <>
            <div className="reminder-tag-name">
                <div className="reminder-name">{reminder.name}</div>
                <div className="reminder-tag">
                    {reminder.repeatingInterval != null ? `${removeFirstLast(reminder.repeatingInterval?.toString())}` : ""}
                </div>
            </div>
            <div className="reminder-area" key={reminder.name}>
                <div className="reminder-info"></div>
                <div className="reminder-date">
                    {formatDateTime(reminder.date.toString(), currentLocale)}
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
            <Button
                className="delete_reminder"
                onPress={() => deleteReminder(reminder.id)}
                isDisabled={deleteReminderMut.isPending}
            >
                {deleteReminderMut.isPending ? <SmallLoader /> : t("delete")}
            </Button>
            <hr />
        </>
    );
};


export default ReminderList;