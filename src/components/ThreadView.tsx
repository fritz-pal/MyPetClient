import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router"
import { ForumAPI } from "../models/Forum";
import Loader from "./Loader";
import { useState } from "react";
import "./css/ThreadView.css"
import PosterInfo from "./PosterInfo";
import { useTranslation } from "react-i18next";
import CommentSection from "./CommentSection";
import { Comment } from "../models/Comment";
import { Button } from "react-aria-components";
import CommentInput from "./CommentInput";

const ThreadView = () => {
    const { id } = useParams();
    const [t,] = useTranslation("thread");
    const queryClient = useQueryClient();
    
    const threadQuery = useQuery({
        queryKey: ["threads", id ? id : "err"],
        queryFn: () => ForumAPI.getThreadById(id ? id : "err"),
        enabled: id != undefined
    });

    const postCommentMut = useMutation({
        mutationFn: ({comment, file}:{comment: Comment, file?: File}) => ForumAPI.postCommentToThread(id ? id : "err", comment, file),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["threadComments", id ? id : "err"]
            })
        }
    });

    const handleSubmit = (comment: Comment, file?: File) => {
        comment.threadID = id ? parseInt(id) : 0;
        postCommentMut.mutate({comment, file});
    }

    if (threadQuery.isLoading) {
        return (<Loader/>);
    }

    if (threadQuery.isError) {
        return (<>Error</>)
    }

    return (
        <div className="scroll-page">
            <div className="thread-main">
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
                    <CommentInput isLoading={postCommentMut.isPending} onSubmit={handleSubmit} placeHolder={t("newComment")}/>
                    <div className="thread-comments-gap">
                        <CommentPage threadID={id ? id : ""} page={1} />
                    </div>
                </div>
            </div>

        </div>
    );
}

const CommentPage = ({threadID, page} : {threadID: string, page: number}) => {
    const [t,] = useTranslation("thread");
    const [nextPageOpen, setNextPageOpen] = useState(false);

    const commentQuery = useQuery({
        queryKey: ["threadComments", threadID, page],
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
                <Button className="thread-next-button" onPress={() => setNextPageOpen(true)}>{t("nextPage")}</Button> : 
                <></>
            }
            {nextPageOpen ? <CommentPage threadID={threadID} page={page + 1}></CommentPage> : <></> }
        </>
    );
}

export default ThreadView