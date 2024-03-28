import React from 'react';

interface NavbarContextProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarContext = React.createContext<NavbarContextProps>({
    isOpen: false,
    setIsOpen: () => { },
});

export default NavbarContext;