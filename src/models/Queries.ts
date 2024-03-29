import axios from "axios";
import { Species } from "./Species"

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json",
    },
})

/**
 * Request to get a species by id: "GET to /species/{id}"
 * @param id ID of Species you want to fetch
 * @returns Promise of requested Species
 */
const getSpeciesByID = (id: Number): Promise<Species> => {
    return axiosClient.get(`/species/${id}`);
}

const updateSpecies = (species: Species) => {
    return axiosClient.put(`/species/${species.id}`, species);
}

const deleteSpecies = (id: Number) => {
    return axiosClient.delete(`/species/${id}`);
}

const getAllSpecies = () => {

}

const postSpecies = () => {

}