import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import { userContext } from '../Config/UserContext';
import { UserContext } from '../Config/UserContext';

const AuthenticatedRoute = ({}) => {
  
    const {user} = useContext(UserContext)// api call 


    useEffect(() => {
      localStorage.setItem('userState', JSON.stringify(user));// data and token
      const storedUser = JSON.parse(localStorage.getItem('userState'));
  
      
      console.log(storedUser)
    }, [user]);
    console.log(user)

  // Optional: Fetch authentication state from Local Storage (if needed)
  // ... (implement logic to set `isAuthenticated` based on Local Storage)

 

  return (
    //   <></>
      user  &&  user.isLoggedIn === true ? <Outlet/> : <Navigate to= "/login/"/>
  );
};
export default AuthenticatedRoute