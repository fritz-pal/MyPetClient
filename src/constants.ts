import axios from "axios"

export const API_BASE_URL = "https://seserver.se.hs-heilbronn.de:8443/LabSWP24MyPet";

export const APIClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
});

export const SUPPORTED_LANGS = ["en", "de"];