import { Comment } from "../models/Comment";
import PosterInfo from "./PosterInfo";

const Comment = ({comment} : {comment: Comment}) => {
    return (
        <div className="comment">
            <div className="comment-head">
                <PosterInfo poster={comment.poster} postedAt={comment.createdAt}/>
                <div className="comment-body">
                    {comment.text}
                </div>
            </div>
        </div>
    )
}