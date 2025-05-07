import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUserPlus,
  FaUsers,
  FaUserMd,
  FaCalendarAlt,
  FaCalendarCheck,
  FaUser,
  FaStethoscope,
  FaIdBadge,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { role } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-naviblue text-white transform transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-auto`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/20 md:hidden">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={closeSidebar} className="text-white text-2xl">
            <FaTimes />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <h2 className="text-2xl font-bold hidden md:block text-center md:text-left">
            <Link to="/" onClick={closeSidebar}>
              Dashboard
            </Link>
          </h2>

          {/* Back to Home */}
          <div className="">
            <Link
              to="/"
              onClick={closeSidebar}
              className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-white text-naviblue rounded hover:bg-gray-200 transition"
            >
              <FaHome /> Back to Home
            </Link>
          </div>

          {/* Menu Items */}
          <ul className="space-y-2 text-center md:text-left mt-4">
            {role === "admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard/admin"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaHome /> Admin Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/admin/add-doctor"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaUserPlus /> Add Doctor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/admin/all-users"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaUsers /> All Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/admin/manage-doctor"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaUserMd /> Manage Doctors
                  </Link>
                </li>
              </>
            )}

            {role === "doctor" && (
              <>
                <li>
                  <Link
                    to="/dashboard/doctor"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaHome /> Doctor Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/doctor/my-patients"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaStethoscope /> My Patients
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/doctor/set-schedule"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaCalendarAlt /> Set Schedule
                  </Link>
                </li>
              </>
            )}

            {role === "user" && (
              <>
                <li>
                  <Link
                    to="/dashboard/user"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaHome /> User Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/user/profile"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaIdBadge /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/user/my-appointments"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaCalendarCheck /> My Appointments
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/user/payment-history"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaMoneyCheckAlt /> Payment History
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile Toggle Button (only if sidebar is closed) */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 text-white bg-naviblue p-2 rounded-full md:hidden"
        >
          <FaBars />
        </button>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-gray-100 min-h-screen md:ml-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
