import { Thread } from "../models/Forum";
import './css/ForumPage.css';

const ThreadCard = ({ thread }: { thread: Thread }) => (
    <div className="thread-card" >
        <div className="thread-info">
            <div className="thread-timestamp">{thread.createdAt}</div>
            <div className="thread-species">{thread.species.name}</div>
        </div>
        <div className="thread-creator">{thread.creator?.username}</div>
        <div className="thread-title">
            <div className="thread-name">{thread.name}</div>
            <div className="thread-description">{thread.description}</div>
        </div>
        <button className="view-thread-button">→</button>
    </div>
);
