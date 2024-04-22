import { APIClient } from "../constants";

/**
 * Represents a User
 */
export interface User {
    id: number;
    username: string;
    fullname?: string;
    address?: string;
    email?: string;
    password?: string;
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
 * Get the User that is currently logged in
 * @returns Promise for User
 */
const getMyUser = async (): Promise<User> => {
    const request = await APIClient.get(MAPPING + "/me");
    return request.data;
}

/**
 * Get a thread by id
 * @returns Promise for User
 */
const getUserById = async (id: string): Promise<User> => {
    const request = await APIClient.get(`${MAPPING}/${id}`);
    return request.data;
}

/**
 * Contains methods to communicate with the backend system
 */
export const UserAPI = {
    getUserById,
    getMyUser
}