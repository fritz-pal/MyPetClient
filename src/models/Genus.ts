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
const getAllGenus = (): Promise<Genus[]> => {
    return APIClient.get(MAPPING);
}

/**
 * Contains methods to communicate with the backend system
 */
export const GenusAPI = {
    getAllGenus
}