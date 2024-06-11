import "./css/ChatBubble.css"

const Notification = () => {
    const titel = "Titel";
    const message = "Beschreibung des Reminders";
    return (
        <div className="notification">
            <h1>{titel}</h1>
            <p>{message}</p>
        </div>
    )
}

export default Notification