import { Genus } from "../models/Genus";
import GenusElement from "./GenusElement";

const GenusList = ({genusList, onClickedElement, selectedID}: {genusList: Genus[], onClickedElement?: (genus: Genus) => void, selectedID?: number}) => {
    return (
        <div className="genus-list">{genusList.map(element =>
            <GenusElement genus={element} onClick={onClickedElement} key={element.id} selected={selectedID == element.id}></GenusElement>
        )}</div>
    )
}

export default GenusList