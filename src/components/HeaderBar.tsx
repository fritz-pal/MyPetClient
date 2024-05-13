import { useLocation, useNavigate } from 'react-router';
import './css/HeaderBar.css';
import { Link } from 'react-router-dom';
import NavbarContext from '../context/MenuContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Key, Menu, MenuItem, MenuTrigger, Popover } from 'react-aria-components';
import { AuthContext } from '../context/AuthContext';

const HeaderBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [t, _] = useTranslation("header");
    const auth = useContext(AuthContext);

    const handleSettingsClick = () => {
        navigate('/settings');
    }

    const menuClick = (id: Key) => {
        switch(id) {
            case "profile":
                navigate("/user/me");
                break;
            case "logout":
                auth.logout();
                return;
        }
    }

    return (
        <div className="header-bar-app-header">
            <BurgerMenu />
            <div className="header-bar-site-title">
                <h2>
                    {t(location.pathname === "/" ? "home" : location.pathname.replace("/", ""))}
                </h2>
            </div>
            <div className="header-bar-menu-items">
                <PathItem path="/" label="Home" />
                <PathItem path="/forum" label="Forum" />
                <PathItem path="/reminders" label="Reminders" />
                {/*<PathItem path="/admin" label="Admin" />*/}
            </div>
            <div className="header-bar-user-settings">
                <svg onClick={handleSettingsClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                </svg>
            </div>

            <MenuTrigger>
                <Button className="header-bar-user-menu">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={50} height={50}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </Button>
                <Popover>
                    <Menu onAction={menuClick}>
                        <MenuItem id="profile">{t("myProfile")}</MenuItem>
                        <MenuItem id="logout">{t("logout")}</MenuItem>
                    </Menu>
                </Popover>
            </MenuTrigger>
        </div>
    )
}

function PathItem({ path, label }: { path: string, label: string }) {
    return (
        <div className="header-bar-menu-item">
            <Link to={path}>{label}</Link>
        </div>
    )
}

function BurgerMenu() {
    const { isOpen, setIsOpen } = useContext(NavbarContext);

    return (
        <div className="header-bar-menu-icon" onClick={() => {
            setIsOpen(!isOpen);
        }}>
            <div className="header-bar-menu-line"></div>
            <div className="header-bar-menu-line"></div>
            <div className="header-bar-menu-line"></div>
        </div>
    )
}

export default HeaderBar;