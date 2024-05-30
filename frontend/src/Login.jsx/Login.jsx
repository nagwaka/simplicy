import { StyleSheet, css } from 'aphrodite';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./login.css"
import Header from '../Header/Header';
import axios from 'axios';
import Loading from '../Config/Component/Loading/Loading';
import { toast } from 'react-toastify';
// import {userContext } from '../Config/UserContext';

export default function Login({login, setRole}) {

    const [enableSubmit, setEnableSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
   })
   const navigate = useNavigate()
   const {email, password} = formData
  //  const {setUser} = useContext(userContext)

   
   const handleChange = (e) =>{
       setFormData((prev) =>({
         ...prev,
         [e.target.id] : e.target.value
       }))
     }

     const handleRole = (role) => {
      setRole(role)
      // console.log(role, "role")
     }


     const submit = (e) =>{
      e.preventDefault()//lthis
      setLoading(true)
      axios.post('http://localhost:3000/api/auth/login', formData)
      .then(({data}) => {
        console.log(data)
        login(data.user)
        const id = data.user._id;
        toast.success("signin successful")
        navigate(`/api/user/${id}`)
        setLoading(false)

      })
      .catch((err) => {
        console.log(err)
        // const message = err.response.message
        toast.error("error signing")
        setLoading(false)
      })
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
    <section className=' section section-bg relative'>
    
        <div className="container flex justify-between">
        <div className=' absolute top-[50%] left-[40%]'>
         {loading ?  <Loading /> :""}
         </div>
          <div className={`section-body ${css(styles.hide)}`}>
            <section class="text-center">
                <h2 class="section-title">Simplicy</h2>
                <h2 class="section-title">Harvesting Freshness, connecting lives</h2>
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
                                autoComplete='off'
                                required
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
                                autoComplete='off'
                                required
                                onChange={handleChange}
                                />
                                <h3 className="">
                                  {/* <RiArrowDropDownLine size="40" fill="gray" /> */}
                                  
                                </h3>
                                </div>

                          </div>
                          <input className='button' disabled={!enableSubmit} type="submit" value="login" />

                          <div className='text-center flex-col items-center'>
                              <h2 className='or'>OR</h2>
                            <div className='mt-4'>
                              <a disabled><h3 className=''>Sign-in with Google</h3></a>

                            </div>
                          </div>
                     
                      </div>
                </form>
              </div>

              <div className='bg flex-col w-[auto]  text-center p-4 bg-red-500'>
                <h2>Create an account</h2>

                <div className="sign-up flex w-[30rem] mt-4 justify-between">
                  <Link to={'/api/auth/signup'} onClick={() => handleRole("buyer")}>
                  <button className='button'>Buyer</button>
                  </Link>
                  <Link to={'/api/auth/signup'} onClick={() => handleRole("seller")}>
                  <button className='button'>Seller</button>
                  </Link>
                </div>

              </div>


            </div>
           
          </div>
        
    </section>
    </>
  
  )
  
}

export const styles = StyleSheet.create({
  hide:{
    
    "@media (max-width: 767px)": {
      display: "none",

    }
  },
  label : {
    fontWeight: "bold",
    
},

 
})