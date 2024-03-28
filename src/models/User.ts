export interface User {
    id: number;
    username: string;
    fullname: string;
    address?: string;
    email: string;
}

export const newUser = (): User => {
    return {
        id: 0,
        username: "",
        fullname: "",
        email: ""
    }
}

export const devUser = (): User => {
    return {
        id: 2,
        username: "gpermant",
        fullname: "Gerald",
        address: "gerald.permantier@hs-heilbronn.de",
        email: "Hochschule Heilbronn"
    }
}