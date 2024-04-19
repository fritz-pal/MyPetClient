import { createContext } from "react";

export enum AuthState {
    Success,
    Open,
    Pending,
    Failed
}

interface AuthContextProps {
    validateSession: () => void,
    validateSessionSilent: () => void,
    state: AuthState
}

export const AuthContext = createContext<AuthContextProps> ({
    validateSession: () => {},
    validateSessionSilent: () => {},
    state: AuthState.Pending
})