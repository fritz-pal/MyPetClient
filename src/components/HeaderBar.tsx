import { useLocation, useNavigate } from 'react-router';
import './css/HeaderBar.css';
import { Link } from 'react-router-dom';
import NavbarContext from '../context/MenuContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

const HeaderBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [t, _] = useTranslation("paths");

    const handleSettingsClick = () => {
        navigate('/settings');
    }

    return (
        <div className="app-header">
            <BurgerMenu />
            <div className="site-title">
                <h2>
                    {t(location.pathname === "/" ? "home" : location.pathname.replace("/", ""))}
                </h2>
            </div>
            <div className="menu-items">
                <MenuItem path="/" label="Home" />
                <MenuItem path="/forum" label="Forum" />
                <MenuItem path="/reminders" label="Reminders" />
                <MenuItem path="/thread/9" label="Test" />
                <MenuItem path="/admin" label="Admin" />
            </div>
            <div className="user-settings">
                <svg onClick={handleSettingsClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                </svg>
            </div>

            <div className="user-menu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>
        </div>
    )
}

function MenuItem({ path, label }: { path: string, label: string }) {
    return (
        <div className="menu-item">
            <Link to={path}>{label}</Link>
        </div>
    )
}

function BurgerMenu() {
    const { isOpen, setIsOpen } = useContext(NavbarContext);

    return (
        <div className="menu-icon" onClick={() => {
            setIsOpen(!isOpen);
        }}>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
        </div>
    )
}

export default HeaderBar;