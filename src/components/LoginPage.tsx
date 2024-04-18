import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import { stat } from "fs";

const LoginPage = () => {
    const [t,] = useTranslation("Login");
    const {setSession, state} = useContext(AuthContext);
    state;

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");


    return (
        <div className="login-page">
            <h2>{t("title")}</h2>
            <div className="login-form">
                <div className="login-input-label-set">
                    {t("name")}
                    <input type="text"></input>
                </div>
                <div className="login-input-label-set">
                    {t("password")}
                    <input type="password"></input>
                </div>
                <button>
                    {t("submit")}
                </button>
            </div>
        </div>
    )
}

export default LoginPage