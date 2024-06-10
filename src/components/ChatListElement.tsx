import { Button } from "react-aria-components";
import { ChatRoom, getOtherUserInChat } from "../models/Chat";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import "./css/ChatListElement.css"
import { usePress } from "react-aria";
import { useNavigate } from "react-router";

const ChatListElement = ({chat} : {chat: ChatRoom}) => {
    const {user} = useContext(UserContext);
    const nav = useNavigate();

    const [otherUser] = useState(getOtherUserInChat(chat, user));

    let {pressProps} = usePress({
        onPress: () => {
            nav("/chat/" + chat.id);
        }
    })
    
    return (
        <div {...pressProps} className="chat-list-element">
            <div className="chat-list-element-title">{otherUser.username}</div>
            <div className="chat-list-element-message-preview">{chat.lastMessage?.text}</div>
        </div>
    );
}

export default ChatListElement