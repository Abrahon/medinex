import { specialityData } from '@/assets/assets/assets_frontend/assets'
import React from 'react'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 my-16'>
        <h1 className='text-3xl my-4'>Find by Speciality</h1>
        <p className='md:w-1/3 text-center sm:w-full'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div className='flex justify-center items-center gap-4 my-6'>
        {
            specialityData.map((item,index)=>(
                <Link className='' key={index} to={`/doctors/${item.speciality}`}>
                    <img className='w-16 sm:w-24 hover:translate-y-[-10px] transition-all duration-400' src={item.image} alt="" />
                    <p className='text-xs text-center mt-4'>{item.speciality}</p>
                </Link>
                

            ))
        }
        </div>
    </div>
  )
}

export default SpecialityMenu