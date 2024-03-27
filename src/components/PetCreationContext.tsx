import { SetStateAction, createContext, useReducer, useState } from "react";
import { Genus } from "../models/Genus";
import { Species } from "../models/Species";
import Pets, { Pet } from "../models/Pet";

interface PetContextProps {
    pet: Pet;
    setPet: React.Dispatch<SetStateAction<Pet>>;
}

export const PetContext = createContext<PetContextProps>({
    pet: Pets.newPet(),
    setPet: () => {},
});

export function getPageProgress(pet: Pet) {
    if (pet.species.genus.id == 0)
        return 1;
    if (pet.name == "")
        return 2;
    if (pet.species.id == 0)
        return 3;
    return 7;
}

const PetCreationContext = ({children}: {children: JSX.Element}) =>{
    const [pet, setPet] = useState(Pets.newPet());
    
    return (
        <PetContext.Provider value={{pet, setPet}}>
            {children}
        </PetContext.Provider>
    )
}

export default PetCreationContext