import { useContext } from "react"
import "./css/ChatBubble.css"
import { UserContext } from "../context/UserContext"
import { ChatMessage } from "../models/Chat";
import MultilineLabel from "./MultilineLabel";

const ChatBubble = ({ message }: { message: ChatMessage }) => {
    const { user } = useContext(UserContext);

    const getTimeString = () => {
        let timeString = "";
        const messageDate = new Date(message.createdAt * 1000);
        const currentDate = new Date();
        if (messageDate.getFullYear() != currentDate.getFullYear() ||
            messageDate.getMonth() != currentDate.getMonth() ||
            messageDate.getDay() != currentDate.getDay()) {
            timeString += messageDate.toLocaleDateString() + " ";
        }
        timeString += messageDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        return timeString;
    }

    return (
        <div className={"chat-bubble-" + (user.id == message.from.id ? "outgoing" : "incoming")}>
            { message.text && <MultilineLabel text={message.text}></MultilineLabel>}
            { message.imageSource && <img className="chat-bubble-image" src={message.imageSource}></img> }
            <div className="chat-bubble-timestamp">
                {getTimeString()}
            </div>
        </div>
    )
}

export default ChatBubble