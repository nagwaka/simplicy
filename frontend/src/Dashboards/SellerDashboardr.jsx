import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../Config/Component/Loading/Loading'
import ProductListing from '../ProductPage/ProductListing';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from 'axios';


export default function SellerDashboard({sellerId, location, role, products, seller}) {
 const navigate = useNavigate();
 console.log(products)
     
 async function handleDelete( product_id) {
    // e.preventDefault()
    const token = Cookies.get("token")
      console.log(token)
  
      if (!token) {
        console.error('user not authorized');
        return;
      }
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${product_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        // Update state or perform any necessary actions after deletion
        toast.success("Product deleted successfully");
        // navigate(`/api/users/${sellerId}`);
      } catch (error) {
        toast.error("Error deleting product");
        console.error("Error deleting product:", error);
      }
    }
     
    
  }



  return (
    <div className=' flex column gap-[2rem] justify-center'>
      
      <h1 className='text-white text-center mt-4'>Seller's Page</h1>
            
            <Link to={`/api/newProduct`} className='mx-auto'>
            
            <button className='button '>Add Product</button>
            </Link>
            

            <div  className='px-5 lg:px-0'>
            <h1>{products.length > 0 ? "Recents Products" : "No Products"}</h1>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
              {console.log(products)}
            {products.length > 0 && products.map(listing => (
            <ProductListing key ={listing._id} id = {listing._id} listing = {listing} onDelete={handleDelete} location={location} onEdit/>
            ))}
            </ul>
            </div>
    </div>
  )
}
