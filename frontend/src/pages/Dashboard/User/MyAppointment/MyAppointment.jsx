import { AppContext } from '@/context/AppProvider'
import { AuthContext } from '@/context/AuthProvider'
import React, { useContext, useEffect, useState } from 'react'

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const userEmail = user?.email;
  console.log(userEmail);

  useEffect(() => {
    if (!userEmail) return;
      fetch(`http://localhost:5000/bookings?email=${userEmail}`)
        .then(res => res.json())
        .then((data) => {
          console.log("Fetched bookings:", data);
          setBookings(data);
        })
        .catch(err => console.error("Error fetching bookings:", err));
    
  }, [userEmail]);

  return (
    <div className='my-10'>
      <h1 className='text-2xl font-bold mb-4'>My Appointments</h1>
      <hr className='mb-6' />

      {bookings.length === 0 ? (
        <p className='text-gray-500'>No appointments booked yet.</p>
      ) : (
        bookings.map((item, index) => (
          <div key={index} className='mb-6'>
            <div className='flex justify-between items-start'>
              <div className='flex items-center gap-4'>
                <img className='w-32 h-32 object-cover rounded bg-naviblue' src={item.img} alt={item.doctorName} />
                <div>
                  <p className='font-semibold text-lg'>{item.doctorName}</p>
                  <p className='text-sm text-gray-600'>{item.specialty}</p>
                  <p className='text-sm mt-2 font-medium'>Date & Time:</p>
                  <p className='text-sm text-gray-700'>{item.appointmentTime}</p>
                  <p className='text-sm font-medium mt-1'>Status: <span className='text-blue-600'>{item.status}</span></p>
                </div>
              </div>

              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-naviblue hover:text-white transition-all duration-300'>
                  Pay Online
                </button>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300'>
                  Cancel Appointment
                </button>
              </div>
            </div>
            <hr className='mt-4' />
          </div>
        ))
      )}
    </div>
  );
}

export default MyAppointment;
