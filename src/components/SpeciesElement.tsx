import { useTranslation } from "react-i18next";
import "./css/SpeciesElement.css"
import { Species } from "../models/Species";

const SpeciesElement = ({species, onClick, selected = false} : {species: Species, onClick?: (genus: Species) => void, selected?: boolean}) => {
    const [t, _] = useTranslation("race");
    return (
        <button className={selected ? "species-element selected" : "species-element"} onClick={onClick ? () => onClick(species) : () => {} }>{ t(species.race.toLowerCase()) }</button>
    )
}

export default SpeciesElement