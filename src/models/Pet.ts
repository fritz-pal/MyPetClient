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