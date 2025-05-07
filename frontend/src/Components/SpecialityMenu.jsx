import { specialityData } from "@/assets/assets/assets_frontend/assets";
import React from "react";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div className="flex flex-col items-center gap-4 my-16 px-4">
      <h1 className="text-3xl font-semibold text-center">Find by Speciality</h1>
      <p className="md:w-1/3 sm:w-full text-center text-gray-600">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>

      {/* Scrollable container for small screens, centered on large */}
      <div className="w-full overflow-x-auto">
        <div className="flex justify-center md:justify-center lg:justify-center">
          <div className="flex gap-6 my-6 px-2 md:flex-wrap md:justify-center min-w-fit">
            {specialityData.map((item, index) => (
              <Link
                key={index}
                to={`/doctors/${item.speciality}`}
                className="flex flex-col items-center min-w-[80px] sm:min-w-[100px] group"
              >
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="w-16 sm:w-24 transition-transform duration-300 group-hover:-translate-y-2"
                />
                <p className="text-xs sm:text-sm text-center mt-2">
                  {item.speciality}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;
