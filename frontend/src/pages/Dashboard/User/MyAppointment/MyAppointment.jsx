import { AppContext } from '@/context/AppProvider'
import React, { useContext } from 'react'

const MyAppointment = () => {
  const {doctors} = useContext(AppContext)
  return (
    <div className='my-10'>
      <h1 className='my-2'>MyAppointment</h1>
      <hr className='mb-2' />
      <div>
        {
          doctors.slice(0,2).map((item,index)=>(
            <div key={index}>
             <div className='flex justify-between'>
             <div className='flex items-center gap-4'>
                <img className='w-32 bg-naviblue' src={item.image} alt="" />
                <div>
                  <p className='font-semibold'>{item.name}</p>
                  <p className='text-sm'>{item.speciality}</p>
                  <p className='font-semibold text-sm'>Address:</p>
                  <p className='text-xs'>{item.address.line1}</p>
                  <p className='text-xs'>{item.address.line2}</p>
                  <p><span className='text-sm font-semibold'>Date & Time: </span> 20 November 2024</p>
                  
                </div>
              </div>
              <div className='flex flex-col gap-2 justify-end'>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-naviblue hover:text-white transition-all duration-300'>Pay Online</button>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>
              
              </div>
             </div>
              <hr className='my-4'/>
            </div>

          ))
        }
      </div>

    </div>
  )
}

export default MyAppointment