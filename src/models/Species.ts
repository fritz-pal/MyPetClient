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

/**
 * Request to get a species by id: "GET to /species/{id}"
 * @param id ID of Species you want to fetch
 * @returns Promise of requested Species
 */
const getSpeciesByID = (id: Number): Promise<Species> => {
    return APIClient.get(`/species/${id}`);
}

/**
 * Update a species "PUT to /species/{id}"
 * @param species Updated Species
 * @returns Promise of updated Species
 */
const updateSpecies = (species: Species): Promise<Species> => {
    return APIClient.put(`/species/${species.id}`, species);
}

/**
 * Delete a species by id "DELETE to /species/{id}"
 * @param id ID of Species you want to delete
 * @returns Promise
 */
const deleteSpecies = (id: Number): Promise<void> => {
    return APIClient.delete(`/species/${id}`);
}

/**
 * Get al species "GET to /species"
 * @returns Promise of a Species Array
 */
const getAllSpecies = (): Promise<Species[]> => {
    return APIClient.get(`/species`);
}

/**
 * Adds a new Species "POST to /species"
 * @param species New Species
 * @returns Pomise of added Species
 */
const postSpecies = (species: Species) => {
    return APIClient.post(`/species`, species);
}

export const SpeciesQuery = {
    getSpeciesByID,
    getAllSpecies,
    updateSpecies,
    deleteSpecies,
    postSpecies
}