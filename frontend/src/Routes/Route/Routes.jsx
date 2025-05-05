import DashboardLayout from "@/Layout/DashboardLayout";
import Main from "@/Layout/Main";
import About from "@/pages/About/About";
import Appointment from "@/pages/Appointment/Appointment";
import Login from "@/pages/Authentication/Login";
import Blog from "@/pages/Home/Blog";
import Contact from "@/pages/Contact/Contact";
import AddDoctor from "@/pages/Dashboard/Admin/AddDoctor/AddDoctors";
import Doctors from "@/pages/Doctors/Doctors";
import Home from "@/pages/Home/Home";
import MyAppointment from "@/pages/Dashboard/User/MyAppointment/MyAppointment";
import MyProfile from "@/pages/MyProfile";
import AdminHome from "@/pages/Dashboard/Admin/AdminHome/AdminHome";
import AllUser from "@/pages/Dashboard/Admin/AllUser/AllUser";
import DoctorHome from "@/pages/Dashboard/Doctor/DoctorHome/DoctorHome";
import MyPatients from "@/pages/Dashboard/Doctor/MyPatients/MyPatients";
import SetSchedule from "@/pages/Dashboard/Doctor/SetSchedule/SetSchedule";
import Signup from "@/pages/Authentication/Signup";
import Checkout from "@/pages/Checkout/Checkout";

import ManageDoctor from "@/pages/Dashboard/Admin/ManageDoctor/ManageDoctor";
import UpdateDoctor from "@/pages/Dashboard/Admin/UpdateDoctor/UpdateDoctor";
import { createBrowserRouter } from "react-router-dom";
import Payment from "@/pages/Payments/Payment";

// Create the router instance
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />, // Main layout for the app
    children: [
      {
        path: "/",
        element: <Home />, // This will render inside the Main component
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        path: "/doctors/:specialty?",
        element: <Doctors />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/my-profile",
        element: <MyProfile />,
      },
      {
        path: "/my-appointment",
        element: <MyAppointment />,
      },
      {
        path: "/appointment/:_id",
        element: <Appointment />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/checkout/:id",
        element: <Checkout />,
      },
      {
        path: "/payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      // Admin Routes
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "admin/all-users",
        element: <AllUser />,
      },
      {
        path: "admin/manage-doctor",
        element: <ManageDoctor />,
      },
      {
        path: "admin/add-doctor",
        element: <AddDoctor />,
      },
      {
        path: "admin/update-doctor/:id",
        element: <UpdateDoctor />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/doctors/${params.id}`).then((res) =>
            res.json()
          ),
      },

      // Doctor Routes
      {
        path: "doctor",
        element: (
          <DoctorRoute>
            <DoctorHome></DoctorHome>
          </DoctorRoute>
        ),
      },
      {
        path: "doctor/my-patients",
        element: <MyPatients />,
      },
      {
        path: "doctor/set-schedule",
        element: <SetSchedule />,
      },

      // User Routes (Patient)
      {
        path: "user",
        element: <MyAppointment />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
]);
