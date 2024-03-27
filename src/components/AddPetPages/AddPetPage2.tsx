import { useContext } from 'react'
import { Pet } from '../../models/Pet'
import '../css/AddPet.css'
import { PetContext } from '../PetCreationContext'
import { useTranslation } from 'react-i18next'

const AddPetPage2 = () => {
    const {pet, setPet} = useContext(PetContext);
    const [t,] = useTranslation("addPet");
    const updateSex = (isMale: boolean) => {
        pet.isMale = isMale;
        setPet({...pet});
    }
    const updateName = (name: string) => {
        pet.name = name;
        setPet({...pet});
    }
    return (
        <div className="page-2">
            <label>{t("nameQuestion")}</label>
            <input type='text' value={pet.name} onChange={(e) => updateName(e.target.value)}></input>
            <div className='gender-buttons-container'>
                <button className={pet.isMale ? "gender-button selected" : "gender-button"} onClick={() => updateSex(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"/>
                    </svg>
                </button>
                <button className={pet.isMale ? "gender-button" : "gender-button selected"} onClick={() => updateSex(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default AddPetPage2