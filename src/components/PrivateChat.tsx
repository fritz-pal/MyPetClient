import { useContext } from "react"
import { ChatMessage } from "../models/Chat"
import { UserContext } from "../context/UserContext"
import { User } from "../models/User"
import "./css/PrivateChat.css"
import ChatBubble from "./ChatBubble"
import ChatInput from "./ChatInput"
import RoundImage from "./RoundImage"
import noIcon from '/no-profile-picture-icon.webp';

const otherUserExample: User = {id: 999999, username: "OtherUser"}

const PrivateChat = () => {
    const {user} = useContext(UserContext);

    const exampleMessages: ChatMessage[] = [
        {id: 1, from: user, to: user, createdAt: 0, text: "Was zur Hölle soll das heißen"}, 
        {id: 2, from: otherUserExample, to: user, createdAt: 0, text: 
            "Das hier ist ein Super langer Text bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
        },{id: 3, from: otherUserExample, to: user, createdAt: 0, text: 
            "Das hier ist ein Super langer Text bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
        },{id: 4, from: otherUserExample, to: user, createdAt: 0, text: 
            "Das hier ist ein Super langer Text bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
        },{id: 5, from: otherUserExample, to: user, createdAt: 0, text: 
            "Das hier ist ein Super langer Text bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
        }
    ];
        
    return (
        <div className="private-chat-page">
            <div className="private-chat-header">
                <RoundImage className="private-chat-profile-picture" placeholder={noIcon}></RoundImage>
                <div className="private-chat-name">{otherUserExample.username}</div>
            </div>
            <div className="private-chat-main">
                {
                    exampleMessages.map(message => {
                        return <ChatBubble key={message.id} message={message}></ChatBubble>
                    })
                }
            </div>
            <ChatInput otherUser={otherUserExample}></ChatInput>
        </div>
    )
}

export default PrivateChat