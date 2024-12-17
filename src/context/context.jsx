import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({children}){
    // create context
    const [token,setToken] = useState(localStorage.getItem("token"));

    const value={
        token,
        setToken
    }

    // provide context
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}