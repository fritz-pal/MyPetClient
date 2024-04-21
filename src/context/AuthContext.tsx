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
    logout: () => void,
    state: AuthState
}

export const AuthContext = createContext<AuthContextProps> ({
    validateSession: () => {},
    validateSessionSilent: () => {},
    logout: () => {},
    state: AuthState.Pending
})