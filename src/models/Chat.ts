import { User } from "./User";

export interface ChatMessage {
    id: number,
    from: User,
    to: User,
    createdAt: number,
    text?: String,
    imageSource?: String
}