import { css } from 'aphrodite'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styles } from '../Login.jsx/Login';
import Photos from '../Config/Component/Photos';

export default function CreateListing() {
  
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({
      name: "",
      desc: "",
      category:"",
      price:"",
      photos:[],
      photoLinks:""
 })
 const navigate = useNavigate()
 const {name, desc, category,price, photos, photoLinks} = formData

 
 const handleChange = (e) =>{
     setFormData((prev) =>({
       ...prev,
       [e.target.id] : e.target.value
     }))
   }


   const submit = (e) =>{
    e.preventDefault()//lthis
    axios.post('http://localhost:3000/api/products/newProducts', formData)
    .then(({data}) => {
      console.log(data)
      // navigate(`/api/user/${id}`)

    })
    .catch((err) => {
      console.log(err)
    })
}
  

  
useEffect (() => {
  if (name !== "" && price !== "") {
    setEnableSubmit(true);
  } else {
    if (enableSubmit !== false) {
      setEnableSubmit(false);
    }
  }
}, [name, price, enableSubmit]);


async function addPhotoLink(e) {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/api/photos/upload-by-link', {
      link: photoLinks,
    });

  //   // Assuming the server response contains the photo path
    const filePath = response.data
  //   console.log(response)

  //   Extracting just the name of the photo using string manipulation
  const fileName = filePath.split('/').pop();      
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, fileName],
      photoLinks: " ",
    }));
    

  //   console.log(formData);
  } catch (error) {
    console.error('Error adding photo link:', error);
  }
}
async function uploadPhoto(e){
  const file = e.target.files
  const data = new FormData()// check this out
  for (let i = 0; i < file.length; i++) {
      data.append('photos', file[i] )
  }
  try {
  const responses = await axios.post('http://localhost:3000/photos/uploads', data, {
      headers: {'Content-Type': 'multipart/form-data'}
  });
      
      const {data: filePath} = responses
      console.log(filePath)
      const fileName = filePath[0].split('\\').pop();      
      console.log(fileName)
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, fileName],
      }))

      console.log(photos)
   
  } catch (error) {
    console.error('Error adding photo link:', error)
  }
}

function removePhoto(e, fileName){
  e.preventDefault()
  const updatedPhotos = photos.filter((photo) => photo !== fileName);

  // Update the photos property in the state
  setFormData((prev) => ({
    ...prev,
    photos: updatedPhotos,
  }));
}
function selectAsMainPhoto(e, fileName){
  e.preventDefault()
  const addedPhotoWithoutSelected = 
  photos.filter(photo => photo !== fileName)
  const newAddedPhoto = [fileName, ...addedPhotoWithoutSelected]
  // Update the photos property in the state
  setFormData((prev) => ({
    ...prev,
    photos: newAddedPhoto,
}));
}
  return (
    <section className='section section-bg h-[100%]'>
        <div className="container">
          <div className='form m-auto pt-9 h-auto'>
            <form className='m-auto' onSubmit={submit}>  
            <h1 className="mb-6 text-center">Create New Product</h1>
                        <div className="field-container ">
                        
                          <div className='column input'>
                            <label className={css(styles.label)} 
                              htmlFor="email">Name:</label>
                                <div className='row input-container'>
                                <input
                                type='text' 
                                name='name'
                                id="name"
                                placeholder='Apple'
                                value={name}
                                autoComplete='off'
                                required
                                onChange={handleChange}
                               
                                />
                              
                                </div>

                          </div>
                          <div className='column input'>
                            <label className={css(styles.label)} 
                              htmlFor="email">Description:</label>
                                <div className='row input-container'>
                                <input
                                type='text' 
                                name='desc'
                                id="desc"
                                placeholder='Apple Desc'
                                value={desc}
                                autoComplete='off'
                                required
                                onChange={handleChange}
                               
                                />
                              
                                </div>

                          </div>
                        
                          <div className='column input'>
                            <label className={css(styles.label)} 
                              htmlFor="email">Category:</label>
                                <div className='row input-container'>
                                <input
                                type='text' 
                                name='category'
                                id="category"
                                placeholder='Fruits'
                                value={category}
                                autoComplete='off'
                                required
                                onChange={handleChange}
                               
                                />
                              
                                </div>

                          </div>
                          <div className='column input'>
                            <label className={css(styles.label)} 
                              htmlFor="email">Price:</label>
                                <div className='row input-container'>
                                <input
                                type='number' 
                                name='price'
                                id="price"
                                placeholder='40'
                                value={price}
                                autoComplete='off'
                                required
                                onChange={handleChange}
 
                                />
                              
                                </div>

                          </div>
                          <label className={`${css(styles.label)} -mb-4`} 
                              htmlFor="email">Images:</label>
                          <Photos 
                              photoLinks={photoLinks} 
                              photos={photos}
                              uploadPhoto ={uploadPhoto}
                              addPhotoLink ={addPhotoLink}
                              handleChange={handleChange}
                              removePhoto={removePhoto}
                              selectAsMainPhoto={selectAsMainPhoto}/>

                </div>

                <button className='button w-[100%] mt-4'>Add Product </button>

            </form>
        </div>
        </div>
        
      
    </section>
  )
}
