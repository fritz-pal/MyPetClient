import { useQuery } from "@tanstack/react-query"
import { SpeciesAPI } from "../../models/Species"

const KEY = "species"

export const useSpeciesGet = (genusId: number) => {
    return useQuery({
        queryKey: [KEY, genusId],
        queryFn: () => SpeciesAPI.getAllSpeciesOfGenus(genusId)
    })
}