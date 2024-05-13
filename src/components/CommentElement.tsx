import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Comment } from "../models/Comment";
import { CommentAPI } from "../models/Comment";
import PosterInfo from "./PosterInfo";
import "./css/CommentElement.css";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";
import { Button, FileTrigger } from "react-aria-components";
import ReactTextareaAutosize from "react-textarea-autosize";
import CommentSection from "./CommentSection";
import ImageSelectButton from "./ImageSelectButton";
import useFile from "../hooks/useFile";
import CrossButton from "./CrossButton";

const CommentElement = ({ comment }: { comment: Comment }) => {
    const queryClient = useQueryClient();
    const [t] = useTranslation("comment");
    const { user } = useContext(UserContext);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [newAnswerOpen, setNewAnswerOpen] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [commentText, setCommentText] = useState(comment.text);

    const [hasAnswers, setHasAnswers] = useState(
        comment.directAnswers && comment.directAnswers > 0 ? true : false
    );
    const [answersOpen, setAnswersOpen] = useState(false);
    const [answerText, setAnswerText] = useState("");
    const answerImageFile = useFile(null);

    const postAnswerMut = useMutation({
        mutationFn: ({ answer }: { answer: Comment, file?: Blob }) =>
            CommentAPI.answerToComment(answer, comment.id),
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
            setAnswerText("");
        },
    });

    const handleAnswerPostClick = () => {
        postAnswerMut.mutate({
            answer: {
                id: 0,
                text: answerText,
                poster: user,
                createdAt: Date.now(),
            },
            file: answerImageFile.file ? answerImageFile.file : undefined
        });
    };

    const editCommentMut = useMutation({
        mutationFn: () =>
            CommentAPI.updateComment({
                id: comment.id,
                text: commentText,
                poster: user,
                createdAt: Date.now(),
            }),
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

    const handleEditClick = () => {
        editCommentMut.mutate();
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
                    <div className="comment-edit">
                        <ReactTextareaAutosize
                            className="comment-edit-text"
                            defaultValue={comment.text}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <div className="editCommentButtonOptions">
                            <Button
                                className="editCommentButton"
                                onPress={() => setEditClicked(false)}>
                                {t("cancel")}
                            </Button>
                            <Button className="editCommentButton" onPress={handleEditClick}>
                                {t("submit")}
                            </Button>
                        </div>
                    </div>
                )}
                {!editClicked &&
                    comment.text.split("\n").map((line) => {
                        return line != "" ? (
                            <div className="comment-line">{line}</div>
                        ) : (
                            <br />
                        );
                    })}
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
                <div className="comment-answer-post">
                    <ReactTextareaAutosize
                        className="comment-answer-text"
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                    />
                    <div className="comment-answer-image">
                        {answerImageFile.isDone && answerImageFile.data && <><img src={answerImageFile.data} />
                            <CrossButton className="comment-answer-image-remove" onPress={() => answerImageFile.setFile(null)} /></>}
                        {!answerImageFile.isDone && !answerImageFile.isLoading &&
                            <FileTrigger onSelect={(e) => {
                                let image: null | File = null;
                                if (e) {
                                    const item = e.item(0);
                                    if (item)
                                        image = item;
                                }
                                answerImageFile.setFile(image);
                            }} acceptedFileTypes={["image/png", "image/jpeg", "image/gif"]}>
                                <ImageSelectButton />
                            </FileTrigger>
                        }
                    </div>
                    <Button
                        className="comment-answer-button-cancel"
                        onPress={() => {
                            setNewAnswerOpen(false);
                            setAnswerText("");
                            answerImageFile.setFile(null);
                        }}>
                        {t("cancel")}
                    </Button>
                    <Button
                        className="comment-answer-button-submit"
                        onPress={handleAnswerPostClick}>
                        {t("answer")}
                    </Button>
                </div>
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
