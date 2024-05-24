import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext({});

export function UserContext({children}){
    const [user, setUser] = useState(null);
    const [login, setlogin] = useState(false);
    const [logOut, setLogOut] = useState(false);
 

    // useEffect(() =>{
    //     if (user != null ) {
    //         axios.get('/profile')
    //         .then(({data}) => {
    //             setUser(data)
    //             console.log(user)
    //             setlogin(true)

    //         })
    //     }

    // }, [])

   
    return(
        <userContext.Provider value={{user, setUser, login, logOut, setLogOut}}>
            {children}
        </userContext.Provider>
    )
}

