import { Button, FileTrigger, PressEvent } from "react-aria-components";
import TextareaAutosize from "react-textarea-autosize";
import ImageSelectButton from "./buttons/ImageSelectButton";
import { useContext, useState } from "react";
import useFile from "../hooks/useFile";
import { UserContext } from "../context/UserContext";
import SmallLoader from "./SmallLoader";
import "./css/ChatInput.css"
import SubmitButton from "./buttons/SubmitButton";
import CrossButton from "./buttons/CrossButton";
import CancelButton from "./buttons/CancelButton";
import { ChatMessage } from "../models/Chat";
import { User } from "../models/User";

interface ChatInputProps {
    onSubmit?: (message: ChatMessage, file?: File) => any, 
    isDisabled?: boolean, 
    isLoading?: boolean, 
}

const ChatInput = ({onSubmit, isDisabled, isLoading}: ChatInputProps) => {
    if (isDisabled == undefined)
        isDisabled = false;
    if (isLoading == undefined)
        isLoading = false;

    const {user} = useContext(UserContext);
    const [text, setText] = useState("");
    const file = useFile(null);

    const isValid = (): boolean => {
        return text.trim() != "" || file.file != null;
    }

    const handleSubmitClicked = (e: PressEvent) => {
        
        const message: ChatMessage = {
            id: 0,
            text: text.trim(),
            from: user,
            chatRoomId: 0,
            createdAt: Date.now(),
        };
        if (onSubmit)
            onSubmit(message, file.file ? file.file : undefined);
        setText("");
        file.setFile(null);
    }

    const handleRemoveImageClicked = () => {
        file.setFile(null);
    }

    return (
        <div className={"chat-input"}>
            <TextareaAutosize className="chat-input-text" value={text} onChange={(e) => setText(e.target.value)}/>
            <FileTrigger onSelect={(e) => {
                    let image: null | File = null;
                    if (e) {
                        const item = e.item(0);
                        if (item)
                            image = item;
                    }
                    file.setFile(image);
                }} acceptedFileTypes={["image/png", "image/jpeg", "image/gif"]}>
                {/*<ImageSelectButton className="chat-input-image-button"/>*/}
            </FileTrigger>
            {!isLoading && <SubmitButton className="chat-input-submit" isDisabled={!isValid() || isDisabled } onPress={handleSubmitClicked}/>}
            {isLoading && <Button className="chat-input-submit" isDisabled><SmallLoader/></Button>}
            {
                file.data && 
                <div className="chat-input-image">
                    <img src={file.data}/>  
                    <CrossButton className="chat-input-cross" onPress={handleRemoveImageClicked}/>
                </div>
            }
        </div>
    );
}

export default ChatInput