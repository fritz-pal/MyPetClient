import axios from "axios"

export const API_BASE_URL = process.env.NODE_ENV === 'production' ? "/api" : "http://localhost:8080/api";

export const APIClient = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
});

export const SUPPORTED_LANGS = ["en", "de"];