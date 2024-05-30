import React, { useContext, useEffect, useState } from 'react'
// import { userContext } from '../Config/UserContext'
import BuyerDashboard from './BuyerDashboard'
import SellerDashboard from './SellerDashboardr'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../Config/UserContext'
import ProductPage from '../ProductPage/ProductPage'
import IndexPage from '../IndexPage/IndexPage'

export default function Dashboard() {

  const [ role, setRole ] = useState("")
  const {AuthUser} = useContext(UserContext)
  const {id} = useParams()

  const navigate = useNavigate()

   useEffect(() => {

     if (AuthUser && AuthUser) {
        setRole(AuthUser.user.role)
        console.log(role)
     }
    }) 

  const PageReturn = (page) => {
    console.log(id)
    if (page === "buyer") {
      return <BuyerDashboard role={role}/>
    } else if (page === "seller") {
      return <SellerDashboard sellerId={id} role={role}/>
    } else {
      navigate("/index")
    }

  }



  return (
   
      <section className='section section-bg h-[100%]'>
        <div className="container   ">
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
