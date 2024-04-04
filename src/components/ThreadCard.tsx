const ThreadCard = ({ thread }: { thread: Thread }) => (
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
