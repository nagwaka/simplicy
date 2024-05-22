import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

export default function Signup() {

    const [enableSubmit, setEnableSubmit] = useState(false);
    const [formData, setFormData] = useState({
        fullName:"",
        email: "",
        role:"buyer",
        region:"",
        password: "",
        
        
   })
   const navigate = useNavigate();
   const {email, password, fullName, role, region} = formData

   
   const handleChange = (e) =>{
       setFormData((prev) =>({
         ...prev,
         [e.target.id] : e.target.value
       }))
     }

   
    const submit = (e) =>{
        e.preventDefault()//lthis
        axios.post('http://localhost:5000/api/auth/signup', formData)
        .then(({data}) => {
          console.log(data)

        })
        .catch((err) => {
          console.log(err)
        })
        console.log(formData)
    }

 
    

    
  useEffect (() => {
    if (email !== "" && password !== "") {
      setEnableSubmit(true);
    } else {
      if (enableSubmit !== false) {
        setEnableSubmit(false);
      }
    }
  }, [email, password, enableSubmit]);
  return (
    <>
    {/* <Header signup="signup"/> */}
    
    <section className=' section section-bg'>
        <div className="container row">
          <div className={`section-body ${css(styles.hide)}`}>
            <section class="text-center">
                <h2 class="section-title">Simplicy</h2>
                <h2 class="section-title">We help you build your brand</h2>
              </section>
          </div>
          <div className="column form-container">
              <div className="form">
                <form onSubmit={submit}  className={''}>
                  
                      <h1 className="mb-6 text-center">Register with Us!!!</h1>
                        <div className="field-container ">
                        
                          <div className='column input'>
                            <label className={css(styles.label)} 
                              htmlFor="fullName">Full Name:</label>
                                <div className='row input-container'>
                                <input
                                type='text' 
                                name='fullName'
                                id="fullName"
                                placeholder='John Doe'
                                value={fullName}
                                onChange={handleChange}
                                />
                              
                                </div>

                          </div>
                          <div className='column input'>
                            <label className={css(styles.label)} 
                              htmlFor="email">Email:</label>
                                <div className='row input-container'>
                                <input
                                type='email' 
                                name='email'
                                id="email"
                                placeholder='JohnDoe@gmail.com'
                                value={email}
                                onChange={handleChange}
                                />
                              
                                </div>

                          </div>
                           <div className="sign-up flex-col w-[30rem] mt-4 justify-between">
                             <label className={css(styles.label)} 
                              htmlFor="email">Select Your Role:</label>
                            
                            <div className='sign-up flex w-[30rem] mt-4 justify-between'>
                                <button id="buyer" name="buyer" value="buyer" onClick={handleChange}
                                 className={` button ${ role === "buyer" ? "active" : ""  }`}>Buyer</button>
                                <button  id="seller" name="seller" value="seller"
                                 onClick={handleChange} className={` button ${ role === "seller" ? "active" : ""  }`}>Seller</button>
                            </div>
                         </div>
                         <div className='column input '>
                            <label className={css(styles.label)} 
                              htmlFor="Region">Region:</label>
                                <div className='  row input-container'>
                                <input
                                type='text' 
                                name='region'
                                id="region"
                                value={region}
                                placeholder='Lagos'
                                onChange={handleChange}
                                />
                                <h3 className="">
                                  {/* <RiArrowDropDownLine size="40" fill="gray" /> */}
                                  xddd
                                </h3>
                                </div>

                          </div>
                          <div className='column input '>
                            <label className={css(styles.label)} 
                              htmlFor="paasword">Password:</label>
                                <div className='  row input-container'>
                                <input
                                type='password' 
                                name='password'
                                id="password"
                                value={password}
                                placeholder='**********'
                                onChange={handleChange}
                                />
                                <h3 className="">
                                  {/* <RiArrowDropDownLine size="40" fill="gray" /> */}
                                  xddd
                                </h3>
                                </div>

                          </div>
                          
                          <input className='button' type="submit" value="login" />
                     
                      </div>
                </form>
              </div>
            </div>
          </div>
    </section>  
    </>   
  
  )
  
}

const styles = StyleSheet.create({
  hide:{
    
    "@media (max-width: 767px)": {
      display: "none",

    }
  },
  label : {
    fontWeight: "bold",
    
},

 
})
