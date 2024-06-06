import { createContext, useEffect, useState } from "react";
import { StompClient, WSClient } from "../constants";
import { CompatClient } from "@stomp/stompjs";
import Loader from "./Loader";

export interface WebsocketContext {
    wsClient: WebSocket,
    stompClient: CompatClient
}

export const WebsocketContext = createContext<WebsocketContext>({
    wsClient: WSClient,
    stompClient: StompClient
})

export interface WebsocketClientProps {
    children: JSX.Element
}

const WebsocketClient = ({children}: WebsocketClientProps) => {
    const [wsClient] = useState(WSClient);
    const [stompClient] = useState(StompClient);
    const [connected, setConnected] = useState(false);
    const [isError, setIsError] = useState(false);

    const onConnect = () => {
        console.log("StompClient connected.");
        setConnected(true);
    }

    const onError = () => {
        console.error("Error while connecting with StompClient!");
        setIsError(true);
    }

    useEffect(() => {
        stompClient.connect({}, onConnect, onError);
        return () => {
            if (stompClient.connected) {
                stompClient.disconnect(() => {
                    console.log("Stomp disconnected");
                });
            }
        };
    }, []);

    if (isError) {
        return <>StompClient failed to connect</>
    }

    if (!connected) {
        return <Loader></Loader>
    }

    return (
        <WebsocketContext.Provider value={{wsClient: wsClient, stompClient: stompClient}}>
            {children}
        </WebsocketContext.Provider>
    );
}

export default WebsocketClient