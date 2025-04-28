import { assets } from '@/assets/assets/assets_frontend/assets';
import React, { useState } from 'react';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(true);
  const [userData, setUserData] = useState({
    name: "Edword Vincent",
    image: assets.profile_pic,
    email: "mdabrahon926@gmail.com",
    phone: "01710670341",
    address: {
      line1: "Dhaka, Bangladesh",
      line2: "Rangpur, Sador",
    },
    gender: "Male",
    dob: "28.5.2002"
  });

  return (
    <div>
      <img src={userData.image} alt="Profile" />
      
      {
        isEdit ?
          <input className='text-xl font-semibold mt-2'
            type="text"
            value={userData.name}
            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
          />
          : <p >{userData.name}</p>
      }
      <hr className='bg-zink h-[1px] border-none' />
      <div>
        <p className='text-lg font-semibold'>Contact Information</p>
        <div className='grid grid-cols-[1fr_5fr] gap-y-2.5 mt-3 text-neutral-700'>
          
          <p className=''> Email:</p>
          <p>{userData.email}</p>
          <p className=''>Phone:</p>
          {
            isEdit ?
              <input
                type="text"
                value={userData.phone}
                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
             />
              : <p>{userData.phone}</p>
          }

          {/* <hr /> */}
          <p className=''>Address : </p>
          {
            isEdit ? (
              <p>
                <input onChange={(e)=>setUserData(prev=>({...prev,address: {...prev.address, line1:e.target.value}}))} value={userData.address.line1} type="text" />
                <br />
                <input onChange={(e)=>setUserData(prev=>({...prev,address: {...prev.address, line2:e.target.value}}))} value={userData.address.line2} type="text" />
              </p>
            ) : (
              <p>{userData.address.line1},{userData.address.line2}</p>
              // <p>{userData.address.line1}, {userData.address.line2}</p>
            )
          }
        </div>
        <p className='text-lg font-semibold mt-6'>Basic Information</p>
        <hr />
       {/* <div > */}
       <div className='grid grid-cols-[1fr_5fr] mt-3' >
          <p>Gender:</p>
          {
            isEdit?
            <select className='max-w-28' onChange={(e)=>setUserData(prev=>({...prev,gender:e.target.value}))} value={userData.gender}>
              <option value="not selected">Not Selected</option>
              <option value="male">Male</option>
              <option value="famle">Famale</option>
            </select>
            :<p>{userData.gender}</p>
          }
        </div>
        <div className='grid grid-cols-[1fr_5fr] mt-3'>
          <p>Birthday</p>
          {
            isEdit?
            <input className='max-w-28' type="date" onChange={(e)=>setUserData(prev=>({...prev, dob:e.target.value}))} value={userData.dob} />
            :<p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
       {/* </div> */}
      </div>
      <button className='bg-naviblue px-4 py-1 text-white rounded-full my-6' onClick={() => setIsEdit(!isEdit)}>
        {isEdit ? 'Save Information' : 'Edit'}
      </button>
    </div>
  );
}

export default MyProfile;
