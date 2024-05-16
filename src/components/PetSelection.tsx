import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Pets, { JSONPet, PetAPI, Pet } from "../models/Pet";
import { Switch } from "react-aria-components";
import './css/ReminderPage.css'

interface PetSelectionProps {
    userId: number;
    setAssociatedPets: React.Dispatch<React.SetStateAction<Pet[]>>;
}

const PetSelection = ({ userId, setAssociatedPets }: PetSelectionProps) => {
    const [selection, setSelection] = useState<string[]>([]);
    const [availablePets, setAvailablePets] = useState<Pet[]>([]);
    const [t] = useTranslation("reminders");

    useEffect(() => {
        loadAvailablePets();
    }, []);

    const loadAvailablePets = async () => {
        try {
            const availableJSONPets: JSONPet[] = await PetAPI.getAllPetsOfUser(
                userId
            );
            const availablePets: Pet[] = availableJSONPets.map(Pets.JSONPetToPet);
            setAvailablePets(availablePets);
        } catch (error) {
            console.error("kaput", error);
        }
    };

    const handleCheckboxChange = (checked: boolean, value: string) => {
        const updatedSelection = checked
            ? [...selection, value]
            : selection.filter((item) => item !== value);
        setSelection(updatedSelection);

        const updatedPets = updatedSelection
            .map((petId) => availablePets.find((pet) => pet.id === Number(petId)))
            .filter(Boolean) as Pet[];
        setAssociatedPets(updatedPets);
    };

    return (
        <div className="set-reminder-pets">
            <div className="reminderPet-title">{t("reminderPet")}</div>
            {availablePets.map((pet) => (
                <PetToSelect pet={pet} onChange={handleCheckboxChange} />
            ))}
        </div>
    );
};

const PetToSelect = ({ pet, onChange }: { pet: Pet, onChange: (checked: boolean, value: string) => void }) => {
    const setChecked = (checked: boolean) => {
        onChange(checked, pet.id.toString());
    };
    
    return (
        <div className="set-reminder-pet" key={pet.id}>
            <Switch key={pet.id} onChange={setChecked}>
                <div className="indicator" />
                {pet.name}
            </Switch>
        </div>
    );
}

export default PetSelection;
