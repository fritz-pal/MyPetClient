import { APIClient } from "../constants"
import { Pet } from "./Pet"

export interface Reminder {
    id: number
    name: string
    date: Date
    pets: Pet[]
    repeatingInterval: string
}

export interface JSONReminder {
    id: number
    name: string
    date: string
    pets: Pet[]
    repeatingInterval: string
}

const JSONReminderToReminder = (data: JSONReminder) => {
    return {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
    } as Reminder;
}

const ReminderToJSONReminder = (data: Reminder) => {
    return {
        ...data,
        date: data.date ? data.date.toISOString() : undefined,
    }
}

const newReminder = (): Reminder => {
    return {
        id: 0,
        name: "",
        date: new Date(),
        pets: [],
        repeatingInterval: ""
    }
}

const Reminders = {
    JSONReminderToReminder,
    ReminderToJSONReminder,
    newReminder
}

const MAPPING = "/reminders"

const getReminderByID = async (id: Number): Promise<JSONReminder> => {
    const request = await APIClient.get(`${MAPPING}/${id}`);
    return request.data;
}

const updateReminder = async (reminder: JSONReminder): Promise<JSONReminder> => {
    const request = await APIClient.put(`${MAPPING}/${reminder.id}`, reminder);
    return request.data;
}

const getReminderByPetID = async (petID: Number): Promise<JSONReminder[]> => {
    const request = await APIClient.get(`${MAPPING}/pet?petId=${petID}`);
    return request.data;
}

const deleteReminder = async (id: Number): Promise<void> => {
    const request = await APIClient.delete(`${MAPPING}/${id}`);
    return request.data;
}


const getAllRemindersOfUser = async (userID: number): Promise<JSONReminder[]> => {
    const request = await APIClient.get(`${MAPPING}?userId=${userID}`);
    return request.data;
}

const addReminder = async (reminder: JSONReminder): Promise<JSONReminder> => {
    const request = await APIClient.post(MAPPING, reminder);
    return request.data;
}

export const ReminderAPI = {
    getAllRemindersOfUser,
    getReminderByID,
    deleteReminder,
    updateReminder,
    addReminder,
    getReminderByPetID
}

export default Reminders