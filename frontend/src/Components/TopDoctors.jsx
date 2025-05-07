import { AppContext } from "@/context/AppProvider";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="my-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 animate-fade-in">
          Top Doctors to Book
        </h1>
        <p className="text-sm text-gray-600">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {doctors.slice(0, 8).map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="bg-white border rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer animate-fade-in"
          >
            <div className="overflow-hidden rounded-t-xl">
              <img
                className="w-full  object-cover transition-transform duration-500 hover:scale-110"
                src={item.img}
                alt={item.name}
              />
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 text-green-600 text-sm mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p>Available</p>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.specialty}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-blue-800 hover:bg-naviblue text-white px-8 py-2 rounded-full transition duration-300"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
