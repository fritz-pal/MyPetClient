import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router"
import { ForumAPI } from "../models/Forum";
import Loader from "./Loader";
import { useContext, useMemo, useState } from "react";
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

    const commentQuery = useQuery({
        queryKey: ["threads", id ? id : "err", page],
        queryFn: () => ForumAPI.getCommentsOfThread(id ? id : "0", page),
        enabled: threadQuery.isSuccess
    })

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
    }

    const deleteCommentMut = useMutation({
        mutationFn: (id: number) => ForumAPI.deleteComment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["threads", id]
            })
        }
    })
    
    const deleteComment = (id: number) => {
        deleteCommentMut.mutate(id);
    }

    const maxPage = useMemo(() => {
        if (commentQuery.isLoading || commentQuery.isError || !commentQuery.data)
            return 0;
        else
            return commentQuery.data.maxPage;
    }, [commentQuery.data]);

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
                {commentQuery.isLoading && <Loader/>}
                {commentQuery.isError && <>Error Loading Comments</>}
                {commentQuery.isSuccess && 
                    <>
                        {maxPage > 1 && <div className="thread-comment-section-nav">
                            <button disabled={page <= 1} onClick={() => setPage(page - 1)}>b</button>
                            {page}/{maxPage}
                            <button disabled={page >= maxPage} onClick={() => setPage(page + 1)}>f</button>
                        </div>}
                        <CommentSection comments={commentQuery.data.elements}/>
                        {maxPage > 1 && <div className="thread-comment-section-nav">
                            <button disabled={page <= 1} onClick={() => setPage(page - 1)}>b</button>
                            {page}/{maxPage}
                            <button disabled={page >= maxPage} onClick={() => setPage(page + 1)}>f</button>
                        </div>}
                    </>
                }
            </div>
        </div>
    )
}

export default ThreadView