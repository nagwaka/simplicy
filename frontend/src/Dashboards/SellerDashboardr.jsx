import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Config/Component/Loading/Loading'
import ProductPage from '../ProductPage/ProductPage'


export default function SellerDashboard({sellerId, role}) {

  const [ isLoading, setIsLoading ] = useState(true)//kola



   

  console.log(sellerId)



  return (
    <div className=' flex column gap-[2rem] justify-center'>
      
      <h1 className='text-white text-center mt-4'>Seller's Page</h1>
            
            <Link to={`/api/newProduct`} className='mx-auto'>
            
            <button className='button '>Add Product</button>
            </Link>
            <ProductPage seller={sellerId} role={role}/>
        
    </div>
  )
}
