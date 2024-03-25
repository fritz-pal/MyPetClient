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