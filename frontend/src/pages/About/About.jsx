// About.js
import React from "react";

const About = () => {
  return (
    <div className="text-gray-800 my-10">
      
      {/* Welcome Section */}
      <section className="py-16  text-center px-5 my-4 bg-naviblue text-white">
        <h1 className="text-4xl font-bold  mb-4">About DocToBooking</h1>
        <p className="text-lg max-w-2xl mx-auto ">
          At DocToBooking, we are dedicated to making healthcare accessible and convenient for everyone. 
          Our platform enables patients to seamlessly book appointments with trusted healthcare providers, ensuring a smooth and stress-free experience.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 text-center px-5 text-white my-4 bg-naviblue">
        <h2 className="text-3xl font-semibold  mb-6">Our Mission</h2>
        <p className="text-lg max-w-3xl mx-auto">
          Our mission is to connect patients with qualified doctors to promote wellness and provide timely, quality healthcare. 
          We believe in simplifying access to healthcare through technology and aim to improve the healthcare journey for all.
        </p>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-naviblue  text-center px-5 my-4">
        <h2 className="text-3xl font-semibold text-white  mb-6">Our Core Values</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-xs">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Trust</h3>
            <p className="text-gray-700">
              Building trust with our users is our top priority. We ensure all providers are verified and adhere to strict quality standards.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-xs">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
            <p className="text-gray-700">
              We embrace technology to create efficient, accessible, and user-friendly healthcare solutions.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-xs">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Compassion</h3>
            <p className="text-gray-700">
              We put our users first and strive to support their health journeys with empathy and understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="w-full py-16 text-center text-white px-5 py-4 bg-naviblue">
        <h2 className="text-3xl font-semibold  mb-6">Meet the Team</h2>
        <div className="grid grid:cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-8">
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg ">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900">Abrahon Mahmud Sujon</h3>
            <p className="text-gray-700">Chief Medical Officer</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg ">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900">Jane Smith</h3>
            <p className="text-gray-700">Head of Operations</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg ">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900">Mark Johnson</h3>
            <p className="text-gray-700">Lead Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
