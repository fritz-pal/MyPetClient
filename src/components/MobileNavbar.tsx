import { Link } from "react-router-dom";
import './css/HeaderBar.css';
import { useContext } from "react";
import NavbarContext from "./MenuContext";

const MobileNavbar = () => {
    const { isOpen, setIsOpen } = useContext(NavbarContext);

    window.addEventListener("resize", () => setIsOpen(false));

    return (
        <div className={`navbar ${isOpen ? 'open' : ''}`}>
            <div className="navbar-items">
                <NavbarItem path="/" label="Home" />
                <NavbarItem path="/forum" label="Forum" />
                <NavbarItem path="/reminders" label="Reminders" />
                <NavbarItem path="/newpet" label="Test" />
            </div>
        </div>
    );
};

function NavbarItem({ path, label }: { path: string, label: string }) {
    const { setIsOpen } = useContext(NavbarContext);

    return (
        <div className="navbar-item">
            <Link onClick={() => setIsOpen(false)} to={path}>{label}</Link>
        </div>
    )
}

export default MobileNavbar;