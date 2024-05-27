import React from 'react';
import './home.css';
import pics01 from '../Assets/images/pic-person-01.jpg'
import pics02 from '../Assets/images/pic-person-01.jpg'
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
    {/* <Header signup="signup"/> */}
    <main className="section section-bg" data-section-theme="dark">
       
          <div className='container flex-col lg:flex justify-center  lg:justify-around items-center m-auto'>
            
             <div className='w-auto lg:w-[80rem] m-auto flex flex-col gap-6 lg:gap-6 lg:flex-row  h-[100vh] items-center lg:justify-around  justify-center '>
             <div className='text-center '> 
                <h1>Simplicy</h1>
              <h1>Harvesting Freshness, Connecting lives</h1>
             </div>
             <Link to={'/api/auth/signup'}>
             <button className='button'>Get Started</button>
             </Link>
             </div>
          </div>
      
    </main>
    </>
  )
}
