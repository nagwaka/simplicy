import React, { useContext, useEffect, useState } from 'react'
// import { userContext } from '../Config/UserContext'
import BuyerDashboard from './BuyerDashboard'
import SellerDashboard from './SellerDashboardr'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../Config/UserContext'

export default function Dashboard() {

  const [ role, setRole ] = useState("")
  const {AuthUser} = useContext(UserContext)
  const {id} = useParams()
  console.log(id)

   useEffect(() => {

     if (AuthUser && AuthUser) {
        setRole(AuthUser.user.role)
        console.log(role)
     }
    }) 

  const PageReturn = (page) => {
    if (page === "buyer") {
      return <BuyerDashboard role={role}/>
    } else if (page === "seller") {
      return <SellerDashboard role={role}/>
    } else {
      return <SellerDashboard role={role}/>
    }

  }



  return (
   
      <section className='section section-bg h-[100%]'>
        <div className="container ">
          <div className=" flex justify-center ">
           {id ? (
                 PageReturn(role)
                ) : ""
            }
                            
          </div>
        </div>
      </section>
    
  )
}
