import { createContext } from "react";
import { newUser, User, UserAPI } from "../models/User";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";

interface UserContextProps {
    user: User;
}

/**
 * Holds a User, for example the currently logged in User
 */
export const UserContext = createContext<UserContextProps>({
    user: newUser(),
});

/**
 * Provides a user Context
 */
const UserContextProvider = ({children}: {children: JSX.Element}) => {
    const meQuery = useQuery({
        queryKey: ["user", "me"],
        queryFn: () => UserAPI.getMyUser()
    })
    if (meQuery.isLoading) {
        return <Loader/>
    }
    if (meQuery.isError) {
        return <>Unknown Error</>
    }
    return (
        <UserContext.Provider value={{user: meQuery.data ? meQuery.data : newUser()}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
