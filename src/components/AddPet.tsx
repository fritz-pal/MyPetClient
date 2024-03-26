import { useState } from "react"
import './css/AddPet.css'
import { useTranslation } from "react-i18next";
import AddPetPage1 from "./AddPetPages/AddPetPage1";
import Pets from "../models/Pet";

const AddPet = () => {
    const [page, setPage] = useState(1);
    const [t, _] = useTranslation("addPet");
    const pet = Pets.newPet();
    return (
        <div className="add-pet-page">
            <progress max="6" value={page} className="add-progress"/>
            <div className="add-pet-content">
                <h2>{ t("page"+ page + "Title") }</h2>
                { page == 1 && <AddPetPage1 pet={ pet }/> }
                <div className="page-navbar">
                    <button className="nav-button page-back">&#x3c;</button>
                    <button className="nav-button page-forward">&#x3e;</button>
                </div>
            </div>
            <div className="requiered-label">
                *{ t("requieredNotice") }
            </div>
        </div>
    )
}

export default AddPet;