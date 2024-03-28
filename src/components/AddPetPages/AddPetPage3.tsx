import { useContext } from 'react';
import '../css/AddPet.css'
import { PetContext } from '../../context/PetCreationContext';
import { Species } from '../../models/Species';
import { API_BASE_URL } from '../../constants';
import { useFetch } from '../../hooks/useFetch';
import SpeciesElement from '../SpeciesElement';
import Loader from '../Loader';

const AddPetPage3 = () => {
    const {pet, setPet} = useContext(PetContext);
    const {data, loading, error} = useFetch<Array<Species>>(API_BASE_URL + "/species?genusId=" + pet.species.genus.id); // TODO Rerun when species changes?
    const updateSpecies = (species: Species) => {
        pet.species = species;
        setPet({...pet});
    }
    return (
        <div className='page-3'>
            {loading && <Loader/>}
            {!loading && error && <>Fehler beim Laden der Typen</>/*TODO Error translation*/}
            {!loading && !error && data != null && data.map(element => 
                <SpeciesElement species={element} onClick={updateSpecies} key={element.id} selected={element.id == pet.species.id}/>
            )}
        </div>
    )
}

export default AddPetPage3