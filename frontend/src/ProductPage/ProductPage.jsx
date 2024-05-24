import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
// import { BsCloudUpload } from 'react-icons/bs'
// import axios from 'axios'
// import Perks from '../Component/Perks'
// import Photos from '../Component/Photos'


export default function ProductPage({role}) {
//   const [products, setProducts] = useState([])
//   const {action} = useParams();
//   useEffect(() => {
//     if (role === "buyer") {
//         axios.get('http://localhost:3001/products').then(({data}) =>{
//          setProducts(data)

//     }) } else if (role === "seller") {
//         axios.get('http://localhost:3001/products').then(({data}) =>{
//       setProducts(data)

//     })}

//     }, [])
  console.log(role)
  
  const [ products, setProduct ] = useState([
    {
      "name": "",
      "desc":"",
      "category": "",
      "price":"",
      "images":[],
      "stock":""
    },
    {
      "name": "",
      "desc":"",
      "category": "",
      "price":"",
      "images":[],
      "stock":""
    },
    {
      "name": "",
      "desc":"",
      "category": "",
      "price":"",
      "images":[],
      "stock":""
    },
    {
      "name": "",
      "desc":"",
      "category": "",
      "price":"",
      "images":[],
      "stock":""
    },
    {
      "name": "",
      "desc":"",
      "category": "",
      "price":"",
      "images":[],
      "stock":""
    }
])
  
  return (
  
        <div className='grid gap-[4rem] mt-4 grid-cols-3 lg:grid-cols-6 md:grid-cols-4'>
          {products.length > 0 && products.map(product => (
            <Link to={'/account/products/' + product._id} className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'>
              <div className='w-32 h-32 bg-gray-300'>
                {product.images.length && ( 
                  <img src={'http://localhost:3001/uploads/' + product.images[0]} alt=""/> 
                ) }
              </div>
             <div className='grow-0 shrink'>
             <h2 className='text-xl'>{product.title}</h2>
             <p className='text-sm mt-2'>{product.desc}</p>
             <p className='text-sm mt-2'>{product.category}</p>
             <p className='text-sm mt-2'>{product.stock}</p>
             </div>

              
            </Link>
          ))}

        </div>
      
   
  )
}
