import { css } from 'aphrodite'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { styles } from '../Login.jsx/Login';
import Photos from '../Config/Component/Photos';
import Cookies from 'js-cookie';


export default function CreateListing({userId, user}) {
  
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

  const {id} = useParams()
  console.log(id)

 const handleChange = (e) =>{

     setFormData((prev) =>({
       ...prev,
       [e.target.id] : e.target.value
     }))
   }


   const submit = async (e) =>{
    e.preventDefault()//lthis
    const token = Cookies.get("token")
    console.log(token)

    if (!token) {
      console.error('user not authorized');
      return;
    }
    if (id) {
      await axios.put(`http://localhost:3000/api/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
         .then(res => {
              console.log(res)
              navigate(`/api/user/${userId}`)
        })
        .catch((err) => {
          console.log(err)
        })

      } else {
        await axios.post(`http://localhost:3000/api/products/newProduct`, formData,  {
          headers: {
            Authorization: `Bearer ${token}`
          }
          })
            .then(({data}) => {
              console.log(data)
              navigate(`/api/user/${id}`)
        
            })
            .catch((err) => {
              console.log(err)
            })

      }
    
}
  

  
useEffect (() => {
  if (name !== "" && price !== "") {
    setEnableSubmit(true);
  } else {
    if (enableSubmit !== false) {
      setEnableSubmit(false);
    }
  }
  if (id){
    console.log(id)
 
  axios.get(`http://localhost:3000/api/products/${id}`).then(response => {
    const{data} = response
    
    console.log(response)
    setFormData((prev) => ({
      ...prev,
      name: data.name,
      description: data.description,
      images: [...prev.images, data.images],
      // photoLinks: [...prev.photoLinks, data.photoLinks],
      category: data.category,
      price: data.price,
      stock:data.stock,
    }))
  })
  .catch(error => {
    console.log(error.message || 'An error occurred');
  })
  // .finally(() => {
  //   setIsLoading(false);
  // });
}

 

}, [name, price, enableSubmit, id]);


async function addPhotoLink(e) {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:3000/api/photos/upload-by-link', {
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
  const responses = await axios.post('http://localhost:3000/api/photos/uploads', data, {
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
    images: newAddedPhoto,
}));
}
  return (
    <section className='section section-bg h-[100%]'>
        <div className="container">
          <div className='form m-auto pt-9 h-auto'>
            <form className='m-auto' onSubmit={submit}>  
            <h1 className="mb-6 text-center">{id ? "Update Product" : "Create New Product"}</h1>
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

                <button className='button w-[100%] mt-4'>{id && id ? "Update Product" : "Add Product"} </button>

            </form>
        </div>
        </div>
        
      
    </section>
  )
}
