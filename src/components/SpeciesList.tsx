import { Species } from "../models/Species";
import SpeciesElement from "./SpeciesElement";

const SpeciesList = ({speciesList, onClickedElement, selectedID}: {speciesList: Species[], onClickedElement?: (species: Species) => void, selectedID?: number}) => {
    return (
        <div className="species-list">{speciesList.map(element =>
            <SpeciesElement species={element} onClick={onClickedElement} key={element.id} selected={selectedID == element.id}></SpeciesElement>
        )}</div>
    )
}

export default SpeciesList