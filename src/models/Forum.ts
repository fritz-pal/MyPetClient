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
 * Get all threads for user
 * @returns Promise for List of Threads
 */
const getAllThreadsforUser = async (userID: number): Promise<Thread[]> => {
    const request = await APIClient.get(`${MAPPING}?userId=${userID}`);
    return request.data;
}

/**
 * Get all threads for search query
 * @returns Promise for List of Threads
 */
const getAllThreadsforQuery = async (userID: number, query: string): Promise<Thread[]> => {
    const request = await APIClient.get(`${MAPPING}?query=${query}&userId=${userID}`);
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

const postCommentToThread = async (threadId: string, comment: Comment, file?: File): Promise<Comment> => {
    const formData = new FormData();
    formData.append("commentDTO", new Blob([JSON.stringify(comment)], {type: 'application/json'}));
    if (file) {
        formData.append("file", file, file.name);
    }
    const request = await APIClient.post(`${MAPPING}/${threadId}/comments`, formData, {
        transformRequest: formData => formData
    });
    return request.data;
}



export const ForumAPI = {
    getAllThreadsforUser,
    getAllThreadsforQuery,
    getThreadById,
    addThread,
    getCommentsOfThread,
    postCommentToThread
}