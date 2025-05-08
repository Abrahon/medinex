import React, { useState, useContext } from "react";
import { assets } from "@/assets/assets/assets_frontend/assets";
import { AuthContext } from "@/context/AuthProvider";
import { LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuShow, setMenuShow] = useState(false);
  const { user, role, logOut, loading } = useContext(AuthContext);
  // console.log(user.photoURL);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const navLinkStyles = ({ isActive }) =>
    `${isActive ? " border-b-2 border-blue-700" : "hover:text-blue-800"}`;

  // 🔒 Prevent rendering before data is ready
  if (loading) {
    return <div className="text-center py-4 text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex justify-between items-center border-b-2 py-2 px-5 md:px-10">
      <Link
        to="/"
        className="text-xl md:text-2xl font-bold italic text-blue-900 px-2 md:px-3 py-1 md:py-1 rounded-lg border-2 border-blue-900 transition duration-300 hover:bg-blue-900 hover:text-white hover:shadow-lg transform hover:scale-105"
      >
        MEDINEX
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex uppercase items-center space-x-6">
        <NavLink to="/" className={navLinkStyles}>
          <li>Home</li>
        </NavLink>
        <NavLink to="/doctors" className={navLinkStyles}>
          <li>All Doctors</li>
        </NavLink>
        <NavLink to="/about" className={navLinkStyles}>
          <li>About</li>
        </NavLink>
        <NavLink to="/blog" className={navLinkStyles}>
          <li>Blog</li>
        </NavLink>
        <NavLink to="/contact" className={navLinkStyles}>
          <li>Contact</li>
        </NavLink>

        {user && role === "admin" && (
          <li>
            <NavLink
              to="/dashboard/admin"
              className="px-4 py-2 rounded-full bg-blue-800 text-white text-sm  hover:bg-naviblue transition duration-300"
            >
              Admin Dashboard
            </NavLink>
          </li>
        )}
        {user && role === "doctor" && (
          <li>
            <NavLink
              to="/dashboard/doctor"
              className="px-4 py-2 rounded-full bg-blue-800 text-white text-sm  hover:bg-naviblue transition duration-300"
            >
              Doctor Dashboard
            </NavLink>
          </li>
        )}
        {user && role === "user" && (
          <li>
            <NavLink
              to="/dashboard/user"
              className="px-4 py-2 rounded-full bg-blue-800 text-white text-sm  hover:bg-naviblue transition duration-300"
            >
              Dashboard
            </NavLink>
          </li>
        )}
      </ul>

      {/* Profile / Login */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogOut}
              className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>

            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-full border border-gray-300"
                src={
                  user?.photoURL ||
                  assets.profile_pic ||
                  "https://i.ibb.co/2yT7VxT/default-user.png"
                }
                alt="Profile"
                onError={(e) =>
                  (e.target.src = "https://i.ibb.co/2yT7VxT/default-user.png")
                } // Fallback image
              />

              <p className="text-sm font-medium">
                {user?.displayName || "User"}
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setMenuShow(true)}
          className="w-7 cursor-pointer md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-full h-full bg-white z-50 transform ${
          menuShow ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="flex items-center justify-between p-2">
          <Link
            to="/"
            className="text-xl  italic text-blue-900 px-2 py-1 rounded-lg border-2 border-blue-900 transition duration-300 hover:bg-naviblue hover:text-white hover:shadow-lg transform hover:scale-105"
          >
            MEDINEX
          </Link>

          <img
            onClick={() => setMenuShow(false)}
            className="w-7 cursor-pointer"
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        <ul className="flex flex-col items-center font-medium  space-y-1.5 text-sm hover:shadow-lg transform hover:scale-105">
          <li>
            <NavLink
              onClick={() => setMenuShow(false)}
              to="/"
              className={navLinkStyles}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenuShow(false)}
              to="/doctors"
              className={navLinkStyles}
            >
              All Doctors
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenuShow(false)}
              to="/about"
              className={navLinkStyles}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenuShow(false)}
              to="/blog"
              className={navLinkStyles}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenuShow(false)}
              to="/contact"
              className={navLinkStyles}
            >
              Contact
            </NavLink>
          </li>

          {user && role === "admin" && (
            <li>
              <NavLink
                onClick={() => setMenuShow(false)}
                to="/dashboard/admin"
                className={({ isActive }) =>
                  `block  text-center px-2 py-1 rounded-full  transition duration-300 ${
                    isActive
                      ? "bg-blue-800 text-white"
                      : "bg-blue-800 text-white hover:bg-naviblue"
                  }`
                }
              >
                Admin Dashboard
              </NavLink>
            </li>
          )}
          {user && role === "doctor" && (
            <li>
              <NavLink
                onClick={() => setMenuShow(false)}
                to="/dashboard/doctor"
                className={({ isActive }) =>
                  `block  text-center px-2 py-1 rounded-full  transition duration-300 ${
                    isActive
                      ? "bg-blue-800 text-white"
                      : "bg-blue-800 text-white hover:bg-naviblue"
                  }`
                }
              >
                Doctor Dashboard
              </NavLink>
            </li>
          )}
          {user && role === "user" && (
            <li>
              <NavLink
                onClick={() => setMenuShow(false)}
                to="/dashboard/user"
                className={({ isActive }) =>
                  `block  text-center px-2 py-1 rounded-full  transition duration-300 ${
                    isActive
                      ? "bg-blue-800 text-white"
                      : "bg-blue-800 text-white hover:bg-naviblue"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
          )}

          {user ? (
            <li className="flex flex-col items-center gap-2">
              <img
                className="h-12 w-12 rounded-full"
                src={user?.photoURL || assets.profile_pic}
                alt="Profile"
              />
              <span>{user?.displayName}</span>
              <button
                onClick={handleLogOut}
                className="bg-red-500 text-white px-4 py-2 rounded-full mt-2"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuShow(false);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-full mt-4"
              >
                Create Account
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
