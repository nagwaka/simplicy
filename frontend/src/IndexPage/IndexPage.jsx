import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Config/UserContext'
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import Cookies from 'js-cookie';
import ProductListing from '../ProductPage/ProductListing';

export default function IndexPage({role}) {
    const [products, setProducts] = useState([])
    const [location, setLocation] = useState('')
    const {AuthUser} = useContext(UserContext)

    
useEffect(()=> {
 
  axios.get("http://localhost:3000/api/products/")
  .then((response) => {
      setProducts(response.data);
  }) .catch ((error) => {
      console.log(error)
  })
  if (AuthUser && AuthUser) {
    // setRole(AuthUser.user.role)
    setLocation(AuthUser.user.region)
    console.log(location)
 }

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
       <div className=''>

          <div  className='px-5 lg:px-0'>
          <h1>{products.length > 0 ? "Recents Products" : "No Products"}</h1>

            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {console.log(products)}
            {products.length > 0 && products.map(listing => (
            <ProductListing key ={listing._id} id = {listing._id} listing = {listing}/>
            ))}
            </ul>
          </div>
        </div>
      
       </div>
   </div>
  )
}

