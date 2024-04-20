import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next"
import { ForumAPI, Thread } from "../models/Forum";
import { useContext, useState } from "react";
import { Species, SpeciesAPI } from "../models/Species";
import SpeciesList from "./SpeciesList";
import Loader from "./Loader";
import "./css/AddThread.css"
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

const AddThread = () => {
    const queryClient = useQueryClient();
    const {user} = useContext(UserContext)
    const [t,] = useTranslation("addThread");
    const nav = useNavigate();
    const addThreadMut = useMutation({
        mutationFn: (thread: Thread) => ForumAPI.addThread(thread),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["threads"]
            });
            nav("/");
        }
    })
    const speciesQuery = useQuery({
        queryKey: ["species"],
        queryFn: () => SpeciesAPI.getAllSpecies(),
    });

    const [title, setTitle] = useState("");
    const [species, setSpecies] = useState<Species | null>(null);
    const [description, setDescription] = useState("");

    const validate = () => {
        if (title.trim() == "")
            return false;
        if (species == null)
            return false;
        if (description.trim() == null)
            return false;
        return true;
    }

    const apply = () => {
        if (!validate())
            return;
        if (species == null)
            return;
        addThreadMut.mutate({
            id: 0,
            name: title.trim(),
            species: species,
            description: description.trim(),
            creator: user,
            createdAt: Date.now()
        });
    }

    return (
        <div className="add-thread-page">
            <div className="add-thread-main-grid">
                <h2 className="add-thread-title">
                    {t("pageTitle")}
                </h2>
                <div className="add-thread-form">
                    <div>
                        {t("title")}:<br/>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div>
                        {t("species")}:<br/>
                        {speciesQuery.isLoading && <Loader/>}
                        {speciesQuery.isSuccess && <SpeciesList speciesList={speciesQuery.data} selectedID={species ? species.id : 0} onClickedElement={element => setSpecies(element)}/>}
                        {speciesQuery.isError && t("speciesLoadError")}
                    </div>
                    <div>
                        {t("description")}<br/>
                        <textarea className="add-thread-description-area" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="add-thread-buttons">
                    <button onClick={() => nav("/forum")}>
                        {t("cancel")}
                    </button>
                    <button disabled={!validate()} onClick={apply}>
                        {t("submit")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddThread