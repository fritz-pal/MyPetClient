import { useTranslation } from 'react-i18next';
import './css/ForumPage.css';

const Homepage = () => {
    const [t, _] = useTranslation("forum");

    return (
        <div className='forum-page'>
            <div className='forum-header'>
                <input className='search-input' type="search" placeholder={t("search")} />
                <svg className='search-button' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
        </div>
    );
};

export default Homepage;