import { APIClient } from "../constants";

/**
 * Represents a Genus of Pets
 */
export interface Genus {
    id: number;
    name: string;
}

/**
 * Creates a new empty Genus
 * @returns New Genus
 */
export const newGenus = () : Genus => {
    return {
        id: 0,
        name: "",
    }
}

const MAPPING = "/genus"

/**
 * Get All Genus
 * @returns Promise for all Genus
 */
const getAllGenus = async (): Promise<Genus[]>  => {
    const request = await APIClient.get(MAPPING);
    return request.data;
}

/**
 * Adds a new Genus
 * @param genus New Genus
 * @returns Promise of the new Genus
 */
const addGenus = async (genus: Genus): Promise<Genus> => {
    const request = await APIClient.post(MAPPING, genus);
    return request.data;
} 

/**
 * Contains methods to communicate with the backend system
 */
export const GenusAPI = {
    getAllGenus,
    addGenus
}