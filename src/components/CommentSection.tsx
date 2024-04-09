import { useTranslation } from "react-i18next";
import CommentElement from "./CommentElement";
import { Comment } from "../models/Comment";

const CommentSection = ({comments} : {comments: Comment[]}) => {
    const [t,] = useTranslation("commentSection");
    console.log(comments);
    return (
        <div className="comment-section">
            {comments.length == 0 ? t("noPost") : <></>}
            {comments.map((element) => 
                <CommentElement comment={element} key={element.id}></CommentElement>
            )}
        </div>
    )
}

export default CommentSection