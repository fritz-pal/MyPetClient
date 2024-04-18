import { createContext } from "react";

export enum AuthState {
    Open,
    Pending,
    Failed,
    Success
}

interface AuthContextProps {
    setSession: (token: string) => void,
    state: AuthState
}

export const AuthContext = createContext<AuthContextProps> ({
    setSession: () => {},
    state: AuthState.Pending
})