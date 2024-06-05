import React, { useContext, useEffect, useState } from 'react'
// import { userContext } from '../Config/UserContext'
import BuyerDashboard from './BuyerDashboard'
import SellerDashboard from './SellerDashboardr'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../Config/UserContext'

export default function Dashboard() {

  const [ role, setRole ] = useState("")
  const [ location, setLocation ] = useState("")
  const [ products, setProducts] = useState([])
  const {AuthUser} = useContext(UserContext)
  const {id} = useParams()

  const navigate = useNavigate()


  useEffect(()=> {
  
    if (role === "seller") {
      axios.get(`http://localhost:3000/api/products/${id}/products`)
      .then((response) => {
          setProducts(response.data);
          console.log(response)
      }) .catch ((error) => {
          console.log(error)
      })
  
    } else {
      axios.get(`http://localhost:3000/api/products/`)
      .then((response) => {
          setProducts(response.data);
          console.log(response)
      }) .catch ((error) => {
          console.log(error)
      })
    }
   
    if (AuthUser && AuthUser) {
      setRole(AuthUser.user.role)
      setLocation(AuthUser.user.region)
      console.log(location)
   }
  }, [id])
  
 

  const PageReturn = (page) => {
    console.log(id)
    if (page === "buyer") {
      return <BuyerDashboard role={role} location={location}  products={products}/>
    } else if (page === "seller") {
      return <SellerDashboard sellerId={id}  role={role} location={location}  products={products}/>
    } else {
      navigate("/index")
    }

  }



  return (
   
      <section className='section section-bg h-[100%]'>
        <div className="container   ">
          <div className=" ">
           {id ? (
                 PageReturn(role)
                ) : ""
            }
                            
          </div>
        </div>
      </section>
    
  )
}
