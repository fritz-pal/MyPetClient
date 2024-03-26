interface Pet {
    id: number
    name: string
    species: Species
    owner: User
    dateOfBirth?: Date
    size?: number
    weight?: number
    castrated?: boolean
    isMale: boolean
    favoriteFood?: string
    favoriteSpot?: string
    favoriteToy?: string
    lastVetVisit?: Date
}

interface JSONPet {
    id: number
    name: string
    species: Species
    owner: User
    dateOfBirth?: string
    size?: number
    weight?: number
    castrated?: boolean
    isMale: boolean
    favoriteFood?: string
    favoriteSpot?: string
    favoriteToy?: string
    lastVetVisit?: string
}

const JSONPetToPet = (data: JSONPet) => {
    return {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        lastVetVisit: data.lastVetVisit ? new Date(data.lastVetVisit) : undefined
    } as Pet;
}

const PetToJSONPet = (data: Pet) => {
    return {
        ...data,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toISOString() : undefined,
        lastVetVisit: data.lastVetVisit ? data.lastVetVisit.toISOString() : undefined
    }
}

const newPet = () : Pet => {
    return {
        id: 0,
        name: "",
        species: {
            id: 0,
            genus: {
                id: 0,
                name: "",
            },
            race: ""
        },
        owner: {
            id: 0,
            name: ""
        },
        isMale: false
    }
}