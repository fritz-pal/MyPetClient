import { User } from "../models/User";
import noIcon from '/no-profile-picture-icon.webp';
import "./css/PoserInfo.css"

const PosterInfo = ({user}: {user: User}) => {
    return (
        <div className="poster-info">
            <img className="poster-info-image" src={noIcon} />
            {user.username}
        </div>
    );
}

export default PosterInfo