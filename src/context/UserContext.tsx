import { createContext, SetStateAction, useState } from "react";
import { newUser, User } from "../models/User";

interface UserContextProps {
    user: User;
    setUser: React.Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContextProps>({
    user: newUser(),
    setUser: () => {}
});

const UserContextProvider = ({children, initialUser}: {children: JSX.Element, initialUser?: User}) => {
    const [user, setUser] = useState(initialUser ? initialUser : newUser());
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
