
import { assets } from '@/assets/assets/assets_frontend/assets'
import React from 'react'

const Header = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 my-16 bg-naviblue px-6 lg:px-20 pt-10'>

      {/* left side */}
      <div className='text-white'>
        <p className='text-4xl font-semibold'>Book Appointment 
        With Trusted Doctors</p>
        <div className='flex items-center gap-2 my-4'>
          <img className='w-20 h-8' src={assets.group_profiles} alt="" />
          <p>Simply browse through our extensive list of trusted doctors, 
          schedule your appointment hassle-free</p>
        </div>
        <button className='bg-white text-black px-4 py-2 rounded-full mt-4 m-auto md:m-0 hover:scale-105 transition-all duration-300'>Book Appointment</button>
      </div>

      {/* right side */}
      <div className=''>
        <img className='' src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header