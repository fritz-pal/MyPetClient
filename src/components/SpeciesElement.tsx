import { useTranslation } from "react-i18next";
import { Species } from "../models/Species";
import "./css/SpeciesElement.css"
import { Button } from "react-aria-components";

/** 
 * React Component that displays a single Species
 */
const SpeciesElement = ({species, onClick, selected = false} : {species: Species, onClick?: (species: Species) => void, selected?: boolean}) => {
    const [t, _] = useTranslation("species");
    return (
        <Button className={selected ? "species-element selected" : "species-element"} onPress={onClick ? () => onClick(species) : () => {} }>{ t(species.name.toLowerCase()) }</Button>
    )
}

export default SpeciesElement