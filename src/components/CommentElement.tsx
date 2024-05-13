import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Comment } from "../models/Comment";
import { CommentAPI } from "../models/Comment";
import PosterInfo from "./PosterInfo";
import "./css/CommentElement.css";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";
import { Button } from "react-aria-components";
import CommentSection from "./CommentSection";
import CommentInput from "./CommentInput";

const CommentElement = ({ comment }: { comment: Comment }) => {
    const queryClient = useQueryClient();
    const [t] = useTranslation("comment");
    const { user } = useContext(UserContext);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [newAnswerOpen, setNewAnswerOpen] = useState(false);
    const [editClicked, setEditClicked] = useState(false);

    const [hasAnswers, setHasAnswers] = useState(
        comment.directAnswers && comment.directAnswers > 0 ? true : false
    );
    const [answersOpen, setAnswersOpen] = useState(false);

    const postAnswerMut = useMutation({
        mutationFn: ({answer, file}: {answer: Comment, file?: File}) =>
            CommentAPI.answerToComment(answer, comment.id, file),
        onSuccess: (data) => {
            console.log("posted answer for id:", comment.id, data);
            queryClient.invalidateQueries({
                queryKey: ["comments", comment.id, "answers"],
            });
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey[0] === "comments" &&
                    query.queryKey[1] === comment.id &&
                    query.queryKey[2] === "answers",
            });
            if (comment.directAnswers != undefined) {
                comment.directAnswers++;
            }
            setNewAnswerOpen(false);
            setHasAnswers(true);
            setAnswersOpen(true);
        },
    });

    const handleAnswerPostClick = (answer: Comment, file?: File) => {
        answer.threadID = comment.threadID;
        postAnswerMut.mutate({
            answer: answer,
            file: file
        });
    };

    const editCommentMut = useMutation({
        mutationFn: ({editedComment}:{editedComment: Comment, file?: File}) =>
            CommentAPI.updateComment(editedComment),
        onSuccess: (data) => {
            comment.text = data.text;
        },
    });

    const deleteCommentMut = useMutation({
        mutationFn: () => CommentAPI.deleteComment(comment.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    "threadComments",
                    comment.threadID ? comment.threadID : "err",
                ],
            });
            setIsDeleted(true);
        },
    });

    const handleDeleteClick = () => {
        if (deleteClicked) {
            deleteCommentMut.mutate();
        } else {
            setDeleteClicked(true);
        }
    };

    const handleEditClick = (comment: Comment, file?: File) => {
        editCommentMut.mutate({editedComment: comment, file});
        setEditClicked(false);
    };

    if (isDeleted) {
        return <div className="comment">Deleted</div>;
    }

    return (
        <div className="comment" key={comment.id}>
            <PosterInfo poster={comment.poster} postedAt={comment.createdAt} />
            <div className="comment-body">
                {editClicked && (
                    <CommentInput initialComment={comment} onCancel={() => setEditClicked(false)} isLoading={editCommentMut.isPending} onSubmit={handleEditClick} />
                )}
                {!editClicked &&
                    <>
                        {comment.text.split("\n").map((line) => {
                            return line != "" ? (
                                <div className="comment-line">{line}</div>
                            ) : (
                                <br />
                            );
                        })}
                        {comment.imageSource ? <img className="comment-image" src={comment.imageSource}/> : <></>}
                    </>
                }
            </div>
            {!newAnswerOpen && !editClicked && (
                <div className="comment-options">
                    <Button
                        className={`comment-option-button${deleteClicked ? " confirm" : ""
                            }${comment.poster.id != user.id ? " hidden" : ""}`}
                        onPress={handleDeleteClick}>
                        {deleteClicked ? t("confirm") : t("delete")}
                    </Button>
                    <Button
                        className="editCommentButton"
                        onPress={() => setEditClicked(true)}>
                        {t("edit")}
                    </Button>
                    <Button
                        className="comment-option-button"
                        onPress={() => setNewAnswerOpen(true)}>
                        {t("answer")}
                    </Button>
                </div>
            )}
            {newAnswerOpen && (
                <CommentInput onSubmit={handleAnswerPostClick} isLoading={postAnswerMut.isPending} onCancel={() => setNewAnswerOpen(false)}/>
            )}
            {hasAnswers && !answersOpen && (
                <Button
                    className={"comment-answers-open-button"}
                    onPress={() => setAnswersOpen(true)}>
                    {t("openAnswers", { count: comment.directAnswers })}
                </Button>
            )}
            {answersOpen && (
                <div className="comment-answers-section">
                    <div className="comment-answers-left">
                        <Button
                            className={"comment-answers-close-button"}
                            onPress={() => setAnswersOpen(false)}
                        />
                        <div className="comment-answers-line" />
                    </div>
                    <div className="comment-answers-content">
                        <AnswerPage commentId={comment.id} page={1} />
                    </div>
                </div>
            )}
        </div>
    );
};

const AnswerPage = ({ commentId, page }: { commentId: number, page: number }) => {
    const [t] = useTranslation("comment");

    const [nextPageOpen, setNextPageOpen] = useState(false);

    const answerQuery = useQuery({
        queryKey: ["comments", commentId, "answers", page],
        queryFn: () => CommentAPI.getAnswers(commentId, page),
        staleTime: 0,
    });

    if (!answerQuery.isSuccess) {
        return <></>;
    }

    return (
        <>
            <CommentSection comments={answerQuery.data.elements} />
            {page < answerQuery.data.maxPage && !nextPageOpen ? (
                <Button onPress={() => setNextPageOpen(true)}>
                    {t("moreAnswers")}
                </Button>
            ) : (
                <></>
            )}
            {nextPageOpen && <AnswerPage commentId={commentId} page={page++} />}
        </>
    );
};

export default CommentElement;
