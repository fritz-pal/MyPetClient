export interface Genus {
    id: number;
    name: string;
}

export const newGenus = () : Genus => {
    return {
        id: 0,
        name: "",
    }
}