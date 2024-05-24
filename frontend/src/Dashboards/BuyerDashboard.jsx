import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'  
import Loading from '../Config/Component/Loading/Loading'
import "./page.css"
import ProductPage from '../ProductPage/ProductPage'

export default function BuyerDashboard({role}) {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ products, setProduct ] = useState([
        {
        "name": "",
        "desc":"",
        "category": "",
        "price":"",
        "images":"",
        "stock":""
        }
    ])
    console.log(role)

  return (
    <div className=''>
      
      <h1 className='text-white text-center mt-4'>Buyer's Page</h1>
            {isLoading  ? 
            <Loading/> : <ProductPage role={role}/>}
        
    </div>
  )
}
