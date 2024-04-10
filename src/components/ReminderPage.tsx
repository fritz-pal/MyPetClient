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

interface PetSelectionProps {
    userId: number;
}

const PetSelection: React.FC<PetSelectionProps> = ({ userId }) => {
    const [selection, setSelection] = useState<string[]>([]); 
    const [availablePets, setAvailablePets] = useState<Pet[]>([]);
  
    useEffect(() => {
      loadAvailablePets();
    }, []);
  
    const loadAvailablePets = async () => {
      try {
        const availableJSONPets: JSONPet[] = await PetAPI.getAllPetsOfUser(userId);
        const availablePets: Pet[] = availableJSONPets.map(Pets.JSONPetToPet);
        setAvailablePets(availablePets);
      } catch (error) {
        console.error('kaput', error);
      }
    };
  
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
      if (checked) {
        setSelection([...selection, value]);
      } else {
        setSelection(selection.filter(item => item !== value));
      }
    };

    return (
        <div className="set-reminder-pet">
            <div>Reminder Pet:</div>
            {availablePets.map(pet => (
                <div key={pet.id}>
                    <label>
                        <input
                            type="checkbox"
                            value={pet.id}
                            onChange={handleCheckboxChange}
                            checked={selection.includes(pet.name)}
                        />
                        {pet.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

const ReminderPage = () => {
    const queryClient = useQueryClient();
    const {user} = useContext(UserContext);
    const [t,] = useTranslation("reminders");
    const nav = useNavigate();

    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [associatedPet, setAssociatedPet] = useState<Pet>({
        id: 0,
        name: "",
        species: {
            id: 0,
            name: "",
        },
        subSpecies: "",
        owner: {
            id: 0,
            username: "",
            fullname: "",
            email: ""
        },
        isMale: false,
        castrated: false
    })

    
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
                <PetSelection userId={user.id}/>
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
                    /*reminderMut.mutate({
                        id: 0,
                        name: name,
                        date: new Date().toISOString().substring(0, 10),
                        associatedPet: 
                    });
                    */
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
