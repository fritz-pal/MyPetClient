import { Link } from "react-router-dom";
import './css/HeaderBar.css';
import { useState } from "react";
import NavbarContext from "./MenuContext";

const MobileNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
            <div className={`navbar ${isOpen ? 'open' : ''}`}>
                <div className="navbar-items">
                    <NavbarItem path="/" label="Home" />
                    <NavbarItem path="/forum" label="Forum" />
                    <NavbarItem path="/reminders" label="Reminders" />
                    <NavbarItem path="/marketplace" label="Marketplace" />
                </div>
            </div>
        </NavbarContext.Provider>
    );
};

function NavbarItem({ path, label }: { path: string, label: string }) {
    return (
        <div className="navbar-item">
            <Link to={path}>{label}</Link>
        </div>
    )
}

export default MobileNavbar;