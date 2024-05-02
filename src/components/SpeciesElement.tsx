import { useTranslation } from "react-i18next";
import { Species } from "../models/Species";
import "./css/SpeciesElement.css"

/** 
 * React Component that displays a single Species
 */
const SpeciesElement = ({species, onMouseEnter, onClick, selected = false} : {species: Species, onMouseEnter?: (species: Species) => void, onClick?: (species: Species) => void, selected?: boolean}) => {
    const [t, _] = useTranslation("species");
    return (
        <button className={selected ? "species-element selected" : "species-element"} onMouseEnter={onMouseEnter ? () => onMouseEnter(species) : () => {}} onClick={onClick ? () => onClick(species) : () => {} }>{ t(species.name.toLowerCase()) }</button>
    )
}

export default SpeciesElement