import { Genus } from "./Genus";
import { APIClient } from "../constants";

/**
 * Represents the Species of a Pet
 */
export interface Species {
    id: number;
    genus: Genus;
    race: string;
}

/**
 * Creates a empty Species
 * @returns Empty Species
 */
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

const MAPPING = "/species"

/**
 * Request to get a species by id
 * @param id ID of Species you want to fetch
 * @returns Promise of requested Species
 */
const getSpeciesByID = (id: Number): Promise<Species> => {
    return APIClient.get(`${MAPPING}/${id}`);
}

/**
 * Update a species
 * @param species Updated Species
 * @returns Promise of updated Species
 */
const updateSpecies = (species: Species): Promise<Species> => {
    return APIClient.put(`${MAPPING}/${species.id}`, species);
}

/**
 * Delete a species by id
 * @param id ID of Species you want to delete
 * @returns Promise
 */
const deleteSpecies = (id: Number): Promise<void> => {
    return APIClient.delete(`${MAPPING}/${id}`);
}

/**
 * Get al species "GET to /species"
 * @returns Promise of a Species Array
 */
const getAllSpeciesOfGenus = (genusID: Number): Promise<Species[]> => {
    return APIClient.get(`${MAPPING}?genusId=${genusID}`);
}

/**
 * Adds a new Species
 * @param species New Species
 * @returns Promise of added Species
 */
const postSpecies = (species: Species) => {
    return APIClient.post(MAPPING, species);
}

export const SpeciesAPI = {
    getSpeciesByID,
    getAllSpeciesOfGenus,
    updateSpecies,
    deleteSpecies,
    postSpecies
}