import { useLocation } from "react-router"
import "./css/ErrorPage.css"
import { useTranslation } from "react-i18next";

/**
 * React Component that displays an ErrorMessage for a dead router path
 */
const ErrorPage = () => {
    const location = useLocation();
    const [t, _] = useTranslation('error')
    return (
        <div className="error-page">{t("errorMessage", {path: location.pathname})}</div>
    )
}

export default ErrorPage