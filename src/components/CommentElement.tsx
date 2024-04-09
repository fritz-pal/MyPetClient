import { Comment } from "../models/Comment";
import PosterInfo from "./PosterInfo";
import "./css/CommentElement.css"

const CommentElement = ({comment} : {comment: Comment}) => {
    return (
        <div className="comment">
            <PosterInfo poster={comment.poster} postedAt={comment.createdAt}/>
            <div className="comment-body">
                {comment.text.split("\n").map((line => {return line != "" ? <div className="comment-line">{line}</div> : <br/>}))}
            </div>
        </div>
    )
}

export default CommentElement