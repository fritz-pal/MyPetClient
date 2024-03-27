import { useTranslation } from "react-i18next";
import { Genus } from "../models/Genus";
import "./css/GenusElement.css"

const GenusElement = ({genus, onClick, selected = false} : {genus: Genus, onClick?: (genus: Genus) => void, selected?: boolean}) => {
    const [t, _] = useTranslation("genus");
    return (
        <button className={selected ? "genus-element selected" : "genus-element"} onClick={onClick ? () => onClick(genus) : () => {} }>{ t(genus.name.toLowerCase()) }</button>
    )
}

export default GenusElement