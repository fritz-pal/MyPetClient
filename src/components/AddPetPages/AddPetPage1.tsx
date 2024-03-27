import '../css/AddPet.css'
import { useFetch } from '../../hooks/useFetch';
import { API_BASE_URL } from '../../constants';
import { Genus } from '../../models/Genus';
import Loader from '../Loader';
import { useTranslation } from 'react-i18next';
import GenusElement from '../GenusElement';
import { useContext } from 'react';
import { PetContext } from '../PetCreationContext';

const AddPetPage1 = () => {
    const {pet, setPet} = useContext(PetContext);
    const [t, _] = useTranslation("addPet");
    const {data, loading, error} = useFetch<Array<Genus>>(API_BASE_URL + "/genus");
    const updateGenus = (genus: Genus) => {
        pet.species.genus = genus;
        setPet(pet);
        console.log("Pet Updated");
    }

    return (
        <div className='page-1'>
            {loading && <Loader/>}
            {!loading && error && <>Fehler beim Laden der Typen</>/*TODO Error translation*/}
            {!loading && !error && data != null && data.map(element => 
                <GenusElement genus={element} onClick={updateGenus}/>
            )}
        </div>
    )
}

export default AddPetPage1