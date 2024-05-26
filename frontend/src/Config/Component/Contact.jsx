import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify';


export default function Contact({sellerId}) {
    const [seller, setSeller] = useState(null);
    const [message, setMessage] = useState("");
    
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
            <div className='flex flex-col text-sm lg:text-lg mt-5 space-y-3'>
            <p>
              Contact <span className='font-bold'>{seller.fullName} </span> for the readily fruits
            </p>
            <textarea
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
