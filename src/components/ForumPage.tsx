import { useTranslation } from 'react-i18next';
import './css/ForumPage.css';
import { Thread } from '../models/Forum';
import ThreadCard from './ThreadCard';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const [t, _] = useTranslation("forum");
    const navigate = useNavigate();
    const testThread: Thread = {
        id: 0,
        name: 'Dalmatiner',
        species: { id: 0, name: 'dog' },
        description: 'Ein Forum über Dalmatiner und deren Haltung. Hier können Fragen gestellt und Erfahrungen ausgetauscht werden.',
        createdAt: 1712386719,
        creator: { id: 0, username: 'Dennis', fullname: '', email: '' },
        commentCount: 0
    }

    const newThreadClicked = () => {
        navigate("/newthread");
    }

    return (
        <div className='forum-page'>
            <div className='forum-header'>
                <input className='search-input' type="search" placeholder={t("search")} />
                <svg className='search-button' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
            <div className='forum-threads'>
                <ThreadCard thread={testThread} />
                <ThreadCard thread={testThread} />
                <ThreadCard thread={testThread} />
                <ThreadCard thread={testThread} />
                <ThreadCard thread={testThread} />
                <ThreadCard thread={testThread} />
                <ThreadCard thread={testThread} />
                <ThreadCard thread={testThread} />
                <ThreadCard thread={testThread} />
            </div>

            <div className="new-thread-button-container">
                <svg onClick={newThreadClicked} className="new-thread-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" />
                </svg>
            </div>
        </div>
    );
};


export default Homepage;