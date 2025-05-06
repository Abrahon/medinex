import React from "react";
import { motion } from "framer-motion";
import member1 from "../assets/assets/assets_frontend/team-member-1.jpg";
import member2 from "../assets/assets/assets_frontend/team-member-2.jpg";
import member3 from "../assets/assets/assets_frontend/team-member-3.jpg";
import member4 from "../assets/assets/assets_frontend/team-member-4.jpg";

import {
  FaStethoscope,
  FaHeartbeat,
  FaUserNurse,
  FaCut,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const teamMembers = [
  {
    name: "Angela Adams",
    specialty: "Cardiac Surgery",
    icon: <FaStethoscope />,

    image: member1,
  },
  {
    name: "Jordan Kelley",
    specialty: "Cardiology",
    icon: <FaHeartbeat />,
    image: member2,
  },
  {
    name: "Nicole Dixon",
    specialty: "Gynecology",
    icon: <FaUserNurse />,
    image: member3,
  },
  {
    name: "Steven Elliott",
    specialty: "Dietetics",
    icon: <FaCut />,
    image: member4,
  },
];

const MeetOurTeam = () => {
  return (
    <div className="py-16 px-6 md:px-20 bg-white text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-12">
          Exercitation ullamcorper suscipit lobortis nisl ut aliquip ex ea
          commodo non habent claritatem insitam consequat duis.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="relative group mb-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-md transition duration-500 group-hover:scale-105"
              />
              <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-teal-500 text-white p-2 rounded-full shadow-lg text-sm">
                {member.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-blue-600 text-sm font-medium mb-2">
              {member.specialty}
            </p>
            <p className="text-sm text-gray-500 px-4 mb-4">
              Ut wisi enim ad minim veniam, quis laore nostrud exerci tation ulm
              hedi corper turet suscipit lobortis
            </p>
            <div className="flex gap-3 text-gray-400 justify-center text-sm">
              <FaFacebookF className="hover:text-blue-600 transition" />
              <FaTwitter className="hover:text-blue-400 transition" />
              <FaLinkedinIn className="hover:text-blue-700 transition" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurTeam;
