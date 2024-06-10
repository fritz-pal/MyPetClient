import { useContext, useEffect, useRef } from "react"
import { WebsocketContext } from "../components/WebsocketClient"
import { StompSubscription } from "@stomp/stompjs";

const useStomp = (topic: string, callback: (message: string) => void) => {
    const wsContext = useContext(WebsocketContext);
    const stompSubscription = useRef<StompSubscription | null>(null);
    
    useEffect(() => {
        stompSubscription.current = wsContext.stompClient.subscribe(topic, (message) => { callback(message.body)  });
        return () => {
            stompSubscription.current?.unsubscribe();
        };
    }, []);

    const sendData = (data: string) => {
        wsContext.stompClient.send(topic, {}, data);
    }   

    return sendData;
}

export default useStomp