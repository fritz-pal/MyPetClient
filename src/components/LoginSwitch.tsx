import { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router"
import LoginPage from "./LoginPage";
import ErrorPage from "./ErrorPage";
import { useCookies } from "react-cookie";
import { AuthContext, AuthState } from "../context/AuthContext";
import Loader from "./Loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthAPI } from "../models/Auth";
import { stat } from "fs";

const AuthProvider = ({children} : {children: JSX.Element}) => {
    const queryClient = useQueryClient();

    const [cookies, setCookies] = useCookies(["Authorization"]);
    const [state, setState] = useState(cookies.Authorization ? AuthState.Pending : AuthState.Open);
    const [isFirstTry, setIsFirstTry] = useState(cookies.Authorization != undefined);

    const validationQuery = useQuery({
        queryFn: () => AuthAPI.validate(),
        queryKey: ["authValidate"],
        enabled: state == AuthState.Pending
    });

    const setSessionToken = (token: string) => {
        setCookies("Authorization", token);
        setState(AuthState.Pending);
        queryClient.invalidateQueries({queryKey: ["authValidate"]});
    }

    useEffect(() => {
        setState(validationQuery.data ? AuthState.Success : isFirstTry ? AuthState.Open : AuthState.Failed);
        setIsFirstTry(false);
    }, [validationQuery.data])

    return (
        <AuthContext.Provider value={{setSession: setSessionToken, state: state}}>
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
        case AuthState.Failed, AuthState.Open:
            return <NoAuth/>;
    }
    return children;
}

const NoAuth = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<ErrorPage/>}/>
            <Route element={<LoginRerouter/>}/>
        </Routes>
    )
}

const LoginRerouter = () => {
    const nav = useNavigate();
    
    useEffect(() => nav("/login"), []);

    return <></>
}