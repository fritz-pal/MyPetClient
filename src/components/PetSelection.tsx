import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Pets, { JSONPet, PetAPI, Pet  } from "../models/Pet";

interface PetSelectionProps {
    userId: number;
    setAssociatedPets: React.Dispatch<React.SetStateAction<Pet[]>>;
}

const PetSelection: React.FC<PetSelectionProps> = ({ userId,setAssociatedPets }) => {
    const [selection, setSelection] = useState<string[]>([]); 
    const [availablePets, setAvailablePets] = useState<Pet[]>([]);
    const [t,] = useTranslation("reminders");
  
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
        const updatedSelection = checked
          ? [...selection, value]
          : selection.filter(item => item !== value);
        setSelection(updatedSelection);
        
        const updatedPets = updatedSelection.map(petId => availablePets.find(pet => pet.id === Number(petId))).filter(Boolean) as Pet[];
        setAssociatedPets(updatedPets);
      };
      
    return (
        <div className="set-reminder-pet">
            <div>{t("reminderPet")}</div>
            {availablePets.map(pet => (
                <div key={pet.id}>
                    <label>
                        <input
                            type="checkbox"
                            value={pet.id.toString()}
                            onChange={handleCheckboxChange}
                            checked={selection.includes(pet.id.toString())}
                        />
                        {pet.name}
                    </label>
                </div>
            ))}
        </div>
    );
};
export default PetSelection