import Reminders, { Reminder, JSONReminder, ReminderAPI } from '../models/Reminder'
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useQuery } from '@tanstack/react-query';

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
            //reminders.push(Reminders.JSONReminderToReminder(element))
        });
    }

    return (
        <div className="my-reminders-module">
            <h2>{t("reminderListTitle")}</h2>
            {petQuery.isLoading && <div className='load'><Loader /></div>}
            {petQuery.isSuccess && <div className="pets">
                {reminders.map(reminder => <ReminderListItem reminder={reminder} key={reminder.id}></ReminderListItem>)}
            </div>}
            {petQuery.isError && <div>Error fetching reminders</div>}
        </div>
    );
};

const ReminderListItem = ({ reminder }: { reminder: Reminder }) => (
    <>
        <div className="reminder-area" key={reminder.name}>
            <div className="reminder-info">
                <div className="reminder-date">{reminder.name}</div>
            </div>
            <button className="delete-reminder-button">→</button>
        </div>
        <hr />
    </>
);


export default ReminderList;
