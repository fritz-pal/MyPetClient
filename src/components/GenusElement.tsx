import { useTranslation } from "react-i18next";
import { Genus } from "../models/Genus";
import "./css/GenusElement.css"

const GenusElement = ({genus, onClick} : {genus: Genus, onClick?: (genus: Genus) => void}) => {
    const [t, _] = useTranslation("genus");
    return (
        <button onClick={onClick ? () => onClick(genus) : () => {} }>{ t(genus.name.toLowerCase()) }</button>
    )
}

export default GenusElement