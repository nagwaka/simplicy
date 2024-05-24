import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../Config/UserContext'
import BuyerDashboard from './BuyerDashboard'
import SellerDashboard from './SellerDashboardr'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Dashboard() {

  const [ role, setRole ] = useState("")
  const {user} = useContext(userContext)
  const {id} = useParams()
  console.log(id)

   useEffect(() => {

     if (user && user) {
        setRole(user.role)
        console.log(role)
     }
    }) 

  const PageReturn = (page) => {
    if (page === "buyer") {
      return <BuyerDashboard/>
    } else if (page === "seller") {
      return <SellerDashboard/>
    } else {
      return "Please Login"
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
