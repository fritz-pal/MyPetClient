import { useContext, useEffect, useRef } from "react"
import { WebsocketContext } from "../components/WebsocketClient"
import { StompSubscription } from "@stomp/stompjs";

const useStomp = <T,>(topic: string, callback: (message: T) => void) => {
    const wsContext = useContext(WebsocketContext);
    const stompSubscription = useRef<StompSubscription | null>(null);
    
    useEffect(() => {
        stompSubscription.current = wsContext.stompClient.subscribe(topic, (message) => { callback(message.body as T)  });
        return () => {
            stompSubscription.current?.unsubscribe();
        };
    }, []);

    const sendData = (data: string) => {
        wsContext.stompClient.send(topic, {}, data);
    }   

    return [sendData];
}

export default useStomp