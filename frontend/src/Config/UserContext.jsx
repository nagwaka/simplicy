import { createContext, useEffect, useState } from "react";

export const userContext = createContext({});


//fetch here 
//sending from signup/login - {token, user role }
//login


export const user = {
    email: "",
    password: "",
    isLoggedIn: false,
  };
  
  export function logOut() {
    user.isLoggedIn = false;
  }
  
        
export const UserContext = createContext({
    user,
    logOut,
  });