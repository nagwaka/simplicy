import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Config/UserContext'
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import Cookies from 'js-cookie';

export default function IndexPage({role}) {
    const [products, setProducts] = useState([])
    const {AuthUser} = useContext(UserContext)

    
useEffect(()=> {
 
  axios.get("http://localhost:3000/api/products/")
  .then((response) => {
      setProducts(response.data);
  }) .catch ((error) => {
      console.log(error)
  })

}, [])

async function handleDelete(e, product_id) {
  e.preventDefault()
  const token = Cookies.get("token")
    console.log(token)

    if (!token) {
      console.error('user not authorized');
      return;
    }
  // Ask for confirmation before deleting
  const confirmDelete = alert("Are you sure you want to delete this product?");
  console.log(product_id)
  if (confirmDelete && product_id) {
    await axios.delete(`http://localhost:3000/api/products/${product_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
        console.log( response,"Product deleted successfully");
        alert("Product deleted successfully");
        console.log(products)
      })
      .catch(error => {
        // Handle errors
        console.error("Error deleting product:", error);
        // Optionally, you can handle errors and notify the user
      });
  }
   
  
}

 
//   console.log(products)
  return (
   <div className='section section-bg'>
       <div className="container  p-10">
       <div className='lg:flex gap-6 flex-wrap'>
          {products.length > 0 && products.map((product) => (
            <div className='flex w-[100px]: cursor-pointer gap-4 mb-8 lg:mb-0 text-black bg-gray-100 p-4 rounded-2xl'>
              <Link to={'/api/product/' + product._id} className='w-[100px] h-[auto] lg:w-[200px] lg:h-[auto]  grow shrink-0'>
                {product.images.length && ( 
                  <img className='rounded-2xl w-[150px]  lg:w-[200px] '  src={'http://localhost:3000/uploads/' + product.images[0]} alt=""/> 
                ) }
              </Link>
              <div className='flex-col mt-3'>
             <div className='grow-0 shrink '>
                <h2 className='text-2xl font-bold'>{product.name}</h2>
                <p >{product.description}</p>
                <div className='flex space-x-4'>
                  <p  className='text-xl font-light'>Category: <span className='text-xm mt-2 font-bold'>{product.category}</span></p>
                  <p  className='text-xl'>Stock: <span className='text-xm mt-2 font-bold'>{product.stock}</span></p>
                 </div>
             
             </div>
             
             <div className='grow-0 shrink '>
                    <div className='text-black '>
                      <h2 className='text-2xl font-bold'>{product.createdAt}</h2>
                      
                      <div className='flex space-x-4 items-center gap-4'>
                        {((AuthUser.isLoggedIn === false && AuthUser.user === null) ?? role === "buyer" )  && (<p  className='text-xl'>Seller: <span className='text-xm mt-2 font-bold'>{AuthUser.user.fullName}</span></p>)}
)
                        <Link to={'/api/updateProduct/' + product._id}>
                        {((AuthUser.isLoggedIn === false && AuthUser.user === null) ?? role === "buyer" ) && <p className='text-black'><FiEdit2/></p> }
                        </Link>
                        
                        {((AuthUser.isLoggedIn === false && AuthUser.user === null)  ?? role === "buyer" )&&
                        <p className='text-black' onClick={(e) => handleDelete(e,product._id)}><MdOutlineDelete/></p>}

                      </div>
                    </div>
                </div>
             </div>

              
            </div>
          ))}

        </div>
      
       </div>
   </div>
  )
}

