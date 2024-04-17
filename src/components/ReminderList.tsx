import Reminders, { Reminder, JSONReminder, ReminderAPI } from '../models/Reminder'
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import './css/ReminderList.css'



const ReminderList = () => {
    const [t, _] = useTranslation("reminders");
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const petQuery = useQuery({
        queryKey: ["reminders", user.id],
        queryFn: () => ReminderAPI.getAllRemindersOfUser(user.id)
    });
    let reminders: Array<Reminder> = [];
    if (petQuery.isSuccess) {
        petQuery.data.forEach(element => {
            reminders.push(Reminders.JSONReminderToReminder(element))
        });
    }
    const addReminderClicked = () => {
        navigate('/newreminder');
    }

    return (
        <div className="my-reminders-module">
            <h2>{t("reminderListTitle")}</h2>
            {petQuery.isLoading && <div className='load'><Loader /></div>}
            {petQuery.isSuccess && <div className="reminders">
                {reminders.map(reminder => <ReminderListItem reminder={reminder} key={reminder.id}></ReminderListItem>)}
            </div>}
            {petQuery.isError && <div>Error fetching reminders</div>}
            <div className="add-reminder-button-container">
                <svg onClick={addReminderClicked} className="add-reminder-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" />
                </svg>
            </div>
        </div>
    );
};

const ReminderListItem = ({ reminder }: { reminder: Reminder }) => {
    const [t, _] = useTranslation("reminders");
    return(
    <>
        <div className="reminder-area" key={reminder.name}>
            <div className="reminder-info">
                <div className="reminder-name">{reminder.name}</div>
                <div className="reminder-date">{reminder.date.toString()}</div>
            </div>
            <button onClick={() => ReminderAPI.deleteReminder(reminder.id)}>{t("delete")}</button>
        </div>
        <hr />
    </>
    );
};


export default ReminderList;
