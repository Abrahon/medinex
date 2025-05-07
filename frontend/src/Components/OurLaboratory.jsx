import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import slider1 from "../assets/assets/assets_frontend/slider-img-1.jpg";
import slider2 from "../assets/assets/assets_frontend/slider-img-2.jpg";
import slider3 from "../assets/assets/assets_frontend/slider-img-3.jpg";
import {
  FaArrowRight,
  FaHeartbeat,
  FaAmbulance,
  FaMicroscope,
  FaUserMd,
  FaStethoscope,
  FaSyringe,
} from "react-icons/fa";

// Auto-rotating images
const images = [slider1, slider2, slider3];

// Cards data
const services = [
  {
    icon: <FaHeartbeat className="text-3xl text-[#3ed4cb]" />,
    title: "Cardiac Clinic",
    desc: "Advanced cardiac care with expert cardiologists.",
  },
  {
    icon: <FaAmbulance className="text-3xl text-[#3ed4cb]" />,
    title: "Emergency Clinic",
    desc: "24/7 emergency response and trauma care.",
  },
  {
    icon: <FaMicroscope className="text-3xl text-[#3ed4cb]" />,
    title: "Precise Diagnosis",
    desc: "Accurate testing with modern lab equipment.",
  },
  {
    icon: <FaUserMd className="text-3xl text-[#3ed4cb]" />,
    title: "Primary Care",
    desc: "General wellness and long-term health management.",
  },
  {
    icon: <FaStethoscope className="text-3xl text-[#3ed4cb]" />,
    title: "Vascular Surgery",
    desc: "Expert vascular diagnostics and surgical treatment.",
  },
  {
    icon: <FaSyringe className="text-3xl text-[#3ed4cb]" />,
    title: "General Surgery",
    desc: "Minimally invasive procedures by top surgeons.",
  },
];

const OurLaboratory = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="text-cenetr mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Our Laboratory Faciliy
        </h1>
        <p className="max-w-xl mx-auto mb-12 text-center text-gray-600">
          Exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
          commodo non habent claritatem insitamconsequat duis autem facilisis at
          vero eros
        </p>
      </div>
      {/* Top Section */}
      <div className="flex flex-col-reverse lg:flex-row min-h-[60vh]">
        <motion.div
          key={currentImage}
          // initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full lg:w-1/2 h-[40vh] lg:h-auto bg-cover "
          style={{ backgroundImage: `url(${images[currentImage]})` }}
        ></motion.div>

        <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#3ed4cb] text-white p-10">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-md text-center lg:text-left space-y-6"
          >
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
              Best Laboratory <br />
              <span className="text-white font-extrabold">Tests Available</span>
            </h1>
            <p className="text-sm uppercase tracking-wide">
              LOREM IPSUM DOLOR SIT AMETIS
            </p>
            <p className="text-sm">
              Exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat duis autem vel eum iriure.
            </p>
            <button className="bg-white text-[#3ed4cb] px-5 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100 transition">
              Learn more <FaArrowRight />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-12 px-6 lg:px-20 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurLaboratory;
