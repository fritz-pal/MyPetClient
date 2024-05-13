import { useParams } from "react-router"
import { PetAPI } from "../models/Pet";
import { useQuery } from "@tanstack/react-query";

const PetProfile = () => {
    const { id } = useParams();
    console.log(id);

    const petQuery = useQuery({
        queryKey: ["pets", id],
        queryFn: () => PetAPI.getPetByID(id ? Number(id) : 0)
    });

    if (petQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (petQuery.error) {
        return <div>Error: {petQuery.error.message}</div>;
    }

    return (
        <div>
            <h1>{petQuery.data?.name}</h1>
            <h2>{petQuery.data?.dateOfBirth}</h2>
        </div>
    );
}

export default PetProfile;