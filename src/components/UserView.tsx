import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"
import Loader from "./Loader";
import "./css/UserView.css";

import { UserAPI } from "../models/User";
import { PetCard } from "./PetList";
import Pets, { Pet, PetAPI } from "../models/Pet";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const UserView = () => {
    let { id } = useParams();
    const { user } = useContext(UserContext);
    if(id === "me") {
        id = user.id.toString();
    }
    const userQuery = useQuery({
        queryKey: ["users", id ? id : "err"],
        queryFn: () => UserAPI.getUserById(id ? id : "err"),
        enabled: id != undefined
    });

    const petQuery = useQuery({
        queryKey: ["pets", id],
        queryFn: () => PetAPI.getAllPetsOfUser(id ? Number(id) : 0)
    });
    let pets: Array<Pet> = [];
    if (petQuery.isSuccess) {
        petQuery.data.forEach(element => {
            pets.push(Pets.JSONPetToPet(element))
        });
    }

    if (userQuery.isLoading || userQuery.isError || userQuery.data == undefined) {
        return (<Loader />);
    }

    return (
        <div className="user-page">
            <div className="user-top-container">
                <div className="user-info">
                    <div className="user-username">{userQuery.data.username}</div>
                    <div className="user-fullname">{userQuery.data.fullname}</div>
                </div>
                <button className="message-button">Message</button>
            </div>
            <div className="user-pet-list">
                <PetCard pets={pets} />
            </div>
        </div>
    );
}

export default UserView;