import { User } from "./User";

export interface ChatRoom {
    id: number,
    lastMessage: ChatMessage,
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