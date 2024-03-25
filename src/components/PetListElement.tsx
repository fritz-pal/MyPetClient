const PetListElement = ({name, species} : Pet) => {
    return (<div>
        <h2>{ name }</h2>
        <p>{ species.race }</p>
    </div>)
}
