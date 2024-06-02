import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify';


export default function Contact({sellerId}) {
    const [seller, setSeller] = useState(null);
    const [message, setMessage] = useState("");

    function onchange (e) {
        setMessage(e.target.value)
    }
    
    useEffect(() => {
        async function getSeller(){
            axios.get(`http://localhost:3000/api/users/${sellerId}`)
            .then((response) => {
                console.log(response)
                setSeller(response.data)
            }).catch((err)=> {
                console.log(err)
            })
           


        }
        getSeller();
    }, []);
    function onchange(e){
        setMessage(e.target.value);
    }
  return (
     <>
     { seller !== null && (
            <div className='flex flex-col text-2xl lg:text-lg mt-5 space-y-3'>
           <div className='flex justify-between'>
            <h2 className='text-3xl'>
                Contact <span className='font-bold'>{seller.fullName} </span> for the readily fruits
                </h2>
                <p className='text-white text-3xl'>{seller.phoneNo}</p>
            </div>
            <textarea
            className='p-4 text-black text-2xl'
            onChange={onchange}
             placeholder='Message'
             />
            
            <a className='bg-blue-600 rounded-md p-4 text-white text-center font-semibold'
            href ={`malto:${seller.email}?Subject= ${seller.fullName}&body${message}`}>SEND MESSAGE</a>
            
          </div>

     )}
     </>
     
  )
}
