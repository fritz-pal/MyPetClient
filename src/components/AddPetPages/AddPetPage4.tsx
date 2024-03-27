import { useContext } from 'react';
import '../css/AddPet.css'
import { PetContext } from '../PetCreationContext';
import { useTranslation } from 'react-i18next';

const AddPetPage4 = () => {
    const {pet, setPet} = useContext(PetContext);
    const [t,] = useTranslation("addPet");
    const updateBirthday = (date: string) => {
        pet.dateOfBirth = new Date(date);
        setPet({...pet});
    }
    return (
        <div>
            <input 
                type="date" 
                value={pet.dateOfBirth != undefined ? pet.dateOfBirth.toISOString().substring(0, 10) : ""} 
                onChange={(e) => updateBirthday(e.target.value)}/>
        </div>
    )
}

export default AddPetPage4