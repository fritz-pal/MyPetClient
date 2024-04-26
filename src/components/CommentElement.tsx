import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Comment } from "../models/Comment";
import { CommentAPI } from "../models/Comment";
import PosterInfo from "./PosterInfo";
import "./css/CommentElement.css"
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from 'react';
import { Button } from "react-aria-components";
import ReactTextareaAutosize from "react-textarea-autosize";


const CommentElement = ({comment} : {comment: Comment}) => {
    const queryClient = useQueryClient();
    const [t,] = useTranslation("comment");
    const { user } = useContext(UserContext); 
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [answerOpen, setAnswerOpen] = useState(false);
    
    /*Nico Anfang*/
    /*Nico Ende*/


    const deleteCommentMut = useMutation({
        mutationFn: () => CommentAPI.deleteComment(comment.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["threadComments", comment.threadID ? comment.threadID : "err"]
            })
            setIsDeleted(true);
        }
    })

    const handleDeleteClick = () => {
        if (deleteClicked) {
            deleteCommentMut.mutate();
        } else {
            setDeleteClicked(true);
        }
    };

    const handleAnswerClicked = () => {
        setAnswerOpen(true);
    }

    if (isDeleted) {
        return <div className="comment">Deleted</div>
    }

    return (
        <div className="comment">
            <PosterInfo poster={comment.poster} postedAt={comment.createdAt}/>
            <div className="comment-body">
                {comment.text.split("\n").map((line) => {return line != "" ? <div className="comment-line">{line}</div> : <br/>})}
            </div>
            {!answerOpen && <div className="comment-options">
                <Button className={`comment-option-button${deleteClicked ? ' confirm' : ''}${comment.poster.id != user.id ? " hidden": ""}`}  onPress={handleDeleteClick}>
                    {deleteClicked ? t("confirm") : t("delete")}
                </Button>
                <Button className="comment-option-button" onPress={handleAnswerClicked}>{t("answer")}</Button>
            </div>}
            {answerOpen && <div className="comment-answer-post">
                <ReactTextareaAutosize className="comment-answer-text"/>
                <Button className="comment-answer-button-cancel">{t("cancel")}</Button>
                <Button className="comment-answer-button-submit">{t("answer")}</Button>
            </div>}
            {/*Nico Anfang*/}
            {/*Nico Ende*/}
        </div>
    )
}


export default CommentElement