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
            {chat.lastMessage && (() => {
                const date = new Date(chat.lastMessage.createdAt);
                return (
                    <div className="chat-list-element-timestamp">
                        {`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
                    </div>
                );
            })()}
        </div>
    );
}

export default ChatListElement