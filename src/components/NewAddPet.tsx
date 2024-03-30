import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Genus, GenusAPI } from "../models/Genus";
import { Species, SpeciesAPI } from "../models/Species";
import { useGenusGet } from "../hooks/queries/Genus";
import { useSpeciesGet } from "../hooks/queries/Species";
import { useState } from "react";

const AddPet = () => {
    const genusQuery = useGenusGet();
    //const speciesQuery = useSpeciesGet();
    const [name, setName] = useState<null | string>(null);
    const [isMale, setIsMale] = useState<boolean>(false);
    const [castrated, setCastrated] = useState<boolean>(false);
    const [genus, setGenus] = useState<null | Genus>(null);
    const [species, setSpecies] = useState<null | Species>(null);
    const [dateOfBirth, date] = useState<null | Date>(null);
    const [size, setSize] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);

    return (
        <div className="add-pet-page">
            <div className="add-pet-essentialsframe">
                {/* Image name gender and castrated */}
            </div>
            <div className="add-pet-speciesframe">
                {/* Genus and species */}
            </div>
            <div className="add-pet-additionalsframe">
                {/* Date of birth size weight (favorites?) */}
            </div>
        </div>
    )
}