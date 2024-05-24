import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PlaceForm from './PlaceForm';
import AccountNav from '../AccountNav';
import axios from 'axios';
// import { BsCloudUpload } from 'react-icons/bs'
// import axios from 'axios'
// import Perks from '../Component/Perks'
// import Photos from '../Component/Photos'


export default function PlacePage() {
  const [products, setProducts] = useState([])
  const {action} = useParams();
  useEffect(() => {
    axios.get('http://localhost:3001/products').then(({data}) =>{
      setPlaces(data)

    })
  }, [])
  console.log(products)
  
  return (
   <div>
        <div className='mt-4'>
          {products.length > 0 && products.map(place => (
            <Link to={'/account/products/' + place._id} className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'>
              <div className='w-32 h-32 bg-gray-300'>
                {place.photos.length && ( 
                  <img src={'http://localhost:3001/uploads/' + place.photos[0]} alt=""/> 
                ) }
              </div>
             <div className='grow-0 shrink'>
             <h2 className='text-xl'>{place.title}</h2>
             <p className='text-sm mt-2'>{place.description}</p>
             </div>

              
            </Link>
          ))}

        </div>
      
    </div>
  )
}
