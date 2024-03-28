import { useContext, useEffect } from "react";
import { PetContext } from "../../context/PetCreationContext";
import { useTranslation } from "react-i18next";
import "../css/AddPet.css"
import { useAxiosPost } from "../../hooks/useAxiosPost";
import Pets, { JSONPet } from "../../models/Pet";
import { API_BASE_URL } from "../../constants";
import Loader from "../Loader";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";

const AddPetPost = () => {
    const {pet} = useContext(PetContext);
    const {user} = useContext(UserContext);
    const [t,] = useTranslation("addPet");
    const nav = useNavigate();
    const {loading, error} = useAxiosPost<JSONPet, any>(API_BASE_URL + "/pets", Pets.PetToJSONPet({...pet,
        owner: user,
    }));
    console.log("Rendering");
    return (
        <>
            {loading && <Loader/>}
            {!loading && error && <>Error when trying to Post pet. Check Console</>}
            {!loading && !error && <>Pet Posted</>}
        </>
    )
}

export default AddPetPost