import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../Config/Component/Loading/Loading';
import "./signup.css"
import { toast } from 'react-toastify';

export default function Signup({signup, userRole}) {

    const [enableSubmit, setEnableSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName:"",
        email: "",
        role: userRole,
        region:"",
        phoneNo:"",
        password: "",
        
        
   })
 
   const navigate = useNavigate();
   const {email, password, fullName, role,  region, phoneNo} = formData

   const handleChange = (e) => {
    let selectedRole = ''; // Declare selectedRole outside of if blocks
  
    if (e && e.target.id === "buyer") {
      selectedRole = "buyer";
    }
    if (e && e.target.id === "seller") {
      selectedRole = "seller";
    }
  
    // Handle boolean values (e.g., checkboxes)
    if (e && e.target && e.target.id !== "buyer" && e.target.id !== "seller") {
      setFormData(prevData => ({
        ...prevData,
        [e.target.id]: e.target.value
      }));
    }
  
    // Update role separately`
    if (selectedRole !== '') {
      setFormData(prevData => ({
        ...prevData,
        role: selectedRole
      }));
    }
  }
  

   
    const submit = (e) =>{
        e.preventDefault()//lthis
        setLoading(true)
        axios.post('http://localhost:3000/api/auth/signup', formData)
        .then(({data}) => {
          console.log(data)
          signup(data.savedUser)
          const id = data.savedUser._id;
          toast.success("signin successful")
          navigate(`/api/user/${id}`)
          setLoading(false)

        })
        .catch((err) => {
          console.log(err)
          toast.error("signup unsuccessful")

          setLoading(false)

        })
        console.log(formData)
    }

 
    

    
  useEffect (() => {
    if (
      email !== "" && password !== ""
      && role !== "" && region !== "" &&
      fullName !== "") {
      setEnableSubmit(true);
    } else {
      if (enableSubmit !== false) {
        setEnableSubmit(false);
      }
    }
    console.log(role)
    console.log(formData)

  }, [email, password, enableSubmit, role, region, fullName]);
  return (
    <>    
    <section className=' section section-bg relative'>
        <div className="container row">
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
                <form   className={''}>
                  
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
                                autoComplete='off'
                                required
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
                                autoComplete='off'
                                placeholder='JohnDoe@gmail.com'
                                value={email}
                                required
                                onChange={handleChange}
                                />
                              
                                </div>

                          </div>
                           <div className="sign-up flex-col w-[30rem] mt-4 justify-between">
                             <label className={css(styles.label)} 
                              htmlFor="email">Select Your Role:</label>
                            
                            <div className='sign-up flex w-[30rem] mt-4 justify-between'>
                                {/* <button id="buyer" type='radio' name="buyer" value="buyer" onClick={handleChange}
                                 className={` button ${ role === "buyer" ? "active" : ""  }`}>Buyer</button> */}
                                 <div className='flex gap-6 items-center'>
                                  <label className={` ${css(styles.label)} ${role === "buyer" ? "text-green-400" : ""}`} 
                                    htmlFor="buyer">Buyer:</label>
                                    <input id="buyer"onChange={handleChange} type='radio' name="role"
                                      className={`  ${ role  === "buyer" ? "active" : ""  }`} />
                                  </div>

                                  <div className='flex gap-6 items-center'>
                                  <label className={` ${css(styles.label)} ${role === "seller" ? "text-green-400" : ""}`}
                                   htmlFor="seller">Seller:</label>
                                 <input id="seller" onChange={handleChange} type='radio' name="role"
                                  className={` ${ role === "seller" ? "active" : ""  }`} />
                                {/* <button  id="seller" name="seller" value="seller"
                                 onClick={handleChange} className={` button ${ role === "seller" ? "active" : ""  }`}>Seller</button> */}
                                 </div>
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
                                required
                                autoComplete='off'
                                placeholder='Lagos'
                                onChange={handleChange}
                                />
                                <h3 className="">
                                  {/* <RiArrowDropDownLine size="40" fill="gray" /> */}
                                  {/* xddd */}
                                </h3>
                                </div>

                          </div>
                         <div className='column input '>
                            <label className={css(styles.label)} 
                              htmlFor="phoneno">Phone No:</label>
                                <div className='  row input-container'>
                                <input
                                type='text' 
                                name='phoneNo'
                                id="phoneNo"
                                value={phoneNo}
                                required
                                autoComplete='off'
                                placeholder='+234 7******'
                                onChange={handleChange}
                                />
                                <h3 className="">
                                  {/* <RiArrowDropDownLine size="40" fill="gray" /> */}
                                  {/* xddd */}
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
                                autoComplete='off'
                                value={password}
                                placeholder='**********'
                                required
                                onChange={handleChange}
                                />
                                <h3 className="">
                                  {/* <RiArrowDropDownLine size="40" fill="gray" /> */}
                                  {/* xddd */}
                                </h3>
                                </div>

                          </div>
                          
                          <input onClick={submit} disabled={!enableSubmit} className='button' type="submit" value="Register" />
                     
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
