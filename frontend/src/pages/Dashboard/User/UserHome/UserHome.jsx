import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { Link } from "react-router-dom";

const UserHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {user?.displayName || "User"} 👋
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <img
            src={
              user?.photoURL || "https://i.ibb.co/6BRR4mX/default-avatar.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold">
            {user?.displayName || "User"}
          </h3>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>

        {/* Appointment Button */}
        <div className="bg-blue-100 p-6 rounded-xl flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold mb-2">Book an Appointment</h3>
          <p className="text-sm text-gray-600 mb-4">
            Find the right doctor and schedule your visit.
          </p>
          <Link
            to="/doctors"
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            View Doctors
          </Link>
        </div>

        {/* Blog/Articles */}
        <div className="bg-green-100 p-6 rounded-xl flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold mb-2">Health Blog</h3>
          <p className="text-sm text-gray-600 mb-4">
            Explore tips and news on staying healthy.
          </p>
          <Link
            to="/blog"
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
          >
            Read Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
