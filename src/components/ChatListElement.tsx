import { ChatRoom, getOtherUserInChat } from "../models/Chat";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import "./css/ChatListElement.css"
import { usePress } from "react-aria";
import { useNavigate } from "react-router";
import useStomp from "../hooks/useStomp";

const ChatListElement = ({chat} : {chat: ChatRoom}) => {
    const {user} = useContext(UserContext);
    const nav = useNavigate();
    const [lastMessage, setLastMessage] = useState(chat.lastMessage ? chat.lastMessage : null);

    useStomp("/messages/" + chat.id, (message) => setLastMessage(JSON.parse(message)))

    const [otherUser] = useState(getOtherUserInChat(chat, user));

    let {pressProps} = usePress({
        onPress: () => {
            nav("/chat/" + chat.id);
        }
    })
    
    return (
        <div {...pressProps} className="chat-list-element">
            <div className="chat-list-element-title">{otherUser.username}</div>
            <div className="chat-list-element-message-preview">{lastMessage?.text}</div>
            {lastMessage && (() => {
                const date = new Date(lastMessage.createdAt);
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