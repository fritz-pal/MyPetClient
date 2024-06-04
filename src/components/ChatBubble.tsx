import { useContext } from "react"
import "./css/ChatBubble.css"
import { UserContext } from "../context/UserContext"
import { ChatMessage } from "../models/Chat";

const ChatBubble = ({message} : {message: ChatMessage}) => {
    const {user} = useContext(UserContext);
    return (
        <div className={"chat-bubble-" + (user.id == message.from.id ? "outgoing" : "incoming")}>
            {message.text && message.text}
        </div>
    )
}

export default ChatBubble