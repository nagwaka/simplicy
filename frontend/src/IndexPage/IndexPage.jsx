import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function IndexPage() {
    const [products, setProducts] = useState([])
    useEffect(() => {
    axios.get().then(response => {
        setProducts([...response.data])
    })
  }, [])
 
//   console.log(products)
  return (
   <div className='section section-bg'>
     <div className='mt-8 grid  gap-y-8 grid-col2 gap-x-6 md:grid-cols-3 lg:grid-cols-4'>index
       <div className="container">
    
          {products.length > 0 && products.map(product => (
      
            <div>
                <div className='bg-gray-500 rounded-2xl flex'>
                 {product.photos?.[0] && (
              <img className='rounded-2xl object-contain' src={`http://localhost:3001/uploads` + product} />

                 )}
            </div>
            <h2 className='text-sm truncate'>{product.title}</h2>
            <h2 className='font-bold'>{product.address}</h2>
        </div>
      ))}
       
   
       </div>
    </div>
   </div>
  )
}

