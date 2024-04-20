import { KeyboardEventHandler, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { AuthContext, AuthState } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../models/Auth";
import "./css/LoginPage.css"
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [t,] = useTranslation("login");
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            loginMutation.mutate();
        }
    }

    return (
        <div className="login-page">
            <div className="login-form">
                <h2>{t("title")}</h2>
                <div className="login-input-label-set">
                    {t("name")}
                    <input type="text" value={name} onKeyDown={handleKeyDown} onChange={(e) => setName(e.target.value.trim())}></input>
                    {errorText == "UserNotFound" ? <div className="login-error-message">{t("noUser")}</div> : <></>}
                </div>
                <div className="login-input-label-set">
                    {t("password")}
                    <input type="password" value={password} onKeyDown={handleKeyDown} onChange={(e) => setPassword(e.target.value.trim())}></input>
                    {errorText == "InvalidPassword" ? <div className="login-error-message">{t("wrongPassword")}</div> : <></>}
                </div>
                <button onClick={() => loginMutation.mutate()}>
                    {t("submit")}
                </button>
                {errorText == "authFailed" ? <div className="login-error-message">{t("authFailed")}</div> : <></>}
                <div className="login-no-account-text">{t("noAccount")} <Link to={"/register"}>{t("here")}</Link></div>
            </div>
        </div>
    )
}

export default LoginPage