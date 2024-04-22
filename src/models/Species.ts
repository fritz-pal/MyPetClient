import { APIClient } from "../constants";

/**
 * Represents a Species of Pets
 */
export interface Species {
    id: number;
    name: string;
}

/**
 * Creates a new empty Species
 * @returns New Species
 */
export const newSpecies = (): Species => {
    return {
        id: 0,
        name: "",
    }
}

const MAPPING = "/species"

/**
 * Get All Species
 * @returns Promise for all Species
 */
const getAllSpecies = async (): Promise<Species[]> => {
    const request = await APIClient.get(MAPPING);
    return request.data;
}

/**
 * Adds a new Species
 * @param species New Species
 * @returns Promise of the new Species
 */
const addSpecies = async (species: Species): Promise<Species> => {
    const request = await APIClient.post(MAPPING, species);
    return request.data;
}

const deleteSpecies = async (id: number): Promise<void> => {
    await APIClient.delete(`${MAPPING}/${id}`);
}

/**
 * Contains methods to communicate with the backend system
 */
export const SpeciesAPI = {
    getAllSpecies,
    deleteSpecies,
    addSpecies
}