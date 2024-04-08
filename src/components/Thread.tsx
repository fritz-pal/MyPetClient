import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"
import { ForumAPI } from "../models/Forum";
import Loader from "./Loader";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "./css/Thread.css"
import PosterInfo from "./PosterInfo";

const Thread = () => {
    const { id } = useParams();
    const {user} = useContext(UserContext);
    
    const threadQuery = useQuery({
        queryKey: ["threads", id ? id : "err"],
        queryFn: () => ForumAPI.getThreadById(id ? id : "err"),
        enabled: id ? true : false
    });

    if (threadQuery.isLoading) {
        return (<Loader/>);
    }

    if (threadQuery.isError) {
        return (<>Error</>)
    }

    return (
        <div className="thread-page">
            <div className="thread-head">
                {threadQuery.data?.creator ? <PosterInfo user={threadQuery.data?.creator}/> : <></>}
                <h2 className="thread-title">
                    {threadQuery.data?.name}
                </h2>
                <div className="thread-description">
                    {threadQuery.data?.description}
                </div>
            </div>
            <hr/>
            <div>
                
            </div>
        </div>
    )
}

export default Thread