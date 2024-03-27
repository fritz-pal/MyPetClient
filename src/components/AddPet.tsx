import { useContext, useState } from "react"
import './css/AddPet.css'
import { useTranslation } from "react-i18next";
import AddPetPage1 from "./AddPetPages/AddPetPage1";
import AddPetPage2 from "./AddPetPages/AddPetPage2";
import AddPetPage3 from "./AddPetPages/AddPetPage3";
import AddPetPage4 from "./AddPetPages/AddPetPage4";
import AddPetPage5 from "./AddPetPages/AddPetPage5";
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
                <div className="page-navbar">
                    { page > 1 && 
                        <button className="page-back" onClick={() => setPage(page - 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button> 
                    }
                    { page < getPageProgress(pet) &&
                        <button className="page-forward" onClick={() => setPage(page + 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button> 
                    }
                    { page == 5 && 
                        <button className="page-forward" onClick={() => setPage(page + 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button> 
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