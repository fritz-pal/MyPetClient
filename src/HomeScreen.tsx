import './App.css'
import viteLogo from '/vite.svg'

interface Pet {
    name: string;
    type: string;
}

const pets: Pet[] = [
    { name: 'Amy', type: 'Akita Inu' },
    { name: 'Leo', type: 'Maine-Coon-Katze' },
    { name: 'Luchs', type: 'Maine-Coon-Katze' },
    { name: 'Lucky', type: 'Zwerghamster' }
];

const MyPetsModule = () => {
    const renderPet = (pet: Pet) => (
        <>
            <div className="pet-tile" key={pet.name}>
                <img className="pet-image" src={viteLogo} alt={pet.name} />
                <div className="pet-info">
                    <div className="pet-name">{pet.name}</div>
                    <div className="pet-type">{pet.type}</div>
                </div>
                <button className="view-pet-button">→</button>
            </div>
            <hr  />
        </>
    );

    return (
        <div className="my-pets-module">
            <h2>Meine Tiere</h2>
            {pets.map(pet => renderPet(pet))}
            <button className="add-pet-button">+</button>
        </div>
    );
};

export default MyPetsModule;
