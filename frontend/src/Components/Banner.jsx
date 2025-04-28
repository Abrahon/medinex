import { assets } from '@/assets/assets/assets_frontend/assets'
import React from 'react'
import { useNavigate } from 'react-router'

const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className='flex bg-naviblue px-6 sm:px-10 md:px-14 my-20 lg:px-12   '>
      {/* left side */}
     <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
      <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-semibold'>
      <h1>Book Appointment </h1>
      <h1 className='mt-4'>With 100+ Trusted Doctors </h1>
      </div>
      <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-black rounded-full px-4 py-2 mt-6'>Create account</button>
     </div>
     {/* right side */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img  className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default Banner