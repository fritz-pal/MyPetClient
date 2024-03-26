import viteLogo from '/vite.svg';
import './css/PetList.css';

const PetListItem = ({ pet }: { pet: Pet }) => (
    <>
        <div className="pet-tile" key={pet.name}>
            <img className="pet-image" src={viteLogo} alt={pet.name} />
            <div className="pet-info">
                <div className="pet-name">{pet.name}</div>
                <div className="pet-type">{pet.species.race}</div>
            </div>
            <button className="view-pet-button">→</button>
        </div>
    </>
);

export default PetListItem;