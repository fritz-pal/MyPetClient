import { useTranslation } from 'react-i18next';
import './css/ForumPage.css';

const Homepage = () => {
    const [t, _] = useTranslation("forum");

    return (
        <div className='forum-page'>
            <input type="search" placeholder={t("search")} />
        </div>
    );
};

export default Homepage;