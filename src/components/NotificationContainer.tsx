import { useContext, useEffect, useState } from "react";
import "./css/Notification.css"
import useStomp from "../hooks/useStomp";
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

interface Notification {
    type: string,
    message: string;
    sender?: string;
    chatId?: number;
}

const NotificationContainer = () => {
    const user = useContext(UserContext);
    const [t,] = useTranslation("notification");
    const navigate = useNavigate();
    useStomp("/user/" + user.user.id + "/queue/notifications", (message: string) => {
        const notif = JSON.parse(message) as Notification;
        let currentLocation = window.location.pathname;
        console.log("params: " + currentLocation)
        if (!(notif.type === "chat" && currentLocation === "/chat/" + notif.chatId)) {
            addNotification(notif);
        }
        console.log("Received notification: " + message);
    })
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (notification: Notification) => {
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    };

    const handleNotificationClick = (notification: Notification) => {
        if (notification.type === "reminder") {
            navigate("/reminders");
        } else if (notification.type === "chat") {
            navigate("/chat/" + notification.chatId);
        }
    };

    useEffect(() => {
        notifications.map((notification, _) => {
            return setTimeout(() => {
                setNotifications((prevNotifications) =>
                    prevNotifications.filter((notif, _) => notif !== notification)
                );
            }, 6000);
        });
    }, [notifications]);

    return (
        <>
            <div className="notification-container">
                {notifications.map((notification, index) => (
                    <div key={index} className="notification" onClick={() => handleNotificationClick(notification)}>
                        <svg className="notification-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        <svg onClick={
                            (event) => {
                                event.stopPropagation();
                                setNotifications((prevNotifications) =>
                                    prevNotifications.filter((notif, _) => notif !== notification)
                                );
                            }

                        } className="notification-close" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        <div className="notification-text">
                            <div className="notification-title">{notification.type === "reminder" ? t("reminder") : notification.sender}</div>
                            <div className="notification-message">{notification.message}</div>
                        </div>
                        <div className="notification-loading-bar"></div>
                    </div>
                ))}
            </div>
        </>
    );
};


export default NotificationContainer