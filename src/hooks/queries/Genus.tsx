import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Genus, GenusAPI } from "../../models/Genus";

const KEY = "genus"

export const useGenusGet = () => useQuery({
    queryKey: [KEY],
    queryFn: () => GenusAPI.getAllGenus(),
});

export const useGenusAdd = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (genus: Genus) => GenusAPI.addGenus(genus),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [KEY]})
        }
    })
}

