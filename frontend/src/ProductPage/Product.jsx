import React, { useState, useEffect, useContext } from 'react'
import { resolvePath, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaShare, FaMapMarkerAlt, FaBed } from 'react-icons/fa';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';
import Contact from '../Config/Component/Contact';
import { MdOutlineShoppingBag } from "react-icons/md";
import { UserContext } from '../Config/UserContext';


export default function Product() {
  const {id} = useParams();
  
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shareLinkCopy, setShareLinkCopy] = useState(false);
  const [contactLandLord, setContactLandLord] = useState(false);
  const {AuthUser} = useContext(UserContext)
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  const [ products, setProducts ] = useState([])

  useEffect(() => {
    setLoading(true)
    async function fetchListing() {
        axios.get(`http://localhost:3000/api/products/${id}`).then(response => {
            setProducts(response.data)
            console.log(response.data)
        }).catch((err) =>{
            console.log(err)

        })
    }
         fetchListing()
         console.log(products)
      }, [id]);

  const position = [51.505, -0.09]


  return (
    // <></>
    <section className='section section-bg text-white'>
      <div className='container'>
        {products && products && (
          <Swiper
            slidesPerView={1}
            navigation
            pagination={{ type: 'progressbar' }}
            effect="fade"
            modules={[EffectFade]}
            // autoplay={{ delay: 3000 }}
          >
            {products.images && products.images.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className=' w-full overflow-hidden bg-red-500 z-10000  h-[300px]' 
                  style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover',zIndex:"1000000" }}>
                <img  className='rounded-2xl w-full h-[100%] object-cover' src={`http://localhost:3000/uploads/${url}`} alt={index} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="fixed top-[13%] right-[12%] lg:right-[18%] z-10 bg-white cursor-pointer border-2 border-grey-400 rounded-full w-12 h-12 flex justify-center items-center " onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopy(true);
          setTimeout(() => {
            setShareLinkCopy(false);
          }, 2000);
        }}>
          <FaShare className='text-lg text-slate-500' />
        </div>

        {shareLinkCopy && (
          <p className='fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md z-10'>
            Link Copied
          </p>
        )}

        {products && (
          <div className='gap-10 text-white mt-6 flex-col md:flex-row max-w-6xl lg:mx-auto m-4 p-4 rounded-lg shadow-lg  space-y-5 lg:space-x-5 '>
            <div className='h-auto lg:w-[100%]  '>
              <p className='text-2xl font-bold lg:text-xl text-white mb-3 '>
               
                {products.name}
              </p>
              
              <div className='flex justify-start items-center space-x-4 w-[75%]'>
                <p className='bg-red-800 text-2xl lg:text-base w-full md:text-base mx-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md '>
                  {products.category }
                </p>
               
              </div>
              <p className='mt-3 mb-3'>
                <span className='font-semibold'>  Description </span>
                -  {products.description}
              </p>
              <ul className='flex items-center sm:space-x-10 md:space-x-3 text-sm font-semibold'>
                <li className='font-semibold text-2xl flex items-center whitespace-nowrap '>
                  <MdOutlineShoppingBag size={"20px"} className='text-lg mr-1' />
                  {+products.stock < 0 ? `0 Stocks` : `${products.stock} Stock`}

                </li>
                {
                  AuthUser.user !== null ? (
                        <li className='font-semibold text-2xl flex items-center whitespace-nowrap '>
                      <FaMapMarkerAlt size={"20px"} className='text-lg mr-1' />
                      {  +products.stock < 0 ? "" : AuthUser.user.region }

                    </li>
                  ): ""
                }
                
              </ul>

              <div className='flex mt-2 flex-col text-sm lg:text-lg space-y-4'>
                {(products.seller || contactLandLord === true) && (
                     <div className='mt-2'>
                        <Contact sellerId={products.seller}/>
                     </div>
                 
                )}
                {!contactLandLord  && 
                <button 
                 onClick={() => setContactLandLord(true)}
                className ='bg-blue-600 rounded-md p-4 text-white font-semibold hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 transition duration-150 ease-in-out'>
                    Contact Seller
                </button>
                }
                
              </div>
            </div>

            <div className='w-full h-[200px] lg:h-[400px] z-10 overflow-x-hidden '>
            {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false}
            style={{height: "100%", width: "100%"}}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
            </MapContainer> */}
           
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


