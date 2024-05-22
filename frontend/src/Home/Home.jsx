import React from 'react';
import './home.css';
import pics01 from '../Assets/images/pic-person-01.jpg'
import pics02 from '../Assets/images/pic-person-01.jpg'
import Header from '../Header/Header';

export default function Home() {
  return (
    <>
    {/* <Header signup="signup"/> */}
    <main>

        <section class="" data-section-theme="dark">
       
          <div className='container'>
            <div class="text-black flex justify-between w-[25%]">

                <button className='h-auto relative  buyer-1 buyer-seller w-[100%] p-[3rem]'>Buyer</button>
                <button className='h-auto relative buyer-seller w-[100%] p-[3rem]'>Seller</button>


             </div>
             <h1 className='text-black font-bold text-[1.6rem] lg:text-4xl text-center lg:px-20 px-0 lg:text-start mt-8 '>Harvesting Freshness, Connecting lives</h1>
          </div>
          

        </section>
        <section className='section-hero h-auto'>
        <div class="  hero-homepage ">
          <div class="section-body ">
            <section class="section-inner ">
              <h2 class="section-title text-white">Connecting Freshness to the globe</h2>
              <a href="#" class="button">Get Started</a>
            </section>
          </div>
        </div>

        </section>
        <section class="text-black">
       
        <div class="container  mt-8">
          <header class="section-header ">
            <h2 class="section-title">About Us</h2>
            <p class="section-tagline">Everything about us</p>
          </header>
        <div class="section-body flex  text-black">
           <div class="row">
              <div class="col-1-2">
                <h3>Who are we</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, omnis expedita! Eum, praesentium cumque accusantium rem, sit quaerat est nisi ratione, deserunt ducimus quidem iste dicta quibusdam atque maxime cum!</p>
                <h3>Our culture</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, omnis expedita! Eum, praesentium cumque accusantium rem, sit quaerat est nisi ratione, deserunt ducimus quidem iste dicta quibusdam atque maxime cum!</p>
                <h3>How we work</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, omnis expedita! Eum, praesentium cumque accusantium rem, sit quaerat est nisi ratione, deserunt ducimus quidem iste dicta quibusdam atque maxime cum!</p>
              </div>
             
              <div class="col-1-2 text-black">
                
                <img src={pics01} alt="" className='custom-border' width="1000" height="auto"/>
                {/* <img 
                sizes="(max-width: 3000px) 40vw, 1200px"
                srcset="
                pic-about-01_f6tsih_c_scale,w_380.jpg 380w,
                pic-about-01_f6tsih_c_scale,w_665.jpg 665w,
                pic-about-01_f6tsih_c_scale,w_905.jpg 905w,
                pic-about-01_f6tsih_c_scale,w_1127.jpg 1127w,
                pic-about-01_f6tsih_c_scale,w_1200.jpg 1200w"
                src="pic-about-01_f6tsih_c_scale,w_1200.jpg"
                alt=""/> */}
              </div>
            </div>
          </div>
        </div>
         </section>

        
        


        


         

      
    </main>
    </>
  )
}
