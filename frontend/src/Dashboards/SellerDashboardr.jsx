import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Config/Component/Loading/Loading'


export default function SellerDashboard() {

  const [ isLoading, setIsLoading ] = useState(true)//kola


  const [ products, setProduct ] = useState([
    {
      "name": "",
      "desc":"",
      "category": "",
      "price":"",
      "images":"",
      "stock":""
    }
])

   

    // useEffect(() => {

    //     console.log(id)
    //     axios.get(`http://localhost:5000/api/user/${id}/${role}`).then(({data}) =>{
    //         setEnrolledCourses(data)
    //         console.log(enrolledCourses.course)
    //     })
    // }) 

  return (
    <div className=''>
      
      <h1 className='text-white text-center'>Seller's Page load</h1>
            {isLoading ? 
            <Loading/> : ""}
        
    </div>
  )
}
