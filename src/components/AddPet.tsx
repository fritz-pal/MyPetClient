import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Genus, GenusAPI } from "../models/Genus";
import { Species, SpeciesAPI } from "../models/Species";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import './css/AddPet.css'
import GenusList from "./GenusList";
import Loader from "./Loader";

const AddPet = () => {
    const queryClient = useQueryClient();
    const [t,] = useTranslation("addPet"); // TODO Actually use it

    const [name, setName] = useState<string>("");
    const [isMale, setIsMale] = useState<boolean>(false);
    const [castrated, setCastrated] = useState<boolean>(false);
    const [genus, setGenus] = useState<null | Genus>(null);
    const [species, setSpecies] = useState<null | Species>(null);
    const [dateOfBirth, date] = useState<null | Date>(null);
    const [size, setSize] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);

    const genusQuery = useQuery({
        queryKey: ["genus"],
        queryFn: () => GenusAPI.getAllGenus(),
    });
    const speciesQuery = useQuery({
        queryKey: ["species", genus ? genus.id : 0],
        queryFn: () => SpeciesAPI.getAllSpeciesOfGenus(genus ? genus.id : 0),
        enabled: genus != null
    })

    const validate = (): boolean => {
        if (name == "")
            return false;
        if (genus == null)
            return false;
        if (species == null)
            return false;
        return true;
    }

    return (
        <div className="add-pet-page">
            <div className="add-pet-essentials-frame">
                {/* Image? */}
                <div className="labeled-input">
                    <div>*Haustiername:</div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value.trim())} />
                </div>
                <div className="gender-selection">
                    <button className="gender-button" onClick={() => setIsMale(true)}>
                        <svg fill="currentColor" viewBox="0 0 16 16" width="1em" height="1em">
                            <path fillRule="evenodd" d="M9.5 2a.5.5 0 010-1h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2.707L9.871 6.836a5 5 0 11-.707-.707L13.293 2H9.5zM6 6a4 4 0 100 8 4 4 0 000-8z"/>
                        </svg>
                    </button>
                    <button className="gender-button" onClick={() => setIsMale(false)}>
                        <svg fill="currentColor" viewBox="0 0 16 16" width="1em" height="1em">
                            <path fillRule="evenodd" d="M8 1a4 4 0 100 8 4 4 0 000-8zM3 5a5 5 0 115.5 4.975V12h2a.5.5 0 010 1h-2v2.5a.5.5 0 01-1 0V13h-2a.5.5 0 010-1h2V9.975A5 5 0 013 5z"/>
                        </svg>
                    </button>
                </div>
                <div className="labeled-checkbox">
                    <input type="checkbox" defaultChecked={castrated} onChange={(e) => setCastrated(e.target.checked)} />
                    Castrated
                </div>
            </div>
            <div className="add-pet-species-frame">
                <div className="labeled-input">
                    <div>*Genus:</div>
                    {genusQuery.isLoading && <Loader/>}
                    {genusQuery.isSuccess && <GenusList genusList={genusQuery.data} onClickedElement={element => setGenus(element)}/>}
                    {genusQuery.isError && <>Error loading Genus</>}
                </div>
            </div>
            <div className="add-pet-additionals-frame">
                {/* Date of birth size weight (favorites?) */}
            </div>
            <div className="required-notice">
                *{t("requieredNotice")}
            </div>
            <div className="add-pet-button-set">
                <button className="cancel-button">
                    Cancel
                </button>
                <button className="submit-button">
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AddPet