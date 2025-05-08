// Footer.js
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 animate-fade-in-up">
        {/* Contact Information */}
        <div>
          <h4 className="text-xl font-semibold text-yellow-400 mb-4">
            Contact Us
          </h4>
          <p className="flex items-center gap-2 text-gray-300">
            <FaPhoneAlt className="text-yellow-400" /> (123) 456-7890
          </p>
          <p className="flex items-center gap-2 text-gray-300 mt-2">
            <FaEnvelope className="text-yellow-400" /> contact@doctobooking.com
          </p>
          <p className="flex items-center gap-2 text-gray-300 mt-2">
            <FaMapMarkerAlt className="text-yellow-400" /> 123 Medical St.,
            Health City
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-yellow-400 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a
                href="/about"
                className="hover:text-yellow-400 transition duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="hover:text-yellow-400 transition duration-200"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/appointments"
                className="hover:text-yellow-400 transition duration-200"
              >
                Book Appointment
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-yellow-400 transition duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold text-yellow-400 mb-4">
            Follow Us
          </h4>
          <div className="flex gap-5 text-gray-300">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-transform duration-300 transform hover:scale-110"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-transform duration-300 transform hover:scale-110"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-transform duration-300 transform hover:scale-110"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">DocToBooking</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
