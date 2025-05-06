import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import {
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

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="bg-blue-700 text-white w-full md:w-64 p-4 space-y-6">
        <h2 className="text-2xl font-bold text-center md:text-left">
          <Link to="/">Dashboard</Link>
        </h2>

        <ul className="space-y-2 text-center md:text-left">
          {/* Admin Menu */}
          {role === "admin" && (
            <>
              <li>
                <Link
                  to="/dashboard/admin"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaHome /> Admin Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admin/add-doctor"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaUserPlus /> Add Doctor
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admin/all-users"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaUsers /> All Users
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admin/manage-doctor"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaUserMd /> Manage Doctors
                </Link>
              </li>
            </>
          )}

          {/* Doctor Menu */}
          {role === "doctor" && (
            <>
              <li>
                <Link
                  to="/dashboard/doctor"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaHome /> Doctor Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/doctor/my-patients"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaStethoscope /> My Patients
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/doctor/set-schedule"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaCalendarAlt /> Set Schedule
                </Link>
              </li>
            </>
          )}

          {/* User Menu */}
          {role === "user" && (
            <>
              <li>
                <Link
                  to="/dashboard/user"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaHome /> User Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/user/profile"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaIdBadge /> Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/user/my-appointments"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaCalendarCheck /> My Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/user/payment-history"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaMoneyCheckAlt /> Payment History
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-gray-100 min-h-[calc(100vh-4rem)]">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
