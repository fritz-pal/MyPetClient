import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router"
import { ForumAPI } from "../models/Forum";
import Loader from "./Loader";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import "./css/ThreadView.css"
import PosterInfo from "./PosterInfo";
import { useTranslation } from "react-i18next";
import CommentSection from "./CommentSection";
import { Comment } from "../models/Comment";

const ThreadView = () => {
    const { id } = useParams();
    const {user} = useContext(UserContext);
    const [t,] = useTranslation("thread");
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);
    const [commentText, setCommentText] = useState("");
    
    const threadQuery = useQuery({
        queryKey: ["threads", id ? id : "err"],
        queryFn: () => ForumAPI.getThreadById(id ? id : "err"),
        enabled: id != undefined
    });

    

    const postCommentMut = useMutation({
        mutationFn: (comment: Comment) => ForumAPI.postCommentToThread(id ? id : "err", comment),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["threads", id ? id : "err"]
            })
        }
    })

    const postComment = () => {
        const text = commentText.trim()
        if (text == "")
            return;
        postCommentMut.mutate({
            id: 0,
            text: text,
            poster: user,
            createdAt: Date.now(),
        })
        setCommentText("");
    }


    if (threadQuery.isLoading) {
        return (<Loader/>);
    }

    if (threadQuery.isError) {
        return (<>Error</>)
    }

    return (
        <div className="thread-page">
            <div className="thread-head">
                {threadQuery.data?.creator ? <PosterInfo poster={threadQuery.data?.creator} postedAt={threadQuery.data.createdAt}/> : <></>}
                <h2 className="thread-title">
                    {threadQuery.data?.name}
                </h2>
                <div className="thread-description">
                    {threadQuery.data?.description}
                </div>
            </div>
            <hr/>
            <div className="thread-comment-section">
                <div className="thread-post-comment">
                    <textarea className="thread-comment-text" value={commentText} onChange={(e) => setCommentText(e.target.value)}/>
                    <button disabled={commentText.trim() == ""} onClick={postComment}>{t("post")}</button>
                </div>
                <div className="thread-comments-gap">
                    <CommentPage threadID={id ? id : ""} page={1} />
                </div>
            </div>
        </div>
    );
}

const CommentPage = ({threadID, page} : {threadID: string, page: number}) => {
    const [t,] = useTranslation("thread");
    const [nextPageOpen, setNextPageOpen] = useState(false);

    const commentQuery = useQuery({
        queryKey: ["threads", threadID, page],
        queryFn: () => ForumAPI.getCommentsOfThread(threadID, page)
    })

    if (commentQuery.isLoading) {
        return <Loader/>
    }

    if (commentQuery.isError || commentQuery.data == undefined) {
        return <>{t("commentLoadFailed")}</>
    }
    
    return (
        <>
            <CommentSection comments={commentQuery.data.elements}/>
            {
                commentQuery.data.maxPage > page && !nextPageOpen ? 
                <button className="thread-next-button" onClick={() => setNextPageOpen(true)}>{t("nextPage")}</button> : 
                <></>
            }
            {nextPageOpen ? <CommentPage threadID={threadID} page={page + 1}></CommentPage> : <></> }
        </>
    );
}

export default ThreadView