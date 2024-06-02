import { css } from 'aphrodite';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { styles } from '../Login.jsx/Login';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { toast } from 'react-toastify';


export default function Profile({id, login}) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(null);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        email:"",
        fullName:"",
        region:"",
        phoneNo:""
    })

    const navigate = useNavigate()

    const {email, fullName, region, phoneNo} = formData
  
     
     const handleChange = (e) =>{
         setFormData((prev) =>({
           ...prev,
           [e.target.id] : e.target.value
         }))
       }
    
       const handleEdit = (e) =>{
        e.preventDefault()
        setEdit(p => !p)
        console.log(edit)
       }

    useEffect(() => {
        async function getProfile(){
            axios.get(`http://localhost:3000/api/users/${id}`)
            .then((response) => {
                console.log(response)
                const {data} = response
                setProfile(response.data)
                setFormData((prev) => ({
                    ...prev,
                    fullName: data.fullName,
                    email: data.email,
                    region: data.region,
                    phoneNo: data.phoneNo


                }))
            }).catch((err)=> {
                console.log(err)
            })
        }
        getProfile();

        
    }, []);

    const submit = (e) =>{
        e.preventDefault()//lthis
        setLoading(true)
        axios.put(`http://localhost:3000/api/users/${id}`, formData)
        .then(({data}) => {
          console.log(data)
          login(data.user)
          toast.success("profile Update")
          navigate(`/api/user/${id}`)
          setLoading(false)
  
        })
        .catch((err) => {
          console.log(err)
          toast.error("profile not Updated")
          setLoading(false)
        })
    }
  return (
    <div className='section section-bg'>
        <div className="container mx-auto">
      
              <div className="form mx-auto pt-10">
                <form   className={'mx-auto pt-10'}>
                  
                      <h1 className="mb-6 text-center">{profile && profile.fullName}'s profile!!!</h1>
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
                                disabled={edit}
                                onChange={handleChange}

                               
                                />
                                  <MdEdit onClick={handleEdit} size="20" fill="green" />
                              
                                </div>

                          </div>
                          <div className='column input '>
                            <label className={css(styles.label)} 
                              htmlFor="FullName">FullName:</label>
                                <div className='  row input-container'>
                                <input
                                type='text' 
                                name='fullName'
                                id="fullName"
                                placeholder='John Doe'
                                value={fullName}
                                autoComplete='off'
                                required
                                disabled={edit}
                                onChange={handleChange}
                                />
                               
                                  <MdEdit onClick={handleEdit}  size="20" fill="green" />
                                </div>

                          </div>
                          <div className='column input '>
                            <label className={css(styles.label)} 
                              htmlFor="FullName">Region:</label>
                                <div className='  row input-container '>
                                <input
                                type='text' 
                                name='region'
                                id="region"
                                placeholder='USA'
                                value={region}
                                autoComplete='off'
                                required
                                disabled={edit}
                                onChange={handleChange}
                                />
                                  <MdEdit onClick={handleEdit}  size="20" fill="green" />
                                </div>

                          </div>
                          <div className='column input '>
                            <label className={css(styles.label)} 
                              htmlFor="PhoneNo">Phone No:</label>
                                <div className='  row input-container '>
                                <input
                                type='text' 
                                name='phoneNo'
                                id="phoneNo"
                                placeholder='+237 7*******'
                                value={phoneNo}
                                autoComplete='off'
                                required
                                disabled={edit}
                                onChange={handleChange}
                                />
                                  <MdEdit onClick={handleEdit}  size="20" fill="green" />
                                </div>

                          </div>
                          <button className='button lg:hidden' onClick={handleEdit}>{edit === true ? "Disable Mode" : "Edit Mode"}</button>

                          <input onSubmit ={submit} className={`button ${ edit === true ? "bg-green text-white" : "button"}`}disabled={!edit}  type="submit" value="Update profile" />

                                              
                      </div>
                </form>
              </div>

        </div>
      
    </div>
  )
}
