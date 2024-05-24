import { StyleSheet, css } from 'aphrodite'
import React, { useContext, useEffect, useState } from 'react';
// import { AiOutlineUser } from 'react-icons/ai'
import { userContext } from '../Config/UserContext';
import './header.css'
import { Link } from 'react-router-dom';
import Notification from '../Notofication/Notification';

export default function Header({login, signup, role,  handleDisplayDrawer }) {

  const {user} = useContext(userContext)



  return (
    <header className={`${css(stylesHeader.headers)} `}>
      <div className="container flex items-center justify-between">
        <div className={`header-logo `} >
           <a href="#" className=''>
           <h1 className='header-text'>Simplicy</h1>
          </a>
        </div>


       <div className='text-white'>
       
       {login ? (
          signup ? (
           
              <Link>
                <a className='font-bold dec' href='#'>Signup</a>
              </Link>
          ) : 
          (
            <Link>
              <a className='font-bold'>Login</a>
            </Link>
          ) 
        
        ) : 
        null
       }

       </div>


       {user != null ? (
        <Notification userName={user}  handleDisplayDrawer= {handleDisplayDrawer}/>
       ): ""}

      </div>

    </header>
  )
}



export const stylesHeader = StyleSheet.create({
    headers:{
        // backgroundColor:"red",
        // borderBottom:"1px solid black",
        
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        height:"6rem",
        color:"white",
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Add box shadow for drop shadow effect
        transition: 'box-shadow 0.3s ease', // Add transition 
        backgroundColor:"#4CE349",
         
        "@media (max-width: 767px)": {
          paddingLeft:"2rem",
          paddingRight:"2rem",
                
        }

        

    },
    img:{
        width:"180px",
        display:"flex",
        justifyContent:"center",
        
        "@media (max-width: 767px)": {
            width:"130px"
                  
          }
    },
    hide:{
        "@media (max-width: 767px)": {
            display:"none"
                  
          }

    }
})