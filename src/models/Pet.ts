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
    subSpecies: string
    owner: User
    dateOfBirth?: Date
    size?: number
    weight?: number
    castrated: boolean
    isMale: boolean
    lastVetVisit?: Date
    disabilities?: string[]
    medications?: Medication[]
    allergies?: string[]
    imageSource?: string
}

/**
 * Represents a Pet which can be used for data transfer to the API
 */
export interface JSONPet {
    id: number
    name: string
    species: Species
    subSpecies: string
    owner: User
    dateOfBirth?: string
    size?: number
    weight?: number
    castrated: boolean
    isMale: boolean
    lastVetVisit?: string
    disabilities?: string[]
    medications?: Medication[]
    allergies?: string[]
    imageSource?: string
}

export interface UpdatePet {
    name?: string
    subSpecies?: string
    dateOfBirth?: Date
    size?: number
    weight?: number
    castrated?: boolean
    isMale?: boolean
    lastVetVisit?: Date
    disabilities?: string[]
    medications?: Medication[]
    allergies?: string[]
    imageSource?: string
    delete?: boolean
}

export interface Medication {
    id: number
    name: string
    dosage: string
    frequency: string
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

export const getPetChanges = (oldP: JSONPet, newP: JSONPet): JSONPet => {
    const changes: JSONPet = { id: oldP.id, isMale: oldP.isMale, owner: oldP.owner, species: oldP.species, medications: oldP.medications, disabilities: oldP.disabilities, name: oldP.name, allergies: oldP.allergies, castrated: oldP.castrated, imageSource: oldP.imageSource, subSpecies: oldP.subSpecies, dateOfBirth: oldP.dateOfBirth, lastVetVisit: oldP.lastVetVisit, size: oldP.size, weight: oldP.weight };

    if (oldP.name !== newP.name) changes.name = newP.name;
    if (oldP.species !== newP.species) changes.species = newP.species;
    if (oldP.subSpecies !== newP.subSpecies) changes.subSpecies = newP.subSpecies;
    if (oldP.owner !== newP.owner) changes.owner = newP.owner;
    if (oldP.dateOfBirth !== newP.dateOfBirth) changes.dateOfBirth = newP.dateOfBirth;
    if (oldP.size !== newP.size) changes.size = newP.size;
    if (oldP.weight !== newP.weight) changes.weight = newP.weight;
    if (oldP.castrated !== newP.castrated) changes.castrated = newP.castrated;
    if (oldP.isMale !== newP.isMale) changes.isMale = newP.isMale;
    if (oldP.lastVetVisit !== newP.lastVetVisit) changes.lastVetVisit = newP.lastVetVisit;
    if (JSON.stringify(oldP.disabilities) !== JSON.stringify(newP.disabilities)) changes.disabilities = newP.disabilities;
    if (JSON.stringify(oldP.medications) !== JSON.stringify(newP.medications)) changes.medications = newP.medications;
    if (JSON.stringify(oldP.allergies) !== JSON.stringify(newP.allergies)) changes.allergies = newP.allergies;
    if (oldP.imageSource !== newP.imageSource) changes.imageSource = newP.imageSource;

    return changes;
}


/**
 * Creates a empty Pet
 * @returns A new Pet
 */
const newPet = (): Pet => {
    return {
        id: 0,
        name: "",
        species: {
            id: 0,
            name: "",
        },
        subSpecies: "",
        owner: {
            id: 0,
            username: "",
            fullname: "",
            email: ""
        },
        isMale: false,
        castrated: false,
        disabilities: [],
        medications: [],
        allergies: [],
    }
}

export const Pets = {
    JSONPetToPet,
    PetToJSONPet,
    newPet
}


const MAPPING = "/pets"

/**
 * Request to get a Pet by id
 * @param id ID of Pet you want to fetch
 * @returns Promise of requested Pet
 */
const getPetByID = async (id: Number): Promise<JSONPet> => {
    const request = await APIClient.get(`${MAPPING}/${id}`);
    return request.data;
}

/**
 * Update a Pet
 * @param species Updated Species
 * @returns Promise of updated Species
 */
const updatePet = async (pet: JSONPet): Promise<JSONPet> => {
    const request = await APIClient.put(`${MAPPING}/${pet.id}`, pet);
    return request.data;
}

/**
 * Delete a Pet by id
 * @param id ID of Pet you want to delete
 * @returns Promise
 */
const deletePet = async (id: Number): Promise<void> => {
    const request = await APIClient.delete(`${MAPPING}/${id}`);
    return request.data;
}

/**
 * Get all Pets of a user
 * @returns Promise of a Pet Array
 */
const getAllPetsOfUser = async (userID: number): Promise<JSONPet[]> => {
    const request = await APIClient.get(`${MAPPING}?userId=${userID}`);
    return request.data;
}

/**
 * Adds a new Pet
 * @param species New Pet
 * @returns Promise of added Pet
 */
const addPet = async (pet: JSONPet, image?: File): Promise<JSONPet> => {
    const formData = new FormData();
    formData.append("pet", new Blob([JSON.stringify(pet)], { type: 'application/json' }));
    if (image)
        formData.append("file", image);
    const request = await APIClient.post(MAPPING, formData, {
        transformRequest: formData => formData
    });
    return request.data;
}

export const PetAPI = {
    getAllPetsOfUser,
    getPetByID,
    deletePet,
    updatePet,
    addPet
}

export default Pets