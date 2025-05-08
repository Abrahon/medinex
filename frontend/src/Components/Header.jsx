import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";

// Slide Images
import ban1 from "../assets/assets/assets_frontend/ban1.jpg";
import ban2 from "../assets/assets/assets_frontend/ban2.jpg";
import ban3 from "../assets/assets/assets_frontend/ban3.jpg";
import ban4 from "../assets/assets/assets_frontend/ban4.jpg";
import ban5 from "../assets/assets/assets_frontend/ban5.jpg";

// Icon Images
import heart from "../assets/assets/assets_frontend/heart.png";
import anatomy from "../assets/assets/assets_frontend/anatomy.png";
import human from "../assets/assets/assets_frontend/human.png";
import brain from "../assets/assets/assets_frontend/brain.png";
import endocrine from "../assets/assets/assets_frontend/endocrine.png";

const slides = [
  {
    id: 1,
    heading: "Welcome to",
    subheading: "Medi Nex",
    description:
      "Exercitation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat duis autem vel eum iriure",
    image: ban1,
  },
  {
    id: 2,
    heading: "Dedication And",
    subheading: "Commitment",
    description:
      "Providing expert healthcare solutions with compassion and care tailored just for you.",
    image: ban2,
  },
  {
    id: 3,
    heading: "We have the finest",
    subheading: "Physician",
    description:
      "Providing expert healthcare solutions with compassion and care tailored just for you.",
    image: ban3,
  },
  {
    id: 4,
    heading: "Get Trusted Care",
    subheading: "By Expert Doctors",
    description:
      "Providing expert healthcare solutions with compassion and care tailored just for you.",
    image: ban4,
  },
  {
    id: 5,
    heading: "Get Trusted Care",
    subheading: "By Expert Doctors",
    description:
      "Providing expert healthcare solutions with compassion and care tailored just for you.",
    image: ban5,
  },
];

const medicalIcons = [heart, anatomy, endocrine, human, brain];

const Header = () => {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full md:h-[600px] h-[400px]">
              <img
                src={slide.image}
                alt="slide"
                className="w-full h-full object-cover"
              />

              {/* Animated Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40 px-4">
                {/* Animated Heading */}
                <motion.h1
                  className="text-4xl md:text-5xl font-light"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {slide.heading}{" "}
                  <span className="font-bold">{slide.subheading}</span>
                </motion.h1>

                <motion.p
                  className="mt-4 text-lg max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  className="mt-8 flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {medicalIcons.map((icon, idx) => (
                    <div
                      key={idx}
                      className="md:w-16 w-10 md:h-16 h-10 bg-white/80 rounded-xl flex items-center justify-center"
                    >
                      <img
                        src={icon}
                        alt={`icon-${idx}`}
                        className="md:w-8 w-6  md:h-8 h-6"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Header;
