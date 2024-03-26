import './css/PetList.css';
import PetListItem from './PetListItem';
import useFetch from '../hooks/useFetch';
import Pets, { Pet, JSONPet} from '../models/Pet' 

const PetList = () => {
    const { data, loading, error } = useFetch<Array<JSONPet>>('http://localhost:8080/api/pets');
    let pets: Array<Pet> = [];
    if (data != null)
        data.forEach(element => {
            pets.push(Pets.JSONPetToPet(element))
        });
    return (
        <div className="my-pets-module">
            <h2>Meine Tiere</h2>
            {loading && <div>Loading...</div>}
            {!loading && !error && data != null && <div className="pets">
                {pets.map(pet => <PetListItem pet={pet} key={pet.id}></PetListItem>)}
            </div>}
            {!loading && error && <div>Error fetching pets</div>}
            <div className="add-pet-button-container">
                <svg className="add-pet-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" />
                </svg>
            </div>
        </div>
    );
};

export default PetList;
