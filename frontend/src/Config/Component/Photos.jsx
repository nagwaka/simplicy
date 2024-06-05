import React from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import axios from 'axios'

export default function Photos({selectAsMainPhoto, removePhoto, photoLinks, handleChange, photos, addPhotoLink, uploadPhoto}) {
   
  return (
    <>
           
                <div className='flex space-x-3'>
                    <input type="text input" className=' bg-white rounded-2xl px-4 hover:bg-grey-400 hover:border-green-400'
                     name='photoLinks' id='photoLinks' value = {photoLinks} onChange={handleChange} placeholder='{Add using a link ...jpg, PNG}' />
                    <button onClick={addPhotoLink} disable className='button '>Add&nbsp;Photo</button>
                </div>

                <div className=" grid mt-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
                    {photos != null && photos.map((link, index) =>{
                    return (
                         <div className='h-32 flex relative' key={link}>
                         <img  className='rounded-2xl w-full object-cover' src={"http://localhost:3000/uploads/" + link} alt={index} />
                         {/* {link} */}
                         <button  onClick={(e)=> removePhoto(e, link)}
                          className='trash absolute cursor-pointer bottom-1 right-1 text-center bg-opacity-50 rounded-2xl bg-black p-2'>
                            trash
                         </button>
                         <button  onClick={(e)=> selectAsMainPhoto(e, link)}

                          className='trash absolute cursor-pointer bottom-1 left-1 text-center bg-opacity-50 rounded-2xl bg-black p-2'>
                            {link === photos[0] && (
                                <div>star</div>//modify
                            )}
                             {link !== photos[0] && (
                                <div>stars</div>//modify
                            )}
                         </button>
                         </div>
                    )
                                         
                    })}
                    <label  className='border b-transarent rounded-2xl p-8 w-[10rem] hover:bg-white hover:text-green-400 hover:border-green-400 cursor-pointer'>
                        <input type="file" multiple className='hidden' onChange={uploadPhoto}  />
                        <BsCloudUpload/>Upload
                    </label>

                    {/* <div>
                        <label className=' cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                            <input type="file" multiple className='hidden' onChange={uploadPhoto}  />
                            <BsCloudUpload/>Upload 
                        </label>
                    </div> */}
                </div>{/**add icon */}

                

                
                
                
        
      
    </>
  )
}
