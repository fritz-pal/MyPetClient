import { Stomp } from "@stomp/stompjs";
import axios from "axios"
import SockJS from "sockjs-client";

export const API_BASE_URL = process.env.NODE_ENV === 'production' ? "/LabSWP24MyPet/api" : "http://localhost:8080/api";

export const APIClient = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
});

export const WS_BASE_URL = process.env.NODE_ENV === 'production' ? "/LabSWP24MyPet/ws" : "http://localhost:8080/ws";

export const WSClient = new SockJS(WS_BASE_URL);
WSClient.onopen = () => { console.log("WSClient connected"); }

export const StompClient = Stomp.over(() => WSClient);

export const SUPPORTED_LANGS = ["en", "de"];