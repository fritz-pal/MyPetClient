import { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router"
import LoginPage from "./LoginPage";
import ErrorPage from "./ErrorPage";
import { useCookies } from "react-cookie";
import { AuthContext, AuthState } from "../context/AuthContext";
import Loader from "./Loader";
import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../models/Auth";

const AuthProvider = ({children} : {children: JSX.Element}) => {
    const nav = useNavigate();
    const [cookies] = useCookies(["Authorization"]);
    const [state, setState] = useState(cookies.Authorization ? AuthState.Pending : AuthState.Open);
    const [isInitialAttempt, setIsInitialAttempt] = useState(state == AuthState.Pending);

    const validationQuery = useMutation({
        mutationFn: () => AuthAPI.validate(),
        onSuccess: (data) => {
            let skipNav = false;
            if (state == AuthState.Success) {
                skipNav = true;
            }
            setState(data == true ? AuthState.Success : isInitialAttempt ? AuthState.Open : AuthState.Failed);
            setIsInitialAttempt(false);
            if (!skipNav)
                nav("/");
        }
    });

    const validateSession = () => {
        setState(AuthState.Pending);
        validationQuery.mutate();
    }

    const validateSessionSilent = () => {
        validationQuery.mutate();
    }

    useEffect(() => {
        if (isInitialAttempt)
            validationQuery.mutate();
    }, []);

    return (
        <AuthContext.Provider value={{
            validateSession: validateSession,
            validateSessionSilent: validateSessionSilent,
            state: state
        }}>
            <LoginSwitch>
                {children}
            </LoginSwitch>
        </AuthContext.Provider>
    );
}

const LoginSwitch = ({children} : {children: JSX.Element}) => {
    const {state} = useContext(AuthContext);
    switch (state) {
        case AuthState.Pending:
            return <Loader/>;
        case AuthState.Open:
        case AuthState.Failed:
            return <NoAuth/>;
    }
    return children;
}

const NoAuth = () => {
    return (
        <div className="no-auth">
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<ErrorPage/>}/>
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