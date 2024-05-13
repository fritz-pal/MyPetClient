import { Button, FileTrigger } from "react-aria-components";
import TextareaAutosize from "react-textarea-autosize";
import ImageSelectButton from "./ImageSelectButton";
import { useContext, useState } from "react";
import useFile from "../hooks/useFile";
import { Comment } from "../models/Comment";
import { UserContext } from "../context/UserContext";
import SmallLoader from "./SmallLoader";
import "./css/CommentInput.css"
import SubmitButton from "./SubmitButton";
import CrossButton from "./CrossButton";

const CommentInput = ({onSubmit, isDisabled, isLoading, initialComment}: {onSubmit?: (comment: Comment, file?: File) => any, isDisabled?: boolean, isLoading?: boolean, initialComment?: Comment}) => {
    if (isDisabled == undefined)
        isDisabled = false;
    if (isLoading == undefined)
        isLoading = false;

    const {user} = useContext(UserContext);
    const [text, setText] = useState(initialComment ? initialComment.text : "");
    const file = useFile(null);

    const isValid = (): boolean => {
        return text.trim() != ""
    }

    const handleButtonClick = () => {
        const comment: Comment = 
            initialComment ? {
                id: initialComment.id,
                text: text.trim(),
                poster: initialComment.poster,
                createdAt: initialComment.createdAt,
                imageSource: file ? undefined : initialComment.imageSource,
                threadID: initialComment.threadID,
            } : {
                id: 0,
                text: text.trim(),
                poster: user,
                createdAt: Date.now(),
                threadID: 0,
            }
            if (onSubmit)
                onSubmit(comment, file.file ? file.file : undefined);
            setText("");
            file.setFile(null);
    }

    return (
        <div className="comment-input">
            <TextareaAutosize className="comment-input-text" value={text} onChange={(e) => setText(e.target.value)}/>
            <FileTrigger onSelect={(e) => {
                    let image: null | File = null;
                    if (e) {
                        const item = e.item(0);
                        if (item)
                            image = item;
                    }
                    file.setFile(image);
                }} acceptedFileTypes={["image/png", "image/jpeg", "image/gif"]}>
                <ImageSelectButton className="comment-input-image-button"/>
            </FileTrigger>
            {!isLoading && <SubmitButton className="comment-input-submit" isDisabled={!isValid() || isDisabled } onPress={handleButtonClick}/>}
            {isLoading && <Button className="comment-input-submit" isDisabled><SmallLoader/></Button>}
            {
                file.data ? 
                <div className="comment-input-image">
                    <img src={file.data}/>  
                    <CrossButton className="comment-input-cross" onPress={() => file.setFile(null)}/>
                </div>
                : initialComment?.imageSource ?
                <div className="comment-input-image">
                    <img src={initialComment.imageSource}/>
                    <CrossButton className="comment-input-cross" onPress={() => file.setFile(null)}/>
                </div>
                : <></> 
            }
        </div>
    );
}

export default CommentInput