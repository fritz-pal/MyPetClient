import { useTranslation } from 'react-i18next';
import PetList from './PetList';
import './css/Homepage.css';

const Homepage = () => {
    const [t, _] = useTranslation("home");

    return (
        <div className='home'>
            <h1>{t("greeting")}</h1>
            <div className='petlist-container'>
                <PetList />
            </div>
        </div>
    );
};

export default Homepage;