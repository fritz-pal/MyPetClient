import { useContext, useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router"
import LoginPage from "./LoginPage";
import { AuthContext, AuthState } from "../context/AuthContext";
import Loader from "./Loader";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../models/Auth";
import SignUp from "./Signup";

const AuthProvider = ({children} : {children: JSX.Element}) => {
    const nav = useNavigate();
    const [state, setState] = useState(AuthState.Pending);
    const [isInitialAttempt, setIsInitialAttempt] = useState(state == AuthState.Pending);

    const validationMut = useMutation({
        mutationFn: () => AuthAPI.validate(),
        onSuccess: (data) => {
            let skipNav = false;
            if (isInitialAttempt) {
                skipNav = true;
            }
            setState(data == true ? AuthState.Success : isInitialAttempt ? AuthState.Open : AuthState.Failed);
            setIsInitialAttempt(false);
            if (!skipNav)
                nav("/");
        }
    });

    const logoutMut = useMutation({
        mutationFn: () => AuthAPI.logout(),
        onSuccess: () => {
            setState(AuthState.Open);
        }
    })

    const validateSession = () => {
        setState(AuthState.Pending);
        validationMut.mutate();
    }

    const validateSessionSilent = () => {
        validationMut.mutate();
    }

    const logout = () => {
        logoutMut.mutate();
    }

    useEffect(() => {
        if (isInitialAttempt)
            validationMut.mutate();
    }, []);

    return (
        <AuthContext.Provider value={{
            validateSession: validateSession,
            validateSessionSilent: validateSessionSilent,
            logout: logout,
            state: state
        }}>
            <LoginSwitch>
                {children}
            </LoginSwitch>
        </AuthContext.Provider>
    );
}

const LoginSwitch = ({children} : {children: JSX.Element}) => {
    const {state, validateSessionSilent} = useContext(AuthContext);

    const {current: queryClientWithAuthCheck} = useRef(new QueryClient({
        defaultOptions: {
            mutations: {
                onError: validateSessionSilent
            }
        }
    }));

    switch (state) {
        case AuthState.Pending:
            return <Loader/>;
        case AuthState.Open:
        case AuthState.Failed:
            return <NoAuth/>;
    }
    return (
        <QueryClientProvider client={queryClientWithAuthCheck}>
            {children}
        </QueryClientProvider>
    );
}

const NoAuth = () => {
    return (
        <div className="no-auth">
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/*" element={<LoginRerouter/>}/>
            </Routes>
        </div>
    )
}

const LoginRerouter = () => {
    const nav = useNavigate();
    
    useEffect(() => nav("/login"), []);

    return <></>
}

export default AuthProvider