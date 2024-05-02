import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Species, SpeciesAPI } from "../models/Species";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import './css/AddPet.css'
import petImage from '/testpet.png';
import SpeciesList from "./SpeciesList";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import { JSONPet, PetAPI } from "../models/Pet";
import { UserContext } from "../context/UserContext";

/**
 * React Component Displaying the form for adding a new Pet.
 * 
 * Needs:
 *  - UserContext
 *  - QueryClient
 *  - Translations
 *  - Router
 */
const AddPet = () => {
    const queryClient = useQueryClient();
    const {user} = useContext(UserContext);
    const [t,] = useTranslation("addPet"); // TODO Actually use it
    const nav = useNavigate();

    const [name, setName] = useState<string>("");
    const [isMale, setIsMale] = useState<boolean>(false);
    const [castrated, setCastrated] = useState<boolean>(false);
    const [species, setSpecies] = useState<null | Species>(null);
    const [subSpecies, setSubSpecies] = useState<string>("");
    const [dateOfBirth, setBirthday] = useState<null | Date>(null);
    const [size, setSize] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [disabilities, setDisabilities] = useState<string[]>([]);
    const [medications, setMedications] = useState<string[]>([]);
    const [allergies, setAllergies] = useState<string[]>([]);

    const speciesQuery = useQuery({
        queryKey: ["species"],
        queryFn: () => SpeciesAPI.getAllSpecies(),
    });
    const petMut = useMutation({
        mutationFn: (pet: JSONPet) => PetAPI.addPet(pet),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["pets", user.id]});
            nav("/");
        }
    })

    const validate = (): boolean => {
        if (name == "")
            return false;
        if (species == null)
            return false;
        return true;
    }
    return (
        <div className="add-pet-page">
            <div className="add-pet-collapsing-panels">
                <div className="add-pet-frame add-pet-essentials">
                    <img className="add-pet-image" src={petImage} />
                    <div className="labeled-input">
                        <div>*{t("petName")}:</div>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value.trim())} />
                    </div>
                    <div className="gender-selection">
                        <button className={"gender-button " + (isMale ? "selected" : "")} onClick={() => setIsMale(true)}>
                            <svg fill="currentColor" viewBox="0 0 16 16" width="1em" height="1em">
                                <path fillRule="evenodd" d="M9.5 2a.5.5 0 010-1h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2.707L9.871 6.836a5 5 0 11-.707-.707L13.293 2H9.5zM6 6a4 4 0 100 8 4 4 0 000-8z"/>
                            </svg>
                        </button>
                        <button className={"gender-button " + (isMale ? "" : "selected")} onClick={() => setIsMale(false)}>
                            <svg fill="currentColor" viewBox="0 0 16 16" width="1em" height="1em">
                                <path fillRule="evenodd" d="M8 1a4 4 0 100 8 4 4 0 000-8zM3 5a5 5 0 115.5 4.975V12h2a.5.5 0 010 1h-2v2.5a.5.5 0 01-1 0V13h-2a.5.5 0 010-1h2V9.975A5 5 0 013 5z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="labeled-checkbox">
                        <input className="normal_checkbox" type="checkbox" defaultChecked={castrated} onChange={(e) => setCastrated(e.target.checked)} />
                        {t("castrated")}
                    </div>
                </div>
                <div className="add-pet-frame">
                    <div className="labeled-input">
                        <div>*{t("species")}:</div>
                        {speciesQuery.isLoading && <Loader/>}
                        {speciesQuery.isSuccess && <SpeciesList speciesList={speciesQuery.data} selectedID={species ? species.id : 0} onClickedElement={element => setSpecies(element)}/>}
                        {speciesQuery.isError && t("speciesLoadError")}
                        <div className="labeled-input">
                            <div>{t("subSpecies")}:</div>
                            <input type="text" value={subSpecies} onChange={(e) => setSubSpecies(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="add-pet-frame">
                <div className="labeled-input">
                    <div>{t("birthday")}:</div>
                    <input type="date" value={dateOfBirth ? dateOfBirth.toISOString().substring(0,10) : ""} onChange={(e) => setBirthday(new Date(e.target.value))} />{/* Better Date Input */}
                </div>
                <div className="labeled-input">
                    <div>{t("size")}:</div>
                    <input type="number" value={size} onChange={(e) => setSize(e.target.valueAsNumber)} />
                </div>
                <div className="labeled-input">
                    <div>{t("weight")}:</div>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.valueAsNumber)} />
                </div>
            </div>
            <div className="add-pet-required-notice">
                *{t("requieredNotice")}
            </div>
            <div className="add-pet-button-set">
                <button className="cancel-button" onClick={() => nav("/")}>
                    {t("cancel")}
                </button>
                <button className="submit-button" disabled={!validate() || petMut.isPending} onClick={() => {
                    if (!validate())
                        return;
                    if (species == null)
                        return;
                    petMut.mutate({
                        id: 0,
                        name: name,
                        owner: user,
                        isMale: isMale,
                        castrated: castrated,
                        species: species,
                        subSpecies: subSpecies,
                        dateOfBirth: dateOfBirth?.toISOString().substring(0, 10),
                        size: size,
                        weight: weight
                    });
                }}>
                    {petMut.isPending ? <Loader/> : t("submit")}
                </button>
            </div>
        </div>
    )
}

export default AddPet
