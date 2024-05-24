import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Config/Component/Loading/Loading'
import ProductPage from '../ProductPage/ProductPage'


export default function SellerDashboard({role}) {

  const [ isLoading, setIsLoading ] = useState(true)//kola



   

     


  return (
    <div className=' flex column gap-[2rem] justify-center'>
      
      <h1 className='text-white text-center mt-4'>Seller's Page</h1>
            {/* {isLoading ? 
            <Loading/> : <ProductPage role={role}/>} */}
            <Link to={`/api/newProduct`}>
            
            <button className='button'>Add Product</button>
            </Link>

            <ProductPage role={role}/>
        
    </div>
  )
}
