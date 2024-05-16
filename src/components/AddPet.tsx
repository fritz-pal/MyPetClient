import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Species, SpeciesAPI } from "../models/Species";
import { ChangeEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import './css/AddPet.css'
import placeholderImage from '/placeholderPet.png';
import SpeciesList from "./SpeciesList";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import { JSONPet, Medication, PetAPI } from "../models/Pet";
import { UserContext } from "../context/UserContext";
import { Button } from "react-aria-components";
import SmallLoader from "./SmallLoader";
import useFile from "../hooks/useFile";
import ImageSelector from "./ImageSelector";

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
    const { user } = useContext(UserContext);
    const [t,] = useTranslation("addPet");
    const nav = useNavigate();

    const [name, setName] = useState<string>("");
    const [isMale, setIsMale] = useState<boolean>(false);
    const [castrated, setCastrated] = useState<boolean>(false);
    const petImageFile = useFile(null);
    const [species, setSpecies] = useState<null | Species>(null);
    const [subSpecies, setSubSpecies] = useState<string>("");
    const [dateOfBirth, setBirthday] = useState<null | Date>(null);
    const [size, setSize] = useState("");
    const [weight, setWeight] = useState("");
    const [disabilities, setDisabilities] = useState<string[]>([]);
    const [medications, setMedications] = useState<Medication[]>([]);
    const [allergies, setAllergies] = useState<string[]>([]);

    const validateAsNumber = (text: string) => {
        return /^([0-9]*(,|\.)?[0-9]*)$/.test(text);
    }

    const handleSizeChange = (text: string) => {
        if (validateAsNumber(text))
            setSize(text);
    }

    const handleWeightChange = (text: string) => {
        if (validateAsNumber(text))
            setWeight(text);
    }

    const speciesQuery = useQuery({
        queryKey: ["species"],
        queryFn: () => SpeciesAPI.getAllSpecies(),
    });

    const petQuery = useQuery({
        queryKey: ["pets", user.id],
        queryFn: () => PetAPI.getAllPetsOfUser(user.id)
    });

    const petMut = useMutation({
        mutationFn: ({pet, file}:{pet: JSONPet, file?: File}) => PetAPI.addPet(pet, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pets", user.id] });
            nav("/");
        }
    })

    const handleUpdateItem = (index: number, newItem: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
        const newList = [...list];
        newList[index] = newItem;
        setList(newList);
    };

    const validate = (): boolean => {
        if (name.trim() == "")
            return false;
        if (species == null)
            return false;
        return true;
    }
    
    //true if new pet isnt duplicate
    const checkForDuplicate = (): boolean => {
        if (petQuery.isSuccess) {
            for (const element of petQuery.data) {
                if (JSON.stringify(element.species) === JSON.stringify(species) && element.name.toLowerCase() === name.toLowerCase()) {
                    return false;
                }
            }
        }
        return true;
    }

    
    const confirmationPopup = (callback: (confirmed: boolean) => void): void => {
        const message = t("confirmDuplicate");
    
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.style.display = "block";
    
        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";
    
        const modalMessage = document.createElement("p");
        modalMessage.className = "modal-message"
        modalMessage.textContent = message;
    
        const confirmButton = document.createElement("button");
        confirmButton.textContent = t("confirm");
        confirmButton.onclick = () => {
            modal.style.display = "none";
            callback(true);
        };
    
        const closeButton = document.createElement("span");
        closeButton.className = "close";
        closeButton.textContent = "×";
        closeButton.onclick = () => {
            modal.style.display = "none";
            callback(false);
        };
    
        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalMessage);
        modalContent.appendChild(confirmButton);
        modal.appendChild(modalContent);
    
        document.body.appendChild(modal);
    
    }

    const validateDuplicate = (callback: (isValid: boolean) => void): void => {
        if (!checkForDuplicate()){
            confirmationPopup((confirmed: boolean) => {
                if (confirmed) callback(true);
                else callback(false);});
            }
        else callback(true)
    }
        
        

    return (
        <div className="add-pet-page">
            <div className="add-pet-panels">
                <div className="add-pet-collapsing-panels">
                    <div className="add-pet-frame add-pet-essentials">
                        <ImageSelector className="add-pet-image" fileHook={petImageFile} placeHolderImage={placeholderImage} />
                        <div className="labeled-input">
                            <div>*{t("petName")}:</div>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="gender-selection">
                            <Button className={"gender-button " + (isMale ? "selected" : "")} onPress={() => setIsMale(true)}>
                                <svg fill="currentColor" viewBox="0 0 16 16" width="1em" height="1em">
                                    <path fillRule="evenodd" d="M9.5 2a.5.5 0 010-1h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2.707L9.871 6.836a5 5 0 11-.707-.707L13.293 2H9.5zM6 6a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            </Button>
                            <Button className={"gender-button " + (isMale ? "" : "selected")} onPress={() => setIsMale(false)}>
                                <svg fill="currentColor" viewBox="0 0 16 16" width="1em" height="1em">
                                    <path fillRule="evenodd" d="M8 1a4 4 0 100 8 4 4 0 000-8zM3 5a5 5 0 115.5 4.975V12h2a.5.5 0 010 1h-2v2.5a.5.5 0 01-1 0V13h-2a.5.5 0 010-1h2V9.975A5 5 0 013 5z" />
                                </svg>
                            </Button>
                        </div>
                        <div className="labeled-checkbox">
                            <input className="normal_checkbox" type="checkbox" defaultChecked={castrated} onChange={(e) => setCastrated(e.target.checked)} />
                            {t("castrated")}
                        </div>
                    </div>
                    <div className="add-pet-frame">
                        <div className="labeled-input">
                            <div>*{t("species")}:</div>
                            {speciesQuery.isLoading && <Loader />}
                            {speciesQuery.isSuccess && <SpeciesList speciesList={speciesQuery.data} selectedID={species ? species.id : 0} onClickedElement={element => setSpecies(element)} />}
                            {speciesQuery.isError && t("speciesLoadError")}
                            <div className="labeled-input">
                                <div>{t("subSpecies")}:</div>
                                <input type="text" value={subSpecies} onChange={(e) => setSubSpecies(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="add-pet-collapsing-panels">
                    <div className="add-pet-frame">
                        <div className="labeled-input">
                            <div>{t("birthday")}:</div>
                            <input type="date" value={dateOfBirth ? dateOfBirth.toISOString().substring(0, 10) : ""} onChange={(e) => setBirthday(new Date(e.target.value))} />{/* Better Date Input */}
                        </div>
                        <div className="labeled-input">
                            <div>{t("size")}{species?.typeOfSize && species.unitSize ? " (" + t(species.typeOfSize) + " in " + t(species.unitSize) + ")" : ""}:</div>
                            <input type="text" value={size} onChange={(e) => handleSizeChange(e.target.value)} />
                        </div>
                        <div className="labeled-input">
                            <div>{t("weight")}{species?.unitWeight ? " (" + "in " + t(species.unitWeight) + ")" : ""}:</div>
                            <input type="text" value={weight} onChange={(e) => handleWeightChange(e.target.value)} />
                        </div>
                    </div>

                    <div className="add-pet-frame">
                        <div className="title-further-info">{t("furtherInfo")}</div>
                        <div className="title-with-plus">{t("allergies")} <PlusButton onClick={() => {
                            handleUpdateItem(allergies.length, "", allergies, setAllergies);
                        }} /> </div>
                        <EditList list={allergies} setList={setAllergies} />
                        <div className="title-with-plus">{t("disabilities")} <PlusButton onClick={() => {
                            handleUpdateItem(disabilities.length, "", disabilities, setDisabilities);
                        }} /> </div>
                        <EditList list={disabilities} setList={setDisabilities} />
                        <div className="title-with-plus">{t("medications")} <PlusButton onClick={() => {
                            setMedications([...medications, { id: 0, name: "", dosage: "", frequency: "" }]);
                        }} /> </div>
                        <MedicationEditList list={medications} setList={setMedications} />

                    </div>
                </div>
            </div>
            <div className="add-pet-required-notice">
                *{t("requiredNotice")}
            </div>
            <div className="add-pet-button-set">
                <Button onPress={() => nav("/")}>
                    {t("cancel")}
                </Button>
                <Button isDisabled={!validate() || petMut.isPending} onPress={() => {
                    if (!validate())
                        return;
                    if (species == null)
                        return;
                    validateDuplicate((isValid: boolean) => {
                        if (isValid)  {
                            petMut.mutate({
                                pet: {
                                    id: 0,
                                    name: name.trim(),
                                    owner: user,
                                    isMale: isMale,
                                    castrated: castrated,
                                    species: species,
                                    subSpecies: subSpecies,
                                    dateOfBirth: dateOfBirth?.toISOString().substring(0, 10),
                                    size: parseFloat(size.replace(",", ".")),
                                    weight: parseFloat(weight.replace(",", ".")),
                                    disabilities: disabilities,
                                    medications: medications,
                                    allergies: allergies
                                },
                                file: petImageFile.file ? petImageFile.file : undefined
                            });
                        }
                    });
                }}>
                    {petMut.isPending ? <SmallLoader /> : t("submit")}
                </Button>
            </div>
        </div>
    )
}


const PlusButton = (onclick: { onClick: () => void }) => {
    return (
        <svg onClick={() => onclick.onClick()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="plus-button">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
}

const EditList = (list: { list: string[], setList: React.Dispatch<React.SetStateAction<string[]>> }) => {
    const handleUpdateItem = (index: number, newItem: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
        const newList = [...list];
        newList[index] = newItem;
        setList(newList);
    };

    return (
        <div className="edit-list">
            {list.list.map((_, index) => (
                <div key={index} className="list-item">
                    <input type="text" value={list.list[index]} onChange={(e) => handleUpdateItem(index, e.target.value, list.list, list.setList)} />
                    <svg onClick={() => {
                        const newList = [...list.list];
                        newList.splice(index, 1);
                        list.setList(newList);
                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="remove-item-button">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
            ))}
        </div>
    )
}

const MedicationEditList = (list: { list: Medication[], setList: React.Dispatch<React.SetStateAction<Medication[]>> }) => {
    const [t,] = useTranslation("addPet");
    const handleUpdateItem = (index: number, event: ChangeEvent<HTMLInputElement>, list: Medication[], setList: React.Dispatch<React.SetStateAction<Medication[]>>) => {
        const newItem = event.target.value;
        const newList = [...list];
        switch (event.target.id) {
            case "name":
                newList[index].name = newItem;
                break;
            case "dosage":
                newList[index].dosage = newItem;
                break;
            case "frequency":
                newList[index].frequency = newItem;
                break;
        }
        setList(newList);
    };

    return (
        <div className="edit-list">
            {list.list.map((_, index) => (
                <div key={index} className="list-item">
                    <div className="medication-inputs">
                        <input type="text" id="name" placeholder={t("name")} value={list.list[index].name} onChange={(e) => handleUpdateItem(index, e, list.list, list.setList)} />
                        <input type="text" id="dosage" placeholder={t("dosage")} value={list.list[index].dosage} onChange={(e) => handleUpdateItem(index, e, list.list, list.setList)} />
                        <input type="text" id="frequency" placeholder={t("frequency")} value={list.list[index].frequency} onChange={(e) => handleUpdateItem(index, e, list.list, list.setList)} />
                    </div>
                    <svg onClick={() => {
                        const newList = [...list.list];
                        newList.splice(index, 1);
                        list.setList(newList);
                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="remove-item-button">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
            ))}
        </div>
    )
}

export default AddPet
