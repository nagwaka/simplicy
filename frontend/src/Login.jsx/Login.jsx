import { StyleSheet, css } from 'aphrodite';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./login.css"
import Header from '../Header/Header';

export default function Login() {

    const [enableSubmit, setEnableSubmit] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
   })
   const navigate = useNavigate()
   const {email, password} = formData

   
   const handleChange = (e) =>{
       setFormData((prev) =>({
         ...prev,
         [e.target.id] : e.target.value
       }))
     }
   const submit = (e) =>{
       e.preventDefault()
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
    {/* <Header login="login"/> */}
    <section className=' section section-bg'>
        <div className="container flex justify-between">
          <div className={`section-body ${css(styles.hide)}`}>
            <section class="text-center">
                <h2 class="section-title">Simplicy</h2>
                <h2 class="section-title">We help you build your brand</h2>
              </section>
          </div>
          <div className="column form-container">
              <div className="form">
                <form  onSubmit={submit} className={''}>
                  
                      <h1 className="mb-6 text-center">Welcome Back Champ!!!</h1>
                        <div className="field-container ">
                        
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
                          <div className='column input '>
                            <label className={css(styles.label)} 
                              htmlFor="paasword">Password:</label>
                                <div className='  row input-container'>
                                <input
                                type='password' 
                                name='password'
                                id="password"
                                placeholder='*********'
                                value={password}
                                onChange={handleChange}
                                />
                                <h3 className="">
                                  {/* <RiArrowDropDownLine size="40" fill="gray" /> */}
                                  xddd
                                </h3>
                                </div>

                          </div>
                          <input className='button' type="submit" value="login" />

                          <div className='text-center flex-col items-center'>
                              <h2 className='or'>OR</h2>
                            <div className='mt-4'>
                              <h3 className=''>Sign-in with Google</h3>

                            </div>
                          </div>
                     
                      </div>
                </form>
              </div>

              <div className='bg flex-col w-[auto]  text-center p-4 bg-red-500'>
                <h2>Create an account</h2>

                <div className="sign-up flex w-[30rem] mt-4 justify-between">
                  <button className='button'>Buyer</button>
                  <button className='button'>Seller</button>
                </div>

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