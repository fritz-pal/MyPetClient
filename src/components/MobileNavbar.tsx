import { Link } from "react-router-dom";
import './css/HeaderBar.css';
import { useContext } from "react";
import NavbarContext from "../context/MenuContext";

const MobileNavbar = () => {
    const { isOpen, setIsOpen } = useContext(NavbarContext);

    window.addEventListener("resize", () => setIsOpen(false));

    return (
        <div className={`header-bar-navbar ${isOpen ? 'open' : ''}`}>
            <div className="header-bar-navbar-items">
                <NavbarItem path="/" label="Home" />
                <NavbarItem path="/forum" label="Forum" />
                <NavbarItem path="/reminders" label="Reminders" />
                <NavbarItem path="/admin" label="Admin" />
            </div>
        </div>
    );
};

function NavbarItem({ path, label }: { path: string, label: string }) {
    const { setIsOpen } = useContext(NavbarContext);

    return (
        <div className="header-bar-navbar-item">
            <Link onClick={() => setIsOpen(false)} to={path}>{label}</Link>
        </div>
    )
}

export default MobileNavbar;