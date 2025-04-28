import React from 'react';
import { Link, Outlet } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
// import { AuthContext } from '../../contexts/AuthProvider';

const DashboardLayout = () => {
  // const { user } = useContext(AuthContext);
  const currentUser = 'sujon'

  // const { data: currentUser = {} } = useQuery({
  //   queryKey: ['userRole', user?.email],
  //   queryFn: async () => {
  //     const res = await fetch(`https://your-server.com/users/${user.email}`);
  //     return res.json();
  //   },
  //   enabled: !!user?.email,
  // });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-4 space-y-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <ul className="space-y-2">
          {/* Admin Menu */}
          {currentUser?.role === 'admin' && (
            <>
              <li><Link to="/dashboard/admin">Admin Home</Link></li>
              <li><Link to="/dashboard/admin/all-users">All Users</Link></li>
              <li><Link to="/dashboard/admin/all-doctors">All Doctors</Link></li>
            </>
          )}
          {/* Doctor Menu */}
          {currentUser?.role === 'doctor' && (
            <>
              <li><Link to="/dashboard/doctor">Doctor Home</Link></li>
              <li><Link to="/dashboard/doctor/my-appointments">My Patients</Link></li>
              <li><Link to="/dashboard/doctor/set-schedule">Set Schedule</Link></li>
            </>
          )}
          {/* Patient/User Menu */}
          {currentUser?.role === 'user' && (
            <>
              <li><Link to="/dashboard/user">User Home</Link></li>
              <li><Link to="/dashboard/user/my-appointments">My Appointments</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
