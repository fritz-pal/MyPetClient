import { Link } from "react-router-dom";
import './css/HeaderBar.css';
import { useContext } from "react";
import NavbarContext from "../context/MenuContext";
import { useTranslation } from "react-i18next";

const MobileNavbar = () => {
    const { isOpen, setIsOpen } = useContext(NavbarContext);

    window.addEventListener("resize", () => setIsOpen(false));

    return (
        <div className={`header-bar-navbar ${isOpen ? 'open' : ''}`}>
            <div className="header-bar-navbar-items">
                <NavbarItem path="/" label="home" />
                <NavbarItem path="/forum" label="forum" />
                <NavbarItem path="/reminders" label="reminders" />
                {/*<NavbarItem path="/admin" label="Admin" />*/}
            </div>
        </div>
    );
};

function NavbarItem({ path, label }: { path: string, label: string }) {
    const { setIsOpen } = useContext(NavbarContext);
    const [t, _] = useTranslation("header");
    return (
        <div className="header-bar-navbar-item">
            <Link onClick={() => setIsOpen(false)} to={path}>{t(label)}</Link>
        </div>
    )
}

export default MobileNavbar;