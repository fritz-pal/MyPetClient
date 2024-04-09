import { APIClient } from "../constants";
import { Comment } from "./Comment";
import { Page } from "./Page";
import { Species } from "./Species";
import { User } from "./User";

export interface Thread {
    id: number,
    name: string,
    species: Species,
    description: string,
    createdAt: number,
    creator?: User,
    commentCount?: number
}

const MAPPING = "/threads"

/**
 * Get all threads
 * @returns Promise for List of Threads
 */
const getAllThreads = async (): Promise<Thread[]> => {
    const request = await APIClient.get(MAPPING);
    return request.data;
}

/**
 * Get a thread by id
 * @returns Promise for Thread
 */
const getThreadById = async (id: string): Promise<Thread> => {
    const request = await APIClient.get(`${MAPPING}/${id}`);
    return request.data;
}

/**
 * Add a Thread
 * @param thread the new Thread
 * @returns Promise for the newly added Thread
 */
const addThread = async (thread: Thread): Promise<Thread> => {
    const request = await APIClient.post(MAPPING, thread);
    return request.data;
}

const getCommentsOfThread = async (threadId: string, page?: number, pageSize?: number): Promise<Page<Comment>> => {
    const request = await APIClient.get(`${MAPPING}/${threadId}/comments`, {
        params: {
            page: page,
            pageSize: pageSize
        }
    });
    return request.data;
}

export const ForumAPI = {
    getAllThreads,
    getThreadById,
    addThread,
    getCommentsOfThread
}