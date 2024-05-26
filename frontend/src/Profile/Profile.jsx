import { css } from 'aphrodite';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { styles } from '../Login.jsx/Login';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";


export default function Profile({id, login}) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(null);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        email:"",
        fullName:"",
        region:""
    })

    const navigate = useNavigate()

    const {email, fullName, region} = formData
  
     
     const handleChange = (e) =>{
         setFormData((prev) =>({
           ...prev,
           [e.target.id] : e.target.value
         }))
       }
    
       const handleEdit = () =>{
        setEdit(true)
        console.log("edit")
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
                    region: data.region


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
        axios.post('http://localhost:3000/api/auth/login', formData)
        .then(({data}) => {
          console.log(data)
          login(data.user)
          const id = data.user._id;
          console.log(id)
          navigate(`/api/index`)
          setLoading(false)
  
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    }
  return (
    <div className='section section-bg'>
        <div className="container mx-auto">
      
              <div className="form mx-auto">
                <form   className={'mx-auto'}>
                  
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
                                <h3 className="">
                                  <MdEdit size="20" fill="green" />
                                </h3>
                              
                                </div>

                          </div>
                          <div className='column input '>
                            <label className={css(styles.label)} 
                              htmlFor="FullName">FullName:</label>
                                <div className='  row input-container'>
                                <input
                                type='text' 
                                name='fullName'
                                id="FullName"
                                placeholder='John Doe'
                                value={fullName}
                                autoComplete='off'
                                required
                                disabled={edit}
                                onChange={handleChange}
                                />
                                <h3 className="">
                                  <MdEdit size="20" fill="green" />kk
                                </h3>
                                </div>

                          </div>
                          <div className='column input '>
                            <label className={css(styles.label)} 
                              htmlFor="FullName">Region:</label>
                                <div className='  row input-container'>
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
                                <h3 className="">
                                  <MdEdit size="20" fill="green" />
                                </h3>
                                </div>

                          </div>
                          <input onSubmit ={submit} className='button'disabled={!edit}  type="submit" value="Update profile" />

                                              
                      </div>
                </form>
              </div>

        </div>
      
    </div>
  )
}
