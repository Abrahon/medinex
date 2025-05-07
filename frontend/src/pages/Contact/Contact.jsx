// Contact.js
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_uipwvsg", // Replace with your EmailJS Service ID
        "template_0qxo5t9", // Replace with your Template ID
        form.current,
        "AdG1o9Yhr1_v84v9P" // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire(
            "Success!",
            "Your message has been sent to Medinex!",
            "success"
          );
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          Swal.fire("Oops!", "Something went wrong. Try again later.", "error");
        }
      );
  };

  return (
    <div className="text-gray-800 py-16 my-10">
      <section className="text-center mb-12 px-5">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We're here to help! Reach out to us with any questions or feedback,
          and we’ll get back to you as soon as possible.
        </p>
      </section>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-5">
        <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6">
            Send Us a Message
          </h2>
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                name="name"
                required
                type="text"
                className="w-full mt-1 p-2 border rounded-md focus:ring-yellow-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                required
                type="email"
                className="w-full mt-1 p-2 border rounded-md focus:ring-yellow-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="4"
                className="w-full mt-1 p-2 border rounded-md focus:ring-yellow-600"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-900 text-white rounded-md font-semibold hover:bg-naviblue transition-all"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="p-8 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Our Office
            </h3>
            <p>123 Medinex St., Health City</p>
            <p>Phone:+8801710670341</p>
            <p>Email: support@medinex.com</p>
          </div>

          <div className="p-8 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Follow Us
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800"
              >
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
