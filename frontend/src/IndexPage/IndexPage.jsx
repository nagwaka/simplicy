import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function IndexPage() {
    const [products, setProducts] = useState([])
    useEffect(() => {
    axios.get().then(response => {
        setPlaces([...response.data])
    })
  }, [])
 
//   console.log(products)
  return (
    <div className='mt-8 grid  gap-y-8 grid-col2 gap-x-6 md:grid-cols-3 lg:grid-cols-4'>index
      {places.length > 0 && places.map(places => (
        <div>
          <div className='bg-gray-500 rounded-2xl flex'>
            {place.photos?.[0] && (
              <img className='rounded-2xl object-contain' src={`http://localhost:3001/uploads` + places} />

            )}
            </div>
            <h2 className='text-sm truncate'>{places.title}</h2>
            <h2 className='font-bold'>{places.address}</h2>
        </div>
      ))}
       
   
      
    </div>
  )
}

