import { UserAPI } from "../models/User"
import "./css/PrivateChat.css"
import ChatInput from "./ChatInput"
import RoundImage from "./RoundImage"
import noIcon from '/no-profile-picture-icon.webp';
import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChatAPI, ChatMessage, getOtherUserInChat } from "../models/Chat";
import { UserContext } from "../context/UserContext";
import Loader from "./Loader";
import ChatBubble from "./ChatBubble";
import { Button } from "react-aria-components";
import SmallLoader from "./SmallLoader";
import useStomp from "../hooks/useStomp";
import { useTranslation } from "react-i18next";

const PrivateChat = () => {
    const queryClient = useQueryClient();
    const { chatId, userId } = useParams();
    const { user } = useContext(UserContext);
    const nav = useNavigate();

    const [id, setId] = useState(chatId ? parseInt(chatId) : 0);

    if (isNaN(Number(chatId)) && isNaN(Number(userId))) {
        return <ErrorPage></ErrorPage>
    }

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [offset, setOffset] = useState(0);

    useStomp("/messages/" + id, (message) => {
        setMessages((prevMessages) => [JSON.parse(message), ...prevMessages]);
        setOffset((prevOffset) => prevOffset + 1);
    })

    const chatQuery = useQuery({
        queryFn: () => ChatAPI.getChat(id),
        queryKey: ["chat", id],
        enabled: Boolean(id)
    });

    const chatFromUserQuery = useMutation({
        mutationFn: (id: number) => ChatAPI.getChatWithUser(id),
        onSuccess: (data) => {
            if (data) {
                nav("/chat/" + data.id)
                setId(data.id);
            }
        }
    });

    useEffect(() => {
        if (!id) {
            chatFromUserQuery.mutate(Number(userId));
        }
    }, []);

    const userQuery = useQuery({
        queryFn: () => {
            if (id) {
                if (chatQuery.data == undefined)
                    throw new Error("ChatID provided but fetch attempt was made while no chat meta data was provided.");
                const otherUser = getOtherUserInChat(chatQuery.data, user);
                return UserAPI.getUserById(String(otherUser.id));
            }
            return UserAPI.getUserById(userId ? userId : "");
        },
        queryKey: ["user", id ? 0 : Number(userId)],
        enabled: chatQuery.isSuccess || !Boolean(id)
    });

    const postChatMut = useMutation({
        mutationFn: ({ message, file }: { message: ChatMessage, file?: File }) => {
            if (id)
                return ChatAPI.sendChatMessage(id, message, file);
            return ChatAPI.startNewChat(Number(userId), message, file);
        },
        onSuccess: (data) => {
            if (!id) {
                nav("/chat/" + data.chatRoomId);
                setId(data.chatRoomId);
            }
            queryClient.invalidateQueries({
                queryKey: ["chats"]
            });
        }
    });

    const handleSubmit = (message: ChatMessage, file?: File) => {
        postChatMut.mutate({ message, file });
    }

    return (
        <div className="private-chat-page">
            <div className="private-chat-header">
                <RoundImage className="private-chat-profile-picture" placeholder={noIcon}></RoundImage>
                <div className="private-chat-name">{userQuery.isSuccess ? userQuery.data.username : <SmallLoader />}</div>
            </div>
            <div className="private-chat-main">
                {chatQuery.isLoading && <Loader></Loader>}
                {chatQuery.isError && <>Error</>}
                {messages.map((message) => <ChatBubble key={message.id} message={message} />)}
                {chatQuery.isSuccess && id && <MessagePage chatroomId={id} page={1} offset={offset}></MessagePage>}
            </div>
            <ChatInput
                isDisabled={Boolean(id) && !chatQuery.isSuccess}
                isLoading={postChatMut.isPending}
                onSubmit={handleSubmit} />
        </div>
    )
}

const MessagePage = ({ chatroomId, page, offset }: { chatroomId: number, page: number, offset: number }) => {
    const [t] = useTranslation("chat");
    
    const [nextPageOpen, setNextPageOpen] = useState(false);

    const pageQuery = useQuery({
        queryFn: () => ChatAPI.getChatMessages(chatroomId, page, offset),
        queryKey: ["chat", "messages", page],
    })

    return (
        <>
            {pageQuery.isLoading && <Loader></Loader>}
            {pageQuery.isError && <>Error</>}
            {pageQuery.isSuccess &&
                <>
                    {
                        pageQuery.data.elements.map(message =>
                            <ChatBubble key={message.id} message={message}></ChatBubble>
                        )
                    }
                    {
                        pageQuery.data.maxPage > page && !nextPageOpen && 
                            <Button className={"private-chat-more-button"} onPress={() => setNextPageOpen(true)}>
                                {t("more")}
                            </Button>
                    }
                    {nextPageOpen && <MessagePage chatroomId={chatroomId} page={page + 1} offset={offset}></MessagePage>}
                </>
            }
        </>
    )
}

export default PrivateChat