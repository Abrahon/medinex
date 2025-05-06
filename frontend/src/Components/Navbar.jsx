import React, { useState, useEffect, useContext } from "react";
import { assets } from "@/assets/assets/assets_frontend/assets";
import { AuthContext } from "@/context/AuthProvider";
import { LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuShow, setMenuShow] = useState(false);
  // const \[role, setRole] = useState(null);
  const { user, role, logOut, loading } = useContext(AuthContext);
  console.log("user", role);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const navLinkStyles = ({ isActive }) =>
    `${
      isActive
        ? "text-blue-700 border-b-2 border-blue-700"
        : "text-gray-600 hover:text-blue-500"
    }`;

  return (
    <div className="flex justify-between items-center border-b-2 py-4 px-5 md:px-10">
      {" "}
      <Link className="text-3xl font-bold italic" to="/">
        MEDINEX{" "}
      </Link>
      {/* Desktop Menu */}
      <ul className="hidden md:flex uppercase items-center space-x-8">
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

        {role === "admin" && (
          <NavLink to="/dashboard/admin" className={navLinkStyles}>
            <li>Admin Dashboard</li>
          </NavLink>
        )}
        {role === "doctor" && (
          <NavLink to="/dashboard/doctor" className={navLinkStyles}>
            <li>Doctor Dashboard</li>
          </NavLink>
        )}
        {role === "user" && (
          <NavLink to="/dashboard/user" className={navLinkStyles}>
            <li>Dashboard</li>
          </NavLink>
        )}
      </ul>
      {/* Profile or Login Button */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            {/* Logout button first */}
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>

            {/* Profile image and name */}
            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-full border border-gray-300"
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/6BRR4mX/default-avatar.png"
                }
                alt="Profile"
              />
              <p className="text-sm font-medium">
                {user?.displayName || user?.name || "User"}
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
        {/* Mobile menu button */}
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
          {/* <img className="w-36" src={assets.logo} alt="Logo" /> */}
          <h3 className="text-xl font-bold uppercase italic">medinex</h3>
          <img
            onClick={() => setMenuShow(false)}
            className="w-7 cursor-pointer"
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        <ul className="flex flex-col items-center mt-2 space-y-2 font-semibold ">
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

          {role === "admin" && (
            <li>
              <NavLink
                onClick={() => setMenuShow(false)}
                to="/dashboard/admin"
                className={navLinkStyles}
              >
                Admin Dashboard
              </NavLink>
            </li>
          )}
          {role === "doctor" && (
            <li>
              <NavLink
                onClick={() => setMenuShow(false)}
                to="/dashboard/doctor"
                className={navLinkStyles}
              >
                Doctor Dashboard
              </NavLink>
            </li>
          )}
          {role === "user" && (
            <li>
              <NavLink
                onClick={() => setMenuShow(false)}
                to="/dashboard/user"
                className={navLinkStyles}
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
