import { APIClient } from "../constants"
import { OptionalResponse } from "./OptionalResponse"

export interface RegisterData {
    username: string,
    fullname?: string,
    email: string,
    password: string
}

export interface LoginData {
    username: string;
    password: string;
}

const MAPPING = "/auth"
const register = async (data: RegisterData): Promise<OptionalResponse<void>> => {
    const request = await APIClient.post(MAPPING + "/register", data);
    return request.data;
}

const login = async (data: LoginData): Promise<OptionalResponse<void>> => {
    const request = await APIClient.post(MAPPING + "/authenticate", data);
    return request.data;
}

const logout = async (): Promise<void> => {
    const request = await APIClient.post(MAPPING + "/logout");
    return request.data;
}

const validate = async (): Promise<boolean> => {
    const request = await APIClient.get(MAPPING + "/validate")
    return Boolean(request.data);
}

export const AuthAPI = {
    register,
    login,
    logout,
    validate
}