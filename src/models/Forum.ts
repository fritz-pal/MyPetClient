import { APIClient } from "../constants";
import { Species } from "./Species";
import { User } from "./User";

export interface Forum {
    id: number,
    name: string,
    species: Species,
    description: string,
    createdAt?: number,
    creator?: User,
    commentCount?: number
}

const MAPPING = "/forums"

/**
 * Get all forums
 * @returns Promise for List of Forums
 */
const getForums = async (): Promise<Forum[]> => {
    const request = await APIClient.get(MAPPING);
    return request.data;
}

/**
 * Add a Forum
 * @param forum the new Forum
 * @returns Promise for the newly added forum
 */
const addForum = async (forum: Forum): Promise<Forum> => {
    const request = await APIClient.post(MAPPING, forum);
    return request.data;
}

export const ForumAPI = {
    getForums,
    addForum
}