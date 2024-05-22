import { StyleSheet, css } from 'aphrodite'
import React from 'react'

export default function DisplayNotifications() {
  return (
    <div>
         <div className={css(styles.displayNav)}>
            <p >Your Notifications</p>
        </div>
      
    </div>
  )
}

const styles = StyleSheet.create({
  displayNav:{
    border: '2px dashed red',
    width: '30%',
    position: 'absolute',
    top:"6rem",
    right: 6,
    padding: '4rem',
    color:"black",
    // fontSize: 'var(--font-x-small)',
    "@media (max-width: 767px)" :{
     
       width: '100%',
       height:"100%",
       backgroundColor: "white",
       padding: "0",
       border: "none"
     
      
     }
    }

})