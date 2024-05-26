import React from 'react'
import { AiFillNotification } from "react-icons/ai";
import { LuUserCircle  } from "react-icons/lu";
import "./Notification.css"
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
const opacityAnimation = {
    "0% ": {
      opacity: 0.5,
    },
    "100% ": {
      opacity: 1,
    }
  };  
  const bounceAnimation = {
    "0%": { transform: "translateY(0px)" },
    "33%": { transform: "translateY(-5px)" },
    "66%": { transform: "translateY(5px)" },
    "100%": { transform: "translateY(0px)" },
  };

export default function Notification({handleDisplayDrawer, userName}) {
  const handleShow = () => {
    handleDisplayDrawer();
  };
   

  return (
    <>
    <div className='flex justify-center items-center gap-6 w-auto'>
        <AiFillNotification
         onClick={handleShow}
         className={css(styles.menuItem, styles.icon)}  />

       
        <div className="flex items-center name-logo  text-white" >
            <h1 className='text-2xl pr-4'>{userName && userName.fullName}</h1>
            <Link to={'/api/profile'}>
             <LuUserCircle  className={`ml-4'icon-logo'`} size="30"  />    
            </Link>   
        </div>  
    </div>
   

    </>
  )
}


const styles = StyleSheet.create({

    menuItem: {
      fontSize:"3rem",
     
      ":hover": {
        cursor: "pointer",
        animationName: [bounceAnimation, opacityAnimation],
        animationDuration: '1s',
        animationIterationCount: "3",
      }
        
    },
    icon: {
      fontSize:"3rem",
      
     
      "@media (max-width: 767px)": {
        fontSize:"2.5rem",
        
      }
        
    },
    userIcon: {
      fontSize:"10rem",
      //fix
      
     
      "@media (max-width: 767px)": {
       fontSize:"4rem",
        
      }
        
    },
  });
