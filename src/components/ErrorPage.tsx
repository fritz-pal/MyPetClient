import { useLocation } from "react-router"
import "./css/ErrorPage.css"
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
    const location = useLocation();
    const [t, _] = useTranslation('error')
    return (
        <div className="error-page">{t("errorMessage", {path: location.pathname})}</div>
    )
}

export default ErrorPage