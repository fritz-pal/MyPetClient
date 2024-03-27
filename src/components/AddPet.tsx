import { useContext, useState } from "react"
import './css/AddPet.css'
import { useTranslation } from "react-i18next";
import AddPetPage1 from "./AddPetPages/AddPetPage1";
import AddPetPage2 from "./AddPetPages/AddPetPage2";
import AddPetPage3 from "./AddPetPages/AddPetPage3";
import AddPetPage4 from "./AddPetPages/AddPetPage4";
import AddPetPage5 from "./AddPetPages/AddPetPage5";
import AddPetPage6 from "./AddPetPages/AddPetPage6";
import Pets from "../models/Pet";
import PetCreationContext, { PetContext, getPageProgress } from "./PetCreationContext";

const AddPet = () => {
    return (
        <PetCreationContext>
            <AddPetContent/>
        </PetCreationContext>
    )
}

const AddPetContent = () => {
    const [page, setPage] = useState(1);
    const [t,] = useTranslation("addPet");
    const {pet} = useContext(PetContext);
    return (
        <div className="add-pet-page">
            <progress max="6" value={page - 1} className="add-progress"/>
            <div className="add-pet-content">
                <h2>{ t("page"+ page + "Title", {name: pet.name}) }</h2>
                { page == 1 && <AddPetPage1/> }
                { page == 2 && <AddPetPage2/> }
                { page == 3 && <AddPetPage3/> }
                { page == 4 && <AddPetPage4/> }
                { page == 5 && <AddPetPage5/> }
                { page == 6 && <AddPetPage6/> }
                <div className="page-navbar">
                    { page > 1 && 
                        <button className="nav-button page-back" onClick={() => setPage(page - 1)}>&#x3c;</button> 
                    }
                    { page < getPageProgress(pet) &&
                        <button className="nav-button page-forward" onClick={() => setPage(page + 1)}>&#x3e;</button> 
                    }
                </div>
            </div>
            <div className="requiered-label">
                *{ t("requieredNotice") }
            </div>
        </div>
    )
}

export default AddPet;