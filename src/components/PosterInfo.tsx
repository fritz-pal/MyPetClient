import { User } from "../models/User";
import noIcon from '/no-profile-picture-icon.webp';
import "./css/PoserInfo.css"
import { timeSince } from "../util/time";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PosterInfo = ({poster, postedAt}: {poster: User, postedAt?: number}) => {
    const [t,] = useTranslation("time")
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/user/" + poster.id);
    }

    return (
        <div className="poster-info" onClick={handleClick}>
            <img className="poster-info-image" src={noIcon} />
            { poster.username }
            { postedAt ? <> • { timeSince(postedAt, t) }</> : <></> }
        </div>
    );
}

export default PosterInfo