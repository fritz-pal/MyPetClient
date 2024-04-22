import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"
import Loader from "./Loader";

import { UserAPI } from "../models/User";

const UserView = () => {
    const { id } = useParams();

    const userQuery = useQuery({
        queryKey: ["users", id ? id : "err"],
        queryFn: () => UserAPI.getUserById(id ? id : "err"),
        enabled: id != undefined
    });

    if (userQuery.isLoading || userQuery.isError || userQuery.data == undefined) {
        return (<Loader />);
    }

    return (
        <div className="user-page">
            <h1>{userQuery.data.username}</h1>
            <h2>{userQuery.data.fullname}</h2>
            <h3>{userQuery.data.email}</h3>
        </div>
    );
}

export default UserView;