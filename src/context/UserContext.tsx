import { createContext, SetStateAction, useState } from "react";
import { newUser, User } from "../models/User";

interface UserContextProps {
    user: User;
    setUser: React.Dispatch<SetStateAction<User>>;
}

/**
 * Holds a User, for example the currently logged in User
 */
export const UserContext = createContext<UserContextProps>({
    user: newUser(),
    setUser: () => {}
});

/**
 * Provides a user Context
 */
const UserContextProvider = ({children, initialUser}: {children: JSX.Element, initialUser?: User}) => {
    const [user, setUser] = useState(initialUser ? initialUser : newUser());
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
