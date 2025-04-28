import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
// import { createContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import { stringify } from 'postcss';
import Swal from 'sweetalert2';
// import { motion } from 'framer-motion';


const Signup = () => {
  const{createUser, updateUserProfile} = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(user)
 

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const form = event.target;
    const name = form.name.value;
    const image = form.image.value; // not photoURL
    const email = form.email.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;
  
    const newValue = { name, image, email, newPassword, confirmPassword };
  
    console.log("signup information", newValue);
  
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    createUser(email, newPassword)
      .then((result) => {
        console.log(result.user);
        const newUser = {name,email,image}
        
        // Save user to your backend
        fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
          if(data.insertedId){
            form.reset();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User created successfully',
                showConfirmButton: false,
                timer: 1500
              })
              navigate('/')
        }

        })
        .catch(error => {
          console.error('Error saving user to database:', error);
        });
  
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        alert(error.message);
      });
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              // value={name}
              name="name" 
              
              required
            />
          </motion.div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <label className="block text-gray-600 mb-1">Image Link</label>
            <input
              type="text"
              placeholder="Paste your profile image URL"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              name='image'
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email" placeholder='Enter your Email'
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none "
              // value={email}
              name="email" 
              
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password" placeholder='Enter your Email'
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              // value={password}
              
              name='newPassword'
              
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              // value={confirmPassword}
              name='confirmPassword'
              
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
          >
            Sign Up
          </motion.button>
          <p className='text-sm'>You have already account <span className='underline text-red-600 cursor-pointer'><Link to='/login'>Login </Link> </span></p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
