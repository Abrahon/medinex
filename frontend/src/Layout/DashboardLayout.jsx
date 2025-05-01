import { Link, Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';

const DashboardLayout = () => {
  const currentUser = { role: 'admin' }; // For demo, normally you'd get this from context
  // const [admin, setAdmin] = useState(true);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      {/* Sidebar */}
      <div className="bg-blue-700 text-white w-full md:w-64 p-4 space-y-6">
        <h2 className="text-2xl font-bold text-center md:text-left">Dashboard</h2>

        <ul className="space-y-2 text-center md:text-left">
          {/* Admin Menu */}
          {currentUser?.role === 'admin' && (
            <>
              <li><Link to="/dashboard/admin" className="block hover:underline">Admin Home</Link></li>
              <li><Link to="/dashboard/admin/add-doctor" className="block hover:underline">Add Doctor</Link></li>
              <li><Link to="/dashboard/admin/all-users" className="block hover:underline">All Users</Link></li>
              <li><Link to="/dashboard/admin/manage-doctor" className="block hover:underline">Manage Doctors</Link></li>
            </>
          )}
          
          {/* Doctor Menu */}
          {currentUser?.role === 'doctor' && (
            <>
              <li><Link to="/dashboard/doctor" className="block hover:underline">Doctor Home</Link></li>
              <li><Link to="/dashboard/doctor/my-patients" className="block hover:underline">My Patients</Link></li>
              <li><Link to="/dashboard/doctor/set-schedule" className="block hover:underline">Set Schedule</Link></li>
            </>
          )}
          
          {/* Patient/User Menu */}
          {currentUser?.role === 'user' && (
            <>
              <li><Link to="/dashboard/user" className="block hover:underline">User Home</Link></li>
              <li><Link to="/dashboard/user/my-appointments" className="block hover:underline">My Appointments</Link></li>
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
