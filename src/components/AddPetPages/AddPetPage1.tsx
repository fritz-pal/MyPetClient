import '../css/AddPet.css'
import { Pet } from "../../models/Pet";
import { useFetch } from '../../hooks/useFetch';
import { API_BASE_URL } from '../../constants';
import { Genus } from '../../models/Genus';
import Loader from '../Loader';
import { useTranslation } from 'react-i18next';
import GenusElement from '../GenusElement';

const AddPetPage1 = ({pet} : {pet: Pet}) => {
    const [t, _] = useTranslation("addPet");
    const {data, loading, error} = useFetch<Array<Genus>>(API_BASE_URL + "/genus");
    return (
        <div className='page-1'>
            {loading && <Loader/>}
            {!loading && error && <>Fehler beim Laden der Typen</>/*TODO Error translation*/}
            {!loading && !error && data != null && data.map(element => 
                <GenusElement genus={element}/>
            )}
        </div>
    )
}

export default AddPetPage1