import './css/PetList.css';
import placeholderPet from '/placeholderPet.png';
import Pets, { Pet, PetAPI } from '../models/Pet';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import RoundImage from './RoundImage';

const PetList = () => {
    const [t, _] = useTranslation("home");
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const petQuery = useQuery({
        queryKey: ["pets", user.id],
        queryFn: () => PetAPI.getAllPetsOfUser(user.id)
    });
    let pets: Array<Pet> = [];
    if (petQuery.isSuccess) {
        petQuery.data.forEach(element => {
            pets.push(Pets.JSONPetToPet(element))
        });
    }

    const addPetClicked = () => {
        navigate('/newpet');
    }

    return (
        <div className="my-pets-module">
            <div className="title_pets">{t("petlisttitle")}</div>

            {petQuery.isLoading && <div className='load'><Loader /></div>}
            {petQuery.isSuccess && <div className="pets">
                <PetCard pets={pets} />
            </div>}
            {petQuery.isError && <div>Error fetching pets</div>}
            <div className="add-pet-button-container">
                <svg onClick={addPetClicked} className="add-pet-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" />
                </svg>
            </div>
        </div>
    );
};

export const PetCard = ({ pets }: { pets: Pet[] }) => {
    const [k, _k] = useTranslation("species");
    const navigate = useNavigate();

    const handleClick = (id: string) => {
        navigate("/pet/" + id);
    }

    return (
        <div className="cards">
            {pets.map((pet) => (
                <label onClick={() => handleClick(pet.id.toString())} key={pet.name} id={pet.name} className="testtesttest">
                    <div className="frontUp">
                        <header>
                            <div className="pet-tile">{pet.name}</div>
                        </header>
                        <RoundImage className="pet-image2" imageSource={pet.imageSource} placeholder={placeholderPet} />
                        <div className="pet_name_css">{k(pet.species.name)}</div>
                    </div>
                    <div className="frontBottom">
                        <div className="pet_sub_css">{pet.subSpecies.length ? k(pet.subSpecies) : "\ufeff"}</div>
                    </div>
                </label>
            ))}
        </div>
    );
};

export default PetList;
