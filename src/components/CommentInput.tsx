import { Button, FileTrigger } from "react-aria-components";
import TextareaAutosize from "react-textarea-autosize";
import ImageSelectButton from "./buttons/ImageSelectButton";
import { useContext, useState } from "react";
import useFile from "../hooks/useFile";
import { Comment } from "../models/Comment";
import { UserContext } from "../context/UserContext";
import SmallLoader from "./SmallLoader";
import "./css/CommentInput.css"
import SubmitButton from "./buttons/SubmitButton";
import CrossButton from "./buttons/CrossButton";
import CancelButton from "./buttons/CancelButton";

interface CommentInputProps {
    onSubmit?: (comment: Comment, file?: File) => any, 
    onCancel?: () => any, 
    isDisabled?: boolean, 
    isLoading?: boolean, 
    initialComment?: Comment
    placeHolder?: string
}

const CommentInput = ({onSubmit, onCancel, isDisabled, isLoading, initialComment, placeHolder}: CommentInputProps) => {
    if (isDisabled == undefined)
        isDisabled = false;
    if (isLoading == undefined)
        isLoading = false;

    const {user} = useContext(UserContext);
    const [text, setText] = useState(initialComment ? initialComment.text : "");
    const [removedOldImage, setRemovedOldImage] = useState(false);
    const file = useFile(null);

    const isValid = (): boolean => {
        return text.trim() != "" || file.file != null;
    }

    const handleSubmitClicked = () => {
        const comment: Comment = 
            initialComment ? {
                id: initialComment.id,
                text: text.trim(),
                poster: initialComment.poster,
                createdAt: initialComment.createdAt,
                imageSource: removedOldImage ? undefined : file.file ? undefined : initialComment.imageSource,
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

    const handleRemoveImageClicked = () => {
        if (file.file != null) {
            file.setFile(null);
            return;
        }
        setRemovedOldImage(true);
    }

    const handleKeyDownInText = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key == 'Enter') {
            if (!e.shiftKey) {
                e.preventDefault();
                handleSubmitClicked();
            }
        }
    }

    return (
        <div className={"comment-input" + (onCancel ? " comment-input-with-cancel" : "")}>
            <TextareaAutosize className="comment-input-text" onKeyDown={handleKeyDownInText} placeholder={placeHolder} value={text} onChange={(e) => setText(e.target.value)}/>
            <FileTrigger onSelect={(e) => {
                    let image: null | File = null;
                    if (e) {
                        const item = e.item(0);
                        if (item)
                            image = item;
                    }
                    file.setFile(image);
                    setRemovedOldImage(false);
                }} acceptedFileTypes={["image/png", "image/jpeg", "image/gif"]}>
                <ImageSelectButton className="comment-input-image-button"/>
            </FileTrigger>
            {onCancel && <CancelButton className={"comment-input-cancel"} onPress={onCancel}/>}
            {!isLoading && <SubmitButton className="comment-input-submit" isDisabled={!isValid() || isDisabled } onPress={handleSubmitClicked}/>}
            {isLoading && <Button className="comment-input-submit" isDisabled><SmallLoader/></Button>}
            {
                file.data && !removedOldImage ? 
                <div className="comment-input-image">
                    <img src={file.data}/>  
                    <CrossButton className="comment-input-cross" onPress={handleRemoveImageClicked}/>
                </div>
                : initialComment?.imageSource && !removedOldImage ?
                <div className="comment-input-image">
                    <img src={initialComment.imageSource}/>
                    <CrossButton className="comment-input-cross" onPress={handleRemoveImageClicked}/>
                </div>
                : <></> 
            }
        </div>
    );
}

export default CommentInput