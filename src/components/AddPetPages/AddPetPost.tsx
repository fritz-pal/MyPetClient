import { useContext, useEffect } from "react";
import { PetContext } from "../../context/PetCreationContext";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import "../css/AddPet.css"
import Loader from "../Loader";
import { UserContext } from "../../context/UserContext";
import Pets, { JSONPet, PetAPI } from "../../models/Pet";
import { useNavigate } from "react-router";

const AddPetPost = () => {
    const {pet} = useContext(PetContext);
    const {user} = useContext(UserContext);
    const queryClient = useQueryClient();
    const [t,] = useTranslation("addPet");
    const nav = useNavigate();
    const mutation = useMutation({
        mutationFn: (pet: JSONPet) => PetAPI.addPet(pet),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["pets"]});
            nav("");
        }
    });
    useEffect(() => {
        pet.owner = user;
        mutation.mutate(Pets.PetToJSONPet(pet));
    }, [])
    if (mutation.isPending) {
        return (<Loader/>);
    }
    if (mutation.isError) {
        return (<>Failed</>);
    }
    return (<>Pet saved</>);
}

export default AddPetPost