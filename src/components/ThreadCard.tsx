import { useTranslation } from "react-i18next";
import { Thread } from "../models/Forum";
import './css/ForumPage.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const ThreadCard = ({ thread }: { thread: Thread }) => {
    const [t,] = useTranslation("species");
    const navigate = useNavigate();
    const [k,] = useTranslation("forum");
    const { user } = useContext(UserContext);

    const handleClick = () => {
        navigate("/thread/" + thread.id);
    }

    const byMe = thread.creator?.id === user.id;
    return (
        <div onClick={handleClick} className={`thread-card ${byMe ? "own" : ""}`}>
            {byMe &&
                <svg className="creator-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
            }
            <div className="thread-info">
                <div className={`thread-timestamp ${byMe ? "own" : ""}`}>{timeSince(thread.createdAt)}</div>
                <div className="thread-species">{t(thread.species.name)}</div>
            </div>
            <div className="thread-title">
                <div className="thread-name">{thread.name}</div>
                <div className="thread-description">{thread.description}</div>
            </div>
            <div className="thread-creator">{k("by")} {byMe ? k("you") : thread.creator?.username}</div>
        </div>
    )
};

function timeSince(seconds: number): string {
    const now = new Date();
    const secondsSince = Math.floor((now.getTime() - seconds * 1000) / 1000);
    const [t,] = useTranslation("time");

    const interval = Math.floor(secondsSince / 31536000);
    if (interval > 1) {
        return t("years", { number: interval });
    } else if (interval === 1) {
        return t("year", { number: interval });
    }

    const interval2 = Math.floor(secondsSince / 2592000);
    if (interval2 > 1) {
        return t("months", { number: interval2 });
    } else if (interval2 === 1) {
        return t("month", { number: interval2 });
    }

    const interval3 = Math.floor(secondsSince / 86400);
    if (interval3 > 1) {
        return t("days", { number: interval3 });
    } else if (interval3 === 1) {
        return t("day", { number: interval3 });
    }

    const interval4 = Math.floor(secondsSince / 3600);
    if (interval4 > 1) {
        return t("hours", { number: interval4 });
    } else if (interval4 === 1) {
        return t("hour", { number: interval4 });
    }

    const interval5 = Math.floor(secondsSince / 60);
    if (interval5 > 1) {
        return t("minutes", { number: interval5 });
    } else if (interval5 === 1) {
        return t("minute", { number: interval5 });
    }

    return t("justNow");
}

export default ThreadCard;