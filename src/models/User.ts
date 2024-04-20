import { APIClient } from "../constants";

/**
 * Represents a User
 */
export interface User {
    id: number;
    username: string;
    fullname: string;
    address?: string;
    email: string;
}

/**
 * Creates a new empty user
 * @returns New User
 */
export const newUser = (): User => {
    return {
        id: 0,
        username: "",
        fullname: "",
        email: ""
    }
}

const MAPPING = "/users"


/**
 * Get All Users
 * @returns Promise for all Users
 */
const getAllUsers = async (): Promise<User[]> => {
    const request = await APIClient.get(MAPPING);
    return request.data;
}

/**
 * Get the User that is currently logged in
 * @returns Promise for User
 */
const getMyUser = async (): Promise<User> => {
    const request = await APIClient.get(MAPPING + "/me");
    return request.data;
}

/**
 * Contains methods to communicate with the backend system
 */
export const UserAPI = {
    getAllUsers,
    getMyUser
}