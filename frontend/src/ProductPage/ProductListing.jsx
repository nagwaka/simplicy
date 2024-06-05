import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import {MdLocationOn} from 'react-icons/md';
import {FaTrash} from 'react-icons/fa';
import {MdEdit} from 'react-icons/md';


export default function ProductListing({listing, id, onDelete, onEdit, location, role}) {
  return (
    <li className="relative bg-white  flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded overflow-hidden transition-shadow duration-150 m-[10px]">

      <Link className='contents' to = {`/api/product/${id}`}>
        <img className= "h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
        loading='lazy'
        src = {`http://localhost:3000/uploads/${listing.images[0]}`} alt = ""/> 
        
        <Moment className='absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semi-bold rounded-md px-2 py-1 shadow-lg' fromNow>
        </Moment>    
      <div className='w-full p-[10px] '>
        <div className='flex items-center justify-between'>
        <p className='font-bold m-0 text-black text-2xl'>{listing.name}</p>
        <p  className='font-semibold text-black'>
              {listing.category} </p>
        </div>
        <p className='font-semibold m-0 text-black text-xl'>{listing.description}</p>
        <div className='flex items-center space-x-1'> 
          <MdLocationOn className='text-green-600'/>
          <p className='font-semibold text-xl mb-[2px] text-black truncate'>{location}</p>
        </div>
        
       <p className='text-[#457b9d] mt-2 font-bold'>
        Price:{
        
          `${listing.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        `}
        
        </p>
       
          <div className='flex justify-between '>
            <p className='font-semibold text-black'>
            {listing.stock > 1 ? `${listing.stock?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Stock` :"0 Stock"}</p>

            <div className='w-[50px] flex  items-center  justify-between'>
                {onDelete  && (
                  <FaTrash className=' h-[24px] cursor-pointer text-red-500'
                    onClick={() => onDelete(listing._id)}
                  />

              )}

                {onEdit  && (
                <Link to={`/api/updateProduct/${id}`}>
                  <MdEdit className=' h-[24px] cursor-pointer text-black'/>
                  </Link>
                )}

             </div>
            
          </div>
      </div>
      </Link>
         
        
    
       
    </li>
  )
}
