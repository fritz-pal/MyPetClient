import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Comment } from "../models/Comment";
import { CommentAPI } from "../models/Comment";
import PosterInfo from "./PosterInfo";
import "./css/CommentElement.css"
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from 'react';


const CommentElement = ({comment} : {comment: Comment}) => {
const [t,] = useTranslation("comment");
const { user } = useContext(UserContext); 
const [clicked, setClicked] = useState(false);

    const queryClient = useQueryClient();
    const { id } = useParams();


    const deleteCommentMut = useMutation({
        mutationFn: (id: number) => CommentAPI.deleteComment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["threads", id]
            })
        }
    })

    const handleClick = () => {
        if (clicked) {
          deleteComment(comment.id);
        } else {
          setClicked(true);
        }
     };
    
    const deleteComment = (id: number) => {
        console.log(`deleteComment called with id: ${id}`);
        deleteCommentMut.mutate(id);
    }
    return (
        <div className="comment">
            <PosterInfo poster={comment.poster} postedAt={comment.createdAt}/>
            <div className="comment-body">
                {comment.text.split("\n").map((line) => {return line != "" ? <div className="comment-line">{line}</div> : <br/>})}
                {comment.poster.id == user.id ?
                <button className={`deleteButton-Comment ${clicked ? 'confirm' : ''}`}  onClick={handleClick}>
                {clicked ? t("confirm") : t("delete")}
              </button>: ""}
            </div>
        </div>
    )
}


export default CommentElement