import { User } from "./User";
import { APIClient } from "../constants";

export interface Comment {
    id: number,
    text: string,
    poster: User,
    createdAt: number,
    directAnswers?: number
}

export interface JSONComment {
    id: number,
    text: string,
    poster: User,
    createdAt: number,
    directAnswers?: number
}

const MAPPING = "/comments"


const deleteComment = async (id: number): Promise<void> => {
    try {
        await APIClient.delete(`${MAPPING}/${id}`);
    } catch (error) {
        console.error('Fehler beim Löschen des Kommentars:', error);
    }
    return;
}

export const CommentAPI = {
    deleteComment
}