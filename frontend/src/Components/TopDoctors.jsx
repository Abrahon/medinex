// import { doctors } from '@/assets/assets/assets_frontend/assets'
import { AppContext } from '@/context/AppProvider'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const TopDoctors = () => {
  const{doctors} = useContext(AppContext)
    const navigate = useNavigate()
  return (
    <div className='my-10'>
        <div className='text-center mb-6 '>
        <h1 className='text-3xl mb-2'>Top Doctors to Book</h1>
        <p className='text-xs'>Simply browse through our extensive list of trusted doctors.</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6  '>
            {
                doctors.slice(0,10).map((item, index)=>(
                   <div onClick={()=>navigate(`/appoinment/${item._id}`)} className='border-2 rounded-lg'>
                     <div key={index} to=''>
                        <img className='bg-stone-200' src={item.image} alt="" />
                        <div className='px-2 pb-3'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500 my-2'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Availabile</p>
                        </div>
                        <p className='text-lg'>{item.name}</p>
                        <p className='text-xs'>{item.speciality}</p>

                        </div>
                        
                    </div>
                   </div>
                ))
            }
        </div>
        <div className='text-center my-10'>
        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-naviblue px-4 py-2 rounded-full text-white'>See More</button>
        </div>
    </div>
  )
}

export default TopDoctors