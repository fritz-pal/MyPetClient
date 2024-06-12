import { APIClient } from "../constants";
import { Page } from "./Page";
import { User } from "./User";

export interface ChatRoom {
    id: number,
    lastMessage?: ChatMessage,
    users: User[],
    direct: boolean,
    name?: string
}

export interface ChatMessage {
    id: number,
    from: User,
    createdAt: number,
    chatRoomId: number,
    text?: String,
    imageSource?: String
}

export const getOtherUserInChat = (chatroom: ChatRoom, me: User) => {
    let otherUser: User = me;
    chatroom.users.forEach(member => {
        if (member.id != me.id)
            otherUser = member;
    });
    return otherUser;
}

const MAPPING = "/chats"

const getChat = async (id: number): Promise<ChatRoom> => {
    const request = await APIClient.get(`${MAPPING}/${id}`);
    return request.data;
}

const getChatWithUser = async (id: number): Promise<ChatRoom> => {
    const request = await APIClient.get(`${MAPPING}/user/${id}`);
    return request.data;
}

const getAllChats = async (): Promise<ChatRoom[]> => {
    const request = await APIClient.get(MAPPING);
    return request.data;
}

const getChatMessages = async (chatId: number, page?: number, pageSize?: number, offset?: number): Promise<Page<ChatMessage>> => {
    const request = await APIClient.get(`${MAPPING}/${chatId}/messages`, {
        params: {
            page: page,
            pageSize: pageSize,
            offset: offset
        },
    });
    return request.data;
}

const sendChatMessage = async (chatId: number, message: ChatMessage, file?: File): Promise<ChatMessage> => {
    const formData = new FormData();
    formData.append("chatMessage", new Blob([JSON.stringify(message)], {type: 'application/json'}));
    if (file) {
        formData.append("file", file, file.name);
    }
    const request = await APIClient.post(`${MAPPING}/${chatId}/messages`, formData, {
        transformRequest: formData => formData
    });
    return request.data;
}

const startNewChat = async (targetUser: number, message: ChatMessage, file?: File): Promise<ChatMessage> => {
    const formData = new FormData();
    formData.append("chatMessage", new Blob([JSON.stringify(message)], {type: 'application/json'}));
    if (file) {
        formData.append("file", file, file.name);
    }
    const request = await APIClient.post(`${MAPPING}/user/${targetUser}`, formData, {
        transformRequest: formData => formData
    });
    return request.data;
}

export const ChatAPI = {
    getChat,
    getChatWithUser,
    getAllChats,
    getChatMessages,
    sendChatMessage,
    startNewChat
}