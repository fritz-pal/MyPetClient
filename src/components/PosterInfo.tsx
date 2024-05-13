import { User } from "../models/User";
import noIcon from '/no-profile-picture-icon.webp';
import "./css/PosterInfo.css"
import { timeSince } from "../util/time";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "react-aria-components";

const PosterInfo = ({poster, postedAt}: {poster: User, postedAt?: number}) => {
    const [t,] = useTranslation("time")
    const navigate = useNavigate();
    const openUser = () => {
        navigate("/user/" + poster.id);
    }

    return (
        <Button className="poster-info" onPress={openUser}>
            <img className="poster-info-image" src={noIcon} />
            { poster.username }
            { postedAt ? <> • { timeSince(postedAt, t) }</> : <></> }
        </Button>
    );
}

export default PosterInfo