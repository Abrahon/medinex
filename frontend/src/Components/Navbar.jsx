import { assets } from '@/assets/assets/assets_frontend/assets'
import { AuthContext } from '@/context/AuthProvider'
import { LogOut } from 'lucide-react'
import React, { useState, useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [menuShow, setMenuShow] = useState(false)
  const { user, logOut } = useContext(AuthContext)  // ✅ get user and logOut function
  const navigate = useNavigate();
  console.log(user)

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate('/login');  // after logout, redirect to login
      })
      .catch(err => {
        console.log(err)
      })
  }

  const navLinkStyles = ({ isActive }) =>
    `${isActive ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-blue-500'}`

  return (
    <div className="flex justify-between items-center border-b-2 py-4 px-5 md:px-10">
      <Link className="text-3xl font-bold italic" to="/">MEDINEX</Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex uppercase items-center space-x-8">
        <NavLink to="/" className={navLinkStyles}><li>Home</li></NavLink>
        <NavLink to="/doctors" className={navLinkStyles}><li>All Doctors</li></NavLink>
        <NavLink to="/about" className={navLinkStyles}><li>About</li></NavLink>
        <NavLink to="/blog" className={navLinkStyles}><li>Blog</li></NavLink>
        <NavLink to="/contact" className={navLinkStyles}><li>Contact</li></NavLink>
        <NavLink to="/dashboard/admin" className={navLinkStyles}><li>Dashbaord</li></NavLink>
      </ul>

      {/* Profile or Login button */}
      <div className="flex items-center gap-4">
        {user ? (  // ✅ If user exists
          <div className="relative group cursor-pointer">
            {/* <p className="text-sm block md:hidden">{user?.displayName}</p> */}
            {/* <div className="flex items-center gap-2"> */}
            <div className="flex items-center gap-2">
            <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt="Profile" />
            <p className="text-xs ">{user?.displayName}</p> 
            {/* </div> */}
              {/* <img className="w-5" src={assets.dropdown_icon} alt="Dropdown" /> */}
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 pt-4 hidden group-hover:block">
              <div className="bg-gray-200 rounded-md p-2 space-y-2 w-40 text-center">
                <p className="hover:text-blue-500" onClick={() => navigate('/my-profile')}>My Profile</p>
                <p className="hover:text-blue-500" onClick={() => navigate('/my-appointment')}>My Appointments</p>
                <button onClick={handleLogOut} className="hover:text-blue-500 flex items-center justify-center gap-2 w-full">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
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
      <div className={`fixed top-0 right-0 w-full h-full bg-white z-50 transform ${menuShow ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:hidden`}>
        <div className="flex items-center justify-between p-6">
          <img className="w-36" src={assets.logo} alt="Logo" />
          <img
            onClick={() => setMenuShow(false)}
            className="w-7 cursor-pointer"
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        <ul className="flex flex-col items-center mt-10 space-y-6 text-xl font-semibold">
          <NavLink onClick={() => setMenuShow(false)} to="/" className={navLinkStyles}>Home</NavLink>
          <NavLink onClick={() => setMenuShow(false)} to="/doctors" className={navLinkStyles}>All Doctors</NavLink>
          <NavLink onClick={() => setMenuShow(false)} to="/about" className={navLinkStyles}>About</NavLink>
          <NavLink onClick={() => setMenuShow(false)} to="/blog" className={navLinkStyles}>Blog</NavLink>
          <NavLink onClick={() => setMenuShow(false)} to="/contact" className={navLinkStyles}>Contact</NavLink>
          <NavLink onClick={() => setMenuShow(false)} to="/dashboard" className={navLinkStyles}>Dashboard</NavLink>

          {user ? (
            <>
              <div className="flex flex-col items-center gap-2">
                <img className="h-12 w-12 rounded-full" src={user?.photoURL || assets.profile_pic} alt="Profile" />
                <span>{user?.displayName}</span>
                <button onClick={handleLogOut} className="bg-red-500 text-white px-4 py-2 rounded-full mt-2">Logout</button>
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                navigate('/login')
                setMenuShow(false)
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-full mt-4"
            >
              Create Account
            </button>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
