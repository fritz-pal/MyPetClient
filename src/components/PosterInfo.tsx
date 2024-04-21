import { User } from "../models/User";
import noIcon from '/no-profile-picture-icon.webp';
import "./css/PosterInfo.css"
import { timeSince } from "../util/time";
import { useTranslation } from "react-i18next";

const PosterInfo = ({poster, postedAt}: {poster: User, postedAt?: number}) => {
    const [t,] = useTranslation("time")
    return (
        <div className="poster-info">
            <img className="poster-info-image" src={noIcon} />
            { poster.username }
            { postedAt ? <> • { timeSince(postedAt, t) }</> : <></> }
        </div>
    );
}

export default PosterInfo