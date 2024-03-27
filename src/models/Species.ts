import { Genus } from "./Genus";

export interface Species {
    id: number;
    genus: Genus;
    race: string;
}

export const newSpecies = (): Species => {
    return {
        id: 0,
        genus: {
            id: 0,
            name: "",
        },
        race: ""
    }
}