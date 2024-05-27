import { StyleSheet, css } from 'aphrodite'
import React from 'react'
import NotificationItem from './NotificationItem'
import { IoCloseCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


export default function DisplayNotifications({
        listNotifications,
        handleHideDrawer,
        markNotificationAsRead,
        displayDrawer,
        logout
      }) 
{
  const navigate = useNavigate()
  const markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
    markNotificationAsRead(id);
  };
 

  const handleHide = () => {
    handleHideDrawer();
  };
  const handleLogout = () => {
    logout();
    Cookies.remove('token');
    navigate("/api/auth/login");
    handleHideDrawer();
  };
  
  return (
         <>
         {displayDrawer && (
            <div className={css(styles.displayNav)}>
            <p className='text-center'>Your Notifications</p>
            <div className='absolute right-0 top-0 w-[10]'>
              <IoCloseCircleSharp  onClick={handleHide} className='h-[20px] fill-green-400'size={"30px"}/>
            </div>

            {/* <NotificationItem  
            listNotifications={listNotifications}
            handleDisplayDrawer ={handleDisplayDrawer}
            handleHideDrawer={handleHideDrawer}
            markNotificationAsRead={markNotificationAsRead}
              /> */}

          <ul className={css(styles.ul)}>
            {listNotifications.map((notify) => (
              <NotificationItem
                key={notify.id}
                type={notify.type}
                value={notify.value}
                html={notify.html}
                id={notify.id}
                onMarkAsRead={markAsRead}
              />
            ))}
          </ul>

          <div className="mx-auto">
          <button onClick={handleLogout} className='button-logout mt-6 mx-auto text-black'>logout</button>
          </div>

        </div>)}
         </>
      
  )
}

const styles = StyleSheet.create({
  displayNav:{
    border: '2px dashed red',
    width: '30%',
    position: 'absolute',
    top:"6rem",
    right: 0,
    zIndex:100000,
    padding: '2rem',
    color:"black",
    // background:"red",
    // fontSize: 'var(--font-x-small)',
    "@media (max-width: 767px)" :{
     
       width: '100%',
       height:"100%",
       backgroundColor: "white",
       padding: "2rem",
       border: "none",
       margin:"0 auto",
       zIndex: 100000,
      //  background:"red",

     
      
     }
    },
    ul: {
      "@media (max-width: 767px)" :{
      margin: "0",
      padding: "0",
      width: '100%',
      display: "flex",
      flexDirection: "column",
      gap:"2rem",
  
      }
    },

})