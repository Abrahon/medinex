import DashboardLayout from '@/Layout/DashboardLayout';
import Main from '@/Layout/Main';
import About from '@/pages/About/About';
import Appointment from '@/pages/Appointment/Appointment';
import Login from '@/pages/Authentication/Login';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact/Contact';
import AddDoctor from '@/pages/Dashboard/Admin/AddDoctor/AddDoctors';
import Doctors from '@/pages/Doctors/Doctors';
import Home from '@/pages/Home/Home';
import MyAppointment from '@/pages/Dashboard/User/MyAppointment/MyAppointment';
import MyProfile from '@/pages/MyProfile';


import { createBrowserRouter } from 'react-router-dom';
import AdminHome from '@/pages/Dashboard/Admin/AdminHome/AdminHome';
import AllUser from '@/pages/Dashboard/Admin/AllUser/AllUser';
import AllDoctor from '@/pages/Dashboard/Admin/AllDoctor/AllDoctor';
import DoctorHome from '@/pages/Dashboard/Doctor/DoctorHome/DoctorHome';
import MyPatients from '@/pages/Dashboard/Doctor/MyPatients/MyPatients';
import SetSchedule from '@/pages/Dashboard/Doctor/SetSchedule/SetSchedule';
import Signup from '@/pages/Authentication/Signup';
import Checkout from '@/pages/Checkout/Checkout';

// Create the router instance
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />, // Main layout for the app
        children: [ // Define child routes here
            {
                path: '/',
                element: <Home/>, // This will render inside the Main component
            },
            {
                path:'/about',
                element:<About/>
            },
            {
                path:'/contact',
                element:<Contact/>
            },
            {
                path:'/doctors',
                element:<Doctors/>
            },
            {
                path:'/doctors/:specialty?',
                element:<Doctors/>
            },
            {
                path:'/blog',
                element:<Blog/>
            },
            {
                path:'/my-profile',
                element:<MyProfile/>
            },
            {
                path:'/my-appointment',
                element:<MyAppointment/>
            },
            {
                path:'/appoinment/:_id',
                element:<Appointment/>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/sign-up',
                element:<Signup></Signup>
            },
            {
                path:'/checkout/:id',
                element:<Checkout></Checkout>
            },
            {
                path:'/payment/:id'
            }
            // {
            //     path:'/add-doctor',
            //     element:<AddDoctor></AddDoctor>
            // },
            
        ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // Admin Routes
        { path: 'admin', element: <AdminHome /> },
        { path: 'admin/all-users', element: <AllUser/> },
        { path: 'admin/all-doctors', element: <AllDoctor />},
        { path: 'admin/add-doctor', element: <AddDoctor /> },
  
        // Doctor Routes
        { path: 'doctor', element: <DoctorHome /> },
        { path: 'doctor/my-patients', element: <MyPatients /> },
        { path: 'doctor/set-schedule', element: <SetSchedule /> },
  
        // User Routes (Patient)
        { path: 'user', element: <MyAppointment />},
      ]
    }
  ]);