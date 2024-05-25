import axios from "axios";
import { createContext } from "react";


export const AuthUser = {
  user: {

  },
  isLoggedIn: false,
};

export function logOut() {
  AuthUser.user.isLoggedIn = false;
}

   
export const UserContext = createContext({
    AuthUser,
    logOut,
  });


   
//     return(
//         <userContext.Provider value={{user, setUser, login, logOut, setLogOut}}>
//             {children}
//         </userContext.Provider>
//     )
// }

