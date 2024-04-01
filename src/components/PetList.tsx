import './css/PetList.css';
import { useFetch } from '../hooks/useFetch';
import petImage from '/testpet.png';
import Pets, { Pet, JSONPet } from '../models/Pet'
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const PetList = () => {
    const [t, _] = useTranslation("home");
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const { data, loading, error } = useFetch<Array<JSONPet>>(`http://localhost:8080/api/pets?userId=${user.id}`);
    let pets: Array<Pet> = [];
    if (data != null) {
        data.forEach(element => {
            pets.push(Pets.JSONPetToPet(element))
        });
    }


    const addPetClicked = () => {
        navigate('/newpet');
    }

    return (
        <div className="my-pets-module">
            <h2>{t("petlisttitle")}</h2>
            {loading && <div className='load'><Loader /></div>}
            {!loading && !error && data != null && <div className="pets">
                {pets.map(pet => <PetListItem pet={pet} key={pet.id}></PetListItem>)}
            </div>}
            {!loading && error && <div>Error fetching pets</div>}
            <div className="add-pet-button-container">
                <svg onClick={addPetClicked} className="add-pet-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" />
                </svg>
            </div>
        </div>
    );
};

const PetListItem = ({ pet }: { pet: Pet }) => (
    <>
        <div className="pet-tile" key={pet.name}>
            <img className="pet-image" src={petImage} alt={pet.name} />
            <div className="pet-info">
                <div className="pet-name">{pet.name}</div>
                <div className="pet-type">{pet.species.name}</div>
            </div>
            <button className="view-pet-button">→</button>
        </div>
        <hr />
    </>
);


export default PetList;
