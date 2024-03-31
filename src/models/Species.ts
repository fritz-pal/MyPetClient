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
const getSpeciesByID = async (id: Number): Promise<Species> => {
    const request = await APIClient.get(`${MAPPING}/${id}`);
    return request.data; 
}

/**
 * Update a species
 * @param species Updated Species
 * @returns Promise of updated Species
 */
const updateSpecies = async (species: Species): Promise<Species> => {
    const request = await APIClient.put(`${MAPPING}/${species.id}`, species);
    return request.data; 
}

/**
 * Delete a species by id
 * @param id ID of Species you want to delete
 * @returns Promise
 */
const deleteSpecies = async (id: Number): Promise<void> => {
    const request = await APIClient.delete(`${MAPPING}/${id}`);
    return request.data;
}

/**
 * Get al species "GET to /species"
 * @returns Promise of a Species Array
 */
const getAllSpeciesOfGenus = async (genusID: number): Promise<Species[]> => {
    const request = await APIClient.get(`${MAPPING}?genusId=${genusID}`);
    return request.data;
}

/**
 * Adds a new Species
 * @param species New Species
 * @returns Promise of added Species
 */
const postSpecies = async (species: Species) => {
    const request = await APIClient.post(MAPPING, species);
    return request.data;
}

export const SpeciesAPI = {
    getSpeciesByID,
    getAllSpeciesOfGenus,
    updateSpecies,
    deleteSpecies,
    postSpecies
}