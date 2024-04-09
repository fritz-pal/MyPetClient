import { useTranslation } from 'react-i18next';
import './css/ForumPage.css';
import ThreadCard from './ThreadCard';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ForumAPI } from '../models/Forum';
import Loader from './Loader';
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";


const ForumPage = () => {
    const [t,] = useTranslation("forum");
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [searched, setSearched] = useState(false);
    const { user } = useContext(UserContext);

    const query = useQuery({
        queryKey: ["threads", search],
        queryFn: () => ForumAPI.getAllThreadsforQuery(user.id, search)
    });

    const newThreadClicked = () => {
        navigate("/newthread");
    }

    return (
        <div className='forum-page'>
            <div className='forum-header'>
                <input value={search} onChange={(e) => {
                     setSearch(e.target.value);
                     setSearched(e.target.value !== "");
                }} maxLength={30} className='search-input' type="search" placeholder={t("search")} />
                <svg className='search-button' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
            {searched && query.isSuccess && <SearchResults count={query.data?.length || 0} query={search} />}
            {(query.isLoading || query.isError) && <div className='load'><Loader /></div>}
            {query.isSuccess &&
                <div className={`forum-threads ${searched ? "results" : ""}`}>
                    {query.data?.map(thread => <ThreadCard thread={thread} byUser={thread.creator?.id === user.id} />)}
                </div>
            }
            <div className="new-thread-button-container">
                <svg onClick={newThreadClicked} className="new-thread-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" />
                </svg>
            </div>
        </div>
    );
};

const SearchResults = ({ count, query }: { count: number, query: string }) => {
    const [t,] = useTranslation("forum");

    return (
        <div className="search-results">
            {count === 0 ? t("noSearchResults", { query }) : t("searchResults", { count, query })}
        </div>
    );
};


export default ForumPage;