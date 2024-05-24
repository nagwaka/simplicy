import { css } from 'aphrodite'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { styles } from '../Login.jsx/Login';
import Photos from '../Config/Component/Photos';
import Cookies from 'js-cookie';


export default function CreateListing() {
  
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [role, setrole] = useState("");
  const [formData, setFormData] = useState({
      name: "",
      description: "",
      category:"",
      price:"",
      images:[],
      stock:"",
      photoLinks:""
 })
 const navigate = useNavigate()
 const {name, description, category,price, stock, images, photoLinks} = formData



 const handleChange = (e) =>{
     setFormData((prev) =>({
       ...prev,
       [e.target.id] : e.target.value
     }))
   }


   const submit = (e) =>{
    e.preventDefault()//lthis
    axios.post('http://localhost:3000/api/products/newProduct', formData)
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
        images: [...prev.images, fileName],
      }))

      console.log(images)
   
  } catch (error) {
    console.error('Error adding photo link:', error)
  }
}

function removePhoto(e, fileName){
  e.preventDefault()
  const updatedPhotos = images.filter((photo) => photo !== fileName);

  // Update the photos property in the state
  setFormData((prev) => ({
    ...prev,
    images: updatedPhotos,
  }));
}
function selectAsMainPhoto(e, fileName){
  e.preventDefault()
  const addedPhotoWithoutSelected = 
  images.filter(photo => photo !== fileName)
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
                              htmlFor="description">Description:</label>
                                <div className='row input-container'>
                                <input
                                type='text' 
                                name='description'
                                id="description"
                                placeholder='Apple Desc'
                                value={description}
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
                          <div className='flex gap-8'>
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

                             <div className='column input'>
                            <label className={css(styles.label)} 
                              htmlFor="email">Stock:</label>
                                <div className='row input-container'>
                                <input
                                type='number' 
                                name='stock'
                                id="stock"
                                placeholder='40'
                                value={stock}
                                autoComplete='off'
                                required
                                onChange={handleChange}
 
                                />
                              
                                </div>

                          </div>
                          </div>
                          <label className={`${css(styles.label)} -mb-4`} 
                              htmlFor="email">Images:</label>
                          <Photos 
                              photoLinks={photoLinks} 
                              photos={images}
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
