import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

function ForbiddenAccess() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate('/user/login');
    },5000)
  })
  return (
    <section className='bg-raisin-black w-screen h-screen flex flex-col items-center justify-center'>
        <section className='flex items-center gap-2 mb-5'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-[36px] fill-azure'>
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
            </svg>
            <p className='font-lato text-white-smoke text-content-lrg font-medium'> Oops! You reached a deadend. Redirecting you to your designated login.</p>
        </section>
        <h5 className='font-instrument-sans text-white-smoke uppercase font-black text-headline-sm md:text-headline-lrg lg:text-headline-xtralrg'>Error 403: Forbidden Access</h5>
    </section>
  )
}

export default ForbiddenAccess