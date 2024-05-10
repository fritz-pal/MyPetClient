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

const updateComment = async (comment: Comment): Promise<Comment> => {
    const request = await APIClient.put(`${MAPPING}/${comment.id}`, comment);
    return request.data;
};

const answerToComment = async (comment: Comment, parentID: number, file?: Blob): Promise<Page<Comment>> => {
    const formData = new FormData();
    formData.append("commentDTO", JSON.stringify(comment));
    if (file) {
        formData.append("file", file);
    }
    const request = await APIClient.post(`${MAPPING}/${parentID}/answers`, formData);
    return request.data;
};

export const CommentAPI = {
    deleteComment,
    getAnswers,
    answerToComment,
    updateComment,
};
