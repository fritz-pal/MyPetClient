import { useTranslation } from 'react-i18next';
import PetList from './PetList';
import './css/Homepage.css';

const Homepage = () => {
    const [t, _] = useTranslation("home");

    return (
        <div className='home'>
            <div className="greeting">
                <h3 className="home_greeting">{t("greeting")}</h3>
                <h3 className="home_title">MyPet</h3>
            </div>
            <div className="full-width-image"></div>
            <div className='petlist-container'>
                <PetList />
            </div>
        </div>
    );
};

export default Homepage;