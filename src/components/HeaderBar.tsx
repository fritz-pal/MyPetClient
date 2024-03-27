import { useLocation } from 'react-router';
import './css/HeaderBar.css';
import { Link } from 'react-router-dom';
import NavbarContext from './MenuContext';
import { useContext } from 'react';

const HeaderBar = () => {
    const location = useLocation();
    return (
        <div className="app-header">
            <BurgerMenu />
            <div className="site-title">
                <h2>
                    {(() => {
                        switch (location.pathname) {
                            case "/":
                                return "Home";
                            case "/login":
                                return "Login";
                            default:
                                return "Error";
                        }
                    })()}
                </h2>
            </div>
            <div className="menu-items">
                <MenuItem path="/" label="Home" />
                <MenuItem path="/forum" label="Forum" />
                <MenuItem path="/reminders" label="Reminders" />
                <MenuItem path="/marketplace" label="Marketplace" />
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

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="menu-icon" onClick={handleToggle}>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
        </div>
    )
}

export default HeaderBar;