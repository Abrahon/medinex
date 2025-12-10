import DashboardLayout from "@/Layout/DashboardLayout";
import Main from "@/Layout/Main";
import About from "@/pages/About/About";
import Appointment from "@/pages/Appointment/Appointment";
import Login from "@/pages/Authentication/Login";
import Blog from "@/pages/Home/Blog/Blog";
import Contact from "@/pages/Contact/Contact";
import AddDoctor from "@/pages/Dashboard/Admin/AddDoctor/AddDoctors";
import Doctors from "@/pages/Doctors/Doctors";
import Home from "@/pages/Home/Home";
import MyAppointment from "@/pages/Dashboard/User/MyAppointment/MyAppointment";
import MyProfile from "@/pages/Dashboard/User/Profile/MyProfile";
import AdminHome from "@/pages/Dashboard/Admin/AdminHome/AdminHome";
import AllUser from "@/pages/Dashboard/Admin/AllUser/AllUser";
import DoctorHome from "@/pages/Dashboard/Doctor/DoctorHome/DoctorHome";
import MyPatients from "@/pages/Dashboard/Doctor/MyPatients/MyPatients";
import SetSchedule from "@/pages/Dashboard/Doctor/SetSchedule/SetSchedule";
import Signup from "@/pages/Authentication/Signup";
import Checkout from "@/pages/Checkout/Checkout";
import ManageDoctor from "@/pages/Dashboard/Admin/ManageDoctor/ManageDoctor";
import UpdateDoctor from "@/pages/Dashboard/Admin/UpdateDoctor/UpdateDoctor";
import Payment from "@/pages/Payments/Payment";
import PaymentSuccess from "@/pages/Payments/PaymentSuccess";

import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import AdminRoute from "../AdminRoute/AdminRoute";

import { createBrowserRouter } from "react-router-dom";
import PaymentHistory from "@/pages/Dashboard/User/PaymentHistory/PaymentHistory";
import BlogDetails from "@/pages/Home/Blog/BlogDetails";
import UserHome from "@/pages/Dashboard/User/UserHome/UserHome";
import PrintDetails from "@/pages/PrintDetails/PrintDetails";

// Create the router instance
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/doctors", element: <Doctors /> },
      { path: "/doctors/:specialty?", element: <Doctors /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog-details/:id", element: <BlogDetails></BlogDetails> },
      // { path: "/my-appointment", element: <MyAppointment /> },
      { path: "/appointment/:_id", element: <Appointment /> },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <Signup /> },
      { path: "/checkout/:id", element: <Checkout /> },
      { path: "/payment/:appointmentId", element: <Payment /> },
      { path: "/payment-success", element: <PaymentSuccess /> },
      {
        path: "print",
        element: <PrintDetails></PrintDetails>,
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
        element: (
          <AdminRoute>
            <AllUser />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-doctor",
        element: (
          <AdminRoute>
            <ManageDoctor />
          </AdminRoute>
        ),
      },
      {
        path: "admin/add-doctor",
        element: (
          <AdminRoute>
            <AddDoctor />
          </AdminRoute>
        ),
      },

      {
        path: "admin/update-doctor/:id",
        element: (
          <AdminRoute>
            <UpdateDoctor />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://medinex-tan.vercel.app/doctors/${params.id}`).then(
            (res) => res.json()
          ),
      },
      {
        path: "doctor",
        element: <DoctorHome></DoctorHome>,
      },
      {
        path: "doctor/my-patients",
        element: <MyPatients />,
      },
      {
        path: "doctor/set-schedule",
        element: <SetSchedule />,
      },
      { path: "user", element: <UserHome></UserHome> },
      { path: "user/profile", element: <MyProfile /> },
      {
        path: "user/payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "user/my-appointments",
        element: <MyAppointment></MyAppointment>,
      },
    ],
  },
]);
