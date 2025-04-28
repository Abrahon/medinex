import { assets } from '@/assets/assets/assets_frontend/assets';
import RelatedDoctors from '@/Components/RelatedDoctors';
import { AppContext } from '@/context/AppProvider';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Appointment = () => {
  const { _id } = useParams();
  const { doctors } = useContext(AppContext);

  const daysOfWeeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  // Fetch doctor info based on _id
  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === _id);
    setDocInfo(docInfo);
  };

  // Generate available time slots for the next 7 days
  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    const slots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, _id]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* Doctor Info Section */}
        <div className='flex flex-col sm:flex-row gap-6 my-10'>
          <div className='bg-naviblue rounded-lg'>
            <img className='' src={docInfo.image} alt="" />
          </div>
          <div className='border-2 p-4 rounded-lg w-full'>
            <p className='flex text-3xl font-semibold'>
              {docInfo.name}
              <img src={assets.verified_icon} alt="" />
            </p>
            <p className='font-semibold text-lg'>
              {docInfo.degree} - {docInfo.speciality}
              <span className='ml-2'>{docInfo.experience}</span>
            </p>
            <p className='font-bold mt-4'>About</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse a harum magnam architecto optio, neque excepturi cupiditate aperiam ullam autem asperiores ut. Dolores, nam eligendi incidunt recusandae tempora beatae veniam.
            </p>
            <p className='font-bold mt-6'>
              Appointment fee: <span>${docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* Booking Slot Section */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking Slots</p>

          {/* Day Selector */}
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  className={`text-center py-6 min-w-16 cursor-pointer rounded-full border-2 ${
                    slotIndex === index ? 'bg-naviblue text-white' : 'border-gray-200'
                  }`}
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime('');
                  }}
                >
                  <p>{item[0] && daysOfWeeks[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* Time Slots for Selected Day */}
          <div className='flex gap-3 flex-wrap my-10'>
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.map((slot, i) => (
                <div
                  key={i}
                  className={`text-center py-2 px-4 cursor-pointer rounded-full border-2 ${
                    slotTime === slot.time ? 'bg-primary text-white' : 'border-gray-200'
                  }`}
                  onClick={() => setSlotTime(slot.time)}
                >
                  <p>{slot.time.toLowerCase()}</p>
                </div>
              ))}
          </div>

          <button className='bg-naviblue px-12 py-4 text-white rounded-full my-6'>
            Book An Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={_id} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
