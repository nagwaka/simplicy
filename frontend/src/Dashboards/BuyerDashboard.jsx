import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'  
import Loading from '../Config/Component/Loading/Loading'
import "./page.css"

export default function BuyerDashboard() {
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

  return (
    <div className=''>
      
      <h1 className='text-white text-center'>Buyer's Page</h1>
            {isLoading ? 
            <Loading/> : ""}
        
    </div>
  )
}
