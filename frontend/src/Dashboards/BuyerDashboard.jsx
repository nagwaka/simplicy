import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'  
import Loading from '../Config/Component/Loading/Loading'
import "./page.css"
import ProductListing from '../ProductPage/ProductListing'

export default function BuyerDashboard({role, products}) {
    const [ isLoading, setIsLoading ] = useState(true)
    // const [ products, setProduct ] = useState([
    //     {
    //     "name": "",
    //     "desc":"",
    //     "category": "",
    //     "price":"",
    //     "images":"",
    //     "stock":""
    //     }
    // ])
    console.log(role)

  return (
    <div className='p-10'>
      
      <h1 className='text-white text-center mt-4'>Buyer's Page</h1>
            {/* {isLoading  ? 
            <Loading/> : <ProductPage role={role}/>} */}
            <div  className='px-5 lg:px-0'>
            <h1>{products.length > 0 ? "Recents Products" : "No Products"}</h1>             
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
              {console.log(products)}
            {products.length > 0 && products.map(listing => (
            <ProductListing key ={listing._id}id = {listing._id} listing = {listing}  />
            ))}
            </ul>
            </div>

        
    </div>
  )
}
