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

/**
 * User used for Debugging and Testing purposes
 */
export const devUser: User =   {
    id: 12,
    username: "testuser",
    fullname: "user",
    address: "xvcx",
    email: "sddsf",
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
 * Contains methods to communicate with the backend system
 */
export const UserAPI = {
    getAllUsers
}