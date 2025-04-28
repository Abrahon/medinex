// Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
        
        {/* Contact Information */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-lg font-semibold text-yellow-400">Contact Us</h4>
          <p>Phone: (123) 456-7890</p>
          <p>Email: contact@doctobooking.com</p>
          <p>Address: 123 Medical St., Health City</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-lg font-semibold text-yellow-400">Quick Links</h4>
          <a href="/about" className="hover:text-yellow-400">About Us</a>
          <a href="/services" className="hover:text-yellow-400">Services</a>
          <a href="/appointments" className="hover:text-yellow-400">Book Appointment</a>
          <a href="/contact" className="hover:text-yellow-400">Contact</a>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-lg font-semibold text-yellow-400">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">Instagram</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} DocToBooking. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
