import React from "react";
import { motion } from "framer-motion";
import about from "../../assets/assets/assets_frontend/about.jpg";
import MeetOurTeam from "@/Components/MeetOurTeam";

const About = () => {
  return (
    <div className="px-6 md:px-20 py-12 bg-gray-50">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          About Medinex
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
          Your health is our top priority. Discover who we are and why we care
          so deeply.
        </p>
      </motion.div>

      {/* Grid Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={about}
            alt="Team"
            className="rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
          />
        </motion.div>

        {/* Right - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Who We Are</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Medinex is a next-generation platform dedicated to connecting
            patients with trusted healthcare professionals. We aim to simplify
            healthcare access and empower users through knowledge and innovative
            technology.
          </p>

          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-4">
            To provide accessible, efficient, and quality healthcare for
            everyone, everywhere.
          </p>

          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Our Vision
          </h2>
          <p className="text-gray-600">
            A world where every individual has seamless access to the best
            medical support regardless of location.
          </p>
        </motion.div>
      </div>

      {/* Team Section (Optional) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-20 text-center"
      >
        <MeetOurTeam></MeetOurTeam>
      </motion.div>
    </div>
  );
};

export default About;
