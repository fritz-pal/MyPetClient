import { User } from "./User";
import { APIClient } from "../constants";
import { Page } from "./Page";

export interface Comment {
    id: number;
    text: string;
    poster: User;
    createdAt: number;
    imageSource?: string;
    threadID?: number;
    directAnswers?: number;
}

export interface CommentChanges {
    id: number;
    text?: string;
    deleteImage?: boolean;
}

export const getCommentChanges = (oldC: Comment, newC: Comment): CommentChanges => {
    const changes: CommentChanges = {id: oldC.id};
    if (oldC.text != newC.text)
        changes.text = newC.text;
    if (oldC.imageSource && !newC.imageSource)
        changes.deleteImage = true;
    return changes;
}

const MAPPING = "/comments";

const deleteComment = async (id: number): Promise<void> => {
    const request = await APIClient.delete(`${MAPPING}/${id}`);
    return request.data;
};

const getAnswers = async (commentId: number, page?: number, pageSize?: number): Promise<Page<Comment>> => {
    const request = await APIClient.get(`${MAPPING}/${commentId}/answers`, {
        params: {
            page: page,
            pageSize: pageSize,
        },
    });
    return request.data;
};

const updateComment = async (changes: CommentChanges, image?: File): Promise<Comment> => {
    const formData = new FormData();
    formData.append("commentDTO", new Blob([JSON.stringify(changes)], {type: 'application/json'}));
    if (image) {
        formData.append("file", image, image.name);
    }
    const request = await APIClient.put(`${MAPPING}/${changes.id}`, changes);
    return request.data;
};

const answerToComment = async (comment: Comment, parentID: number, file?: File): Promise<Page<Comment>> => {
    const formData = new FormData();
    formData.append("commentDTO", new Blob([JSON.stringify(comment)], {type: 'application/json'}));
    if (file) {
        formData.append("file", file, file.name);
    }
    const request = await APIClient.post(`${MAPPING}/${parentID}/answers`, formData, {
        transformRequest: formData => formData
    });
    return request.data;
};

export const CommentAPI = {
    deleteComment,
    getAnswers,
    answerToComment,
    updateComment,
};
