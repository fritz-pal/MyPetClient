import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import { AuthContext, AuthState } from "../context/AuthContext";
import { stat } from "fs";
import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../models/Auth";
import { APIClient } from "../constants";

const LoginPage = () => {
    const [t,] = useTranslation("Login");
    const {validateSession, state} = useContext(AuthContext);
    const [errorText, setErrorText] = useState(state == AuthState.Failed ? "authFailed" : "");

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useMutation({
        mutationFn: () => AuthAPI.login({username: name, password: password}),
        onSuccess: (data) => {
            if (data.success)
                validateSession();
            else
                setErrorText(data.errorMessage ? data.errorMessage : "");
        },
    })

    useEffect(() => {
        if (state == AuthState.Failed)
            setErrorText("authFailed")
    }, [state])

    return (
        <div className="login-page">
            <h2>{t("title")}</h2>
            <div className="login-form">
                <div className="login-input-label-set">
                    {t("name")}
                    <input type="text" value={name} onChange={(e) => setName(e.target.value.trim())}></input>
                    {errorText == "UserNotFound" ? <div className="login-error-message">{t("noUser")}</div> : <></>}
                </div>
                <div className="login-input-label-set">
                    {t("password")}
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value.trim())}></input>
                    {errorText == "InvalidPassword" ? <div className="login-error-message">{t("wrongPassword")}</div> : <></>}
                </div>
                <button onClick={() => loginMutation.mutate()}>
                    {t("submit")}
                </button>
                {errorText == "authFailed" ? <div className="login-failed-label">{t("authFailed")}</div> : <></>}
            </div>
        </div>
    )
}

export default LoginPage