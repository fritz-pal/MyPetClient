import { useTranslation } from "react-i18next";
import { Genus } from "../models/Genus";
import "./css/GenusElement.css"

const GenusElement = ({genus} : {genus: Genus}) => {
    const [t, _] = useTranslation("genus");
    return (
        <div>{t(genus.name)}</div>
    )
}

export default GenusElement