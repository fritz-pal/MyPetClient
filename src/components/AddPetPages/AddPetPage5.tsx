import { useContext } from 'react';
import { Pet } from '../../models/Pet'
import '../css/AddPet.css'
import { useTranslation } from 'react-i18next';
import { PetContext } from '../PetCreationContext';

const AddPetPage5 = () => {
    const {pet, setPet} = useContext(PetContext);
    const [t,] = useTranslation("addPet");
    const setSize = (size: number) => {
        pet.size = size;
        setPet({...pet});
    }
    const setWeight = (weight: number) => {
        pet.weight = weight;
        setPet({...pet});
    }
    const setCastrated = (castrated: boolean) => {
        pet.castrated = castrated;
        setPet({...pet});
    }
    return (
        <div className='page-5'>
            <div className='input-label'>
                {t("sizeProp")} (m)
            </div>
            <input type='number' min="0" value={pet.size} onChange={(e) => setSize(+e.target.value)}/>
            <div className='input-label'>
                {t("weightProp")} (kg)
            </div>
            <input type='number' min="0" value={pet.weight} onChange={(e) => setWeight(+e.target.value)}/>
            <div className='input-label'>
                <input type='checkbox' className="castrated-box" onChange={(e) => setCastrated(e.target.checked)}/>
                &nbsp;{t("castratedProp")}
            </div>
            <div className='input-label'>
                {t("foodProp")}
            </div>
            <input type='text' value={pet.favoriteFood}/>
            <div className='input-label'>
                {t("toyProp")}
            </div>
            <input type='text' value={pet.favoriteToy}/>
            <div className='input-label'>
                {t("spotProp")}
            </div>
            <input type='text' value={pet.favoriteSpot}/>
        </div>
    )
}

export default AddPetPage5