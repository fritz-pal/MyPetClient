import { useTranslation } from "react-i18next";
import { Thread } from "../models/Forum";
import './css/ForumPage.css';

const ThreadCard = ({ thread }: { thread: Thread }) => {
    const [t, _] = useTranslation("species");
    const [k, __] = useTranslation("forum");


    const handleClick = () => {
        console.log(`Thread ${thread.id} clicked`);
    }

    return (
        <div onClick={handleClick} className="thread-card" >
            <div className="thread-info">
                <div className="thread-timestamp">{timeSince(thread.createdAt)}</div>
                <div className="thread-species">{t(thread.species.name)}</div>
            </div>
            <div className="thread-creator">{k("by")} {thread.creator?.username}</div>
            <div className="thread-title">
                <div className="thread-name">{thread.name}</div>
                <div className="thread-description">{thread.description}</div>
            </div>
        </div>
    )
};

function timeSince(seconds: number): string {
    const now = new Date();
    const secondsSince = Math.floor((now.getTime() - seconds * 1000) / 1000);
    const [t, _] = useTranslation("time");

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