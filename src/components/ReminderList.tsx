import Reminders, { Reminder, ReminderAPI } from '../models/Reminder'
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import petImage from "/hund.jpg";
import './css/ReminderList.css'



const ReminderList = () => {
    const [t, _] = useTranslation("reminders");
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

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

    return (
      <div className="scroll-page">
      <div className="my-reminders-module">
        <div className="reminder_title">{t("reminderListTitle")}</div>
        {reminderQuery.isLoading && (
          <div className="load">
            <Loader />
          </div>
        )}
        {reminderQuery.isSuccess && (
          <div className="reminders">
            {reminders.map((reminder) => (
              <ReminderListItem
                reminder={reminder}
                key={reminder.id}
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
      </div>
    );
  };

const ReminderListItem = ({ reminder }: { reminder: Reminder }) => {
  const [t, _] = useTranslation("reminders");
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

  const deleteReminder = (id: number) => {
    deleteReminderMut.mutate(id);
  };
  return (
    <>
      <div className="reminder-tag-name">
        <div className="reminder-name">{reminder.name}</div>
        <div className="reminder-tag">alle </div>
      </div>
      <div className="reminder-area" key={reminder.name}>
        <div className="reminder-info"></div>
        <div className="reminder-date">
          {formatDateTime(reminder.date.toString())}
        </div>
        <div className="pet_reminder_container">
          {reminder.pets.map((pet, index) => (
            <div className="reminder-pets" key={pet.name}>
              {index > 0 && ", "}
              {pet.name}
              <img className="pet-image3" src={petImage} />
            </div>
          ))}
        </div>
        <div>{reminder.repeatingInterval}</div>
      </div>
      <button
        className="delete_reminder"
        onClick={() => deleteReminder(reminder.id)}
      >
        {t("delete")}
      </button>
      <hr />
    </>
  );
};


export default ReminderList;