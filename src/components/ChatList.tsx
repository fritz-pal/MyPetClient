import { useQuery } from "@tanstack/react-query"
import { ChatAPI, getOtherUserInChat } from "../models/Chat"
import "./css/ChatList.css"
import { useContext, useState } from "react"
import ChatListElement from "./ChatListElement"
import { UserContext } from "../context/UserContext"
import { useTranslation } from "react-i18next"

const ChatList = () => {
    const {user} = useContext(UserContext);
    const [t] = useTranslation("chat");

    const [search, setSearch] = useState("");

    const chatQuery = useQuery({
        queryFn: () => ChatAPI.getAllChats(),
        queryKey: ["chats"]
    });

    return (
        <div className="chat-list-page">
            <div className="chat-list-header">
                <input type="text" placeholder={t("search")} value={search} onChange={(e) => setSearch(e.target.value)}></input>
            </div>
            <div className="chat-list-main">
                {chatQuery.isSuccess && chatQuery.data.filter((chat) => {
                    if (chat.direct)
                        return getOtherUserInChat(chat, user).username.indexOf(search) >= 0;
                    return chat.name && (chat.name?.indexOf(search) >= 0);
                }).sort((a, b) => {
                    if (!a.lastMessage && !b.lastMessage) {
                        return 0;
                    }
                    if (!a.lastMessage) {
                        return 1;
                    }
                    else if (!b.lastMessage) {
                        return -1;
                    }
                    return b.lastMessage.createdAt - a.lastMessage.createdAt;
                }).map(chat => <ChatListElement chat={chat} key={chat.id}></ChatListElement>)}
            </div>
        </div>
    )
}

export default ChatList