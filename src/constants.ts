import axios from "axios"

export const API_BASE_URL = "http://localhost:8080/api"

export const APIClient = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json",
    },
})
