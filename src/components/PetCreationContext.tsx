import { SetStateAction, createContext, useState } from "react";
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
    console.log(pet.species.genus.id);
    if (pet.species.genus.id == 0)
        return 1;
    if (pet.name == "")
        return 2;
    if (pet.species.id == 0)
        return 3;
    return 5;
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