import { User } from "./User";

export interface Comment {
    id: number,
    text: string,
    poster: User,
    createdAt: number,
    directAnswers?: number
}