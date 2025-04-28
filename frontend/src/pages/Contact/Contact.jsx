// Contact.js
import React from "react";

const Contact = () => {
  return (
    <div className="text-gray-800 py-16 my-10">
      {/* Page Header */}
      <section className="text-center mb-12 px-5">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We're here to help! Reach out to us with any questions or feedback, and we’ll get back to you as soon as possible.
        </p>
      </section>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-5">

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-all" rows="4"></textarea>
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-yellow-600 text-white rounded-md font-semibold hover:bg-yellow-700 transition-all">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          {/* Office Information */}
          <div className="p-8 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Office</h3>
            <p>123 Medical St., Health City</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: support@doctobooking.com</p>
          </div>

          {/* Social Media Links */}
          <div className="p-8 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-all">
                Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-all">
                Twitter
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-all">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
