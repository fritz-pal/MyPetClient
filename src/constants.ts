import axios from "axios"

export const API_BASE_URL = "https://seserver.se.hs-heilbronn.de:8443/LabSWP24MyPet/api";
//export const API_BASE_URL = "http://localhost:8080/api";

export const APIClient = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
});

export const SUPPORTED_LANGS = ["en", "de"];