import { useLocation } from "react-router"
import "./css/ErrorPage.css"

const ErrorPage = () => {
    const location = useLocation();
    return (
        <div className="error-page">{location.pathname}</div>
    )
}

export default ErrorPage