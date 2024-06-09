import { User } from "../models/User"
import "./css/PrivateChat.css"
import ChatInput from "./ChatInput"
import RoundImage from "./RoundImage"
import noIcon from '/no-profile-picture-icon.webp';
import useStomp from "../hooks/useStomp";

const otherUserExample: User = {id: 999999, username: "OtherUser"}

const PrivateChat = () => {
    useStomp("/Ich/Exestiere/Nicht", () => {});

    return (
        <div className="private-chat-page">
            <div className="private-chat-header">
                <RoundImage className="private-chat-profile-picture" placeholder={noIcon}></RoundImage>
                <div className="private-chat-name">{otherUserExample.username}</div>
            </div>
            <div className="private-chat-main">
                {/*Chat Messages*/}
            </div>
            <ChatInput otherUser={otherUserExample}></ChatInput>
        </div>
    )
}

export default PrivateChat