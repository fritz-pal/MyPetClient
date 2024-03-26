import { useState } from "react"
import './css/AddPet.css'
import { useTranslation } from "react-i18next";
import AddPetPage1 from "./AddPetPages/AddPetPage1";
import AddPetPage2 from "./AddPetPages/AddPetPage2";
import AddPetPage3 from "./AddPetPages/AddPetPage3";
import AddPetPage4 from "./AddPetPages/AddPetPage4";
import AddPetPage5 from "./AddPetPages/AddPetPage5";
import AddPetPage6 from "./AddPetPages/AddPetPage6";
import Pets from "../models/Pet";

const AddPet = () => {
    const [page, setPage] = useState(1);
    const [t, _] = useTranslation("addPet");
    const pet = Pets.newPet();
    return (
        <div className="add-pet-page">
            <progress max="6" value={page - 1} className="add-progress"/>
            <div className="add-pet-content">
                <h2>{ t("page"+ page + "Title", {name: pet.name}) }</h2>
                { page == 1 && <AddPetPage1 pet={ pet }/> }
                { page == 2 && <AddPetPage2 pet={ pet }/> }
                { page == 3 && <AddPetPage3 pet={ pet }/> }
                { page == 4 && <AddPetPage4 pet={ pet }/> }
                { page == 5 && <AddPetPage5 pet={ pet }/> }
                { page == 6 && <AddPetPage6 pet={ pet }/> }
                <div className="page-navbar">
                    { page > 1 && <button className="nav-button page-back" onClick={() => setPage(page - 1)}>&#x3c;</button> }
                    { page < 6 && <button className="nav-button page-forward" onClick={() => setPage(page + 1)}>&#x3e;</button> }
                </div>
            </div>
            <div className="requiered-label">
                *{ t("requieredNotice") }
            </div>
        </div>
    )
}

export default AddPet;