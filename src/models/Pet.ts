import { APIClient } from "../constants"
import { Species } from "./Species"
import { User } from "./User"

/**
 * Represents a Pet, can't be used for data transfer to the API
 */
export interface Pet {
    id: number
    name: string
    species: Species
    owner: User
    dateOfBirth?: Date
    size?: number
    weight?: number
    castrated?: boolean
    isMale: boolean
    favoriteFood?: string
    favoriteSpot?: string
    favoriteToy?: string
    lastVetVisit?: Date
}

/**
 * Represents a Pet which can be used for data transfer to the API
 */
export interface JSONPet {
    id: number
    name: string
    species: Species
    owner: User
    dateOfBirth?: string
    size?: number
    weight?: number
    castrated?: boolean
    isMale: boolean
    favoriteFood?: string
    favoriteSpot?: string
    favoriteToy?: string
    lastVetVisit?: string
}

/**
 * Converts a JSONPet into a Pet
 * @param data JSONPet that will be converted
 * @returns The converted Pet
 */
const JSONPetToPet = (data: JSONPet) => {
    return {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        lastVetVisit: data.lastVetVisit ? new Date(data.lastVetVisit) : undefined
    } as Pet;
}

/**
 * Converts a Pet into a JSONPet for data transfer
 * @param data Pet that will be converted
 * @returns Converted JSONPet
 */
const PetToJSONPet = (data: Pet) => {
    return {
        ...data,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toISOString() : undefined,
        lastVetVisit: data.lastVetVisit ? data.lastVetVisit.toISOString() : undefined
    }
}

/**
 * Creates a empty Pet
 * @returns A new Pet
 */
const newPet = () : Pet => {
    return {
        id: 0,
        name: "",
        species: {
            id: 0,
            genus: {
                id: 0,
                name: "",
            },
            race: ""
        },
        owner: {
            id: 0,
            username: "",
            fullname: "",
            email: ""
        },
        isMale: false,
        castrated: false
    }
}

const Pets = {
    JSONPetToPet,
    PetToJSONPet,
    newPet
}

const MAPPING = "/pet"

/**
 * Request to get a Pet by id
 * @param id ID of Pet you want to fetch
 * @returns Promise of requested Pet
 */
const getPetByID = (id: Number): Promise<JSONPet> => {
    return APIClient.get(`${MAPPING}/${id}`);
}

/**
 * Update a Pet
 * @param species Updated Species
 * @returns Promise of updated Species
 */
const updatePet = (pet: Pet): Promise<Pet> => {
    return APIClient.put(`${MAPPING}/${pet.id}`, pet);
}

/**
 * Delete a Pet by id
 * @param id ID of Pet you want to delete
 * @returns Promise
 */
const deletePet = (id: Number): Promise<void> => {
    return APIClient.delete(`${MAPPING}/${id}`);
}

/**
 * Get all Pets of a user
 * @returns Promise of a Pet Array
 */
const getAllPetsOfUser = (): Promise<Pet[]> => {
    return APIClient.get(MAPPING);
}

/**
 * Adds a new Pet
 * @param species New Pet
 * @returns Promise of added Pet
 */
const addPet = (pet: Pet): Promise<Pet> => {
    return APIClient.post(MAPPING, pet);
}

export const PetAPI = {
    getAllPetsOfUser,
    getPetByID,
    deletePet,
    updatePet,
    addPet
}

export default Pets