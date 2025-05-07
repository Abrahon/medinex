import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "@/context/AppProvider";

const Doctors = () => {
  const { specialty } = useParams();
  const { doctors } = useContext(AppContext);
  console.log("all doctor", doctors);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  console.log(specialty);
  const { id } = useParams();

  useEffect(() => {
    if (specialty) {
      setFilterDoc(doctors.filter((doc) => doc.specialty === specialty));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, specialty]);

  const handleFilterClick = (spec) => {
    if (specialty === spec) {
      navigate("/doctors"); // remove filter
    } else {
      navigate(`/doctors/${spec}`); // apply new filter
    }
  };

  return (
    <div className="my-16">
      <p className="text-xl font-semibold mb-4">
        Browse through the doctor's specialists
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Mobile filter button */}
        <button
          className={`py-1 px-3 text-sm border rounded sm:hidden ${
            showFilter ? "bg-blue-600 text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filter
        </button>

        {/* Sidebar filter */}
        <div
          className={`flex flex-col w-full sm:w-80 gap-3 text-sm text-gray-700 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {[
            "General physician",
            "Gynecologist",
            "Cardiologist",
            "Pediatrics",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => (
            <p
              key={spec}
              onClick={() => handleFilterClick(spec)}
              className={`border px-4 py-2 cursor-pointer text-center rounded ${
                specialty === spec ? "bg-blue-600 text-white" : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {filterDoc.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No doctors found for this specialty.
            </p>
          ) : (
            filterDoc.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="bg-white border rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer animate-fade-in"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2 text-green-500 text-sm my-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p>Available</p>
                  </div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.specialty}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
