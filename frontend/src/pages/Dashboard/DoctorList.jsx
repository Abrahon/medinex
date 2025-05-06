import SpecialityMenu from "@/Components/SpecialityMenu";
import TopDoctors from "@/Components/TopDoctors";
import { AppContext } from "@/context/AppProvider";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  console.log(speciality);
  const { doctors } = useContext(AppContext);
  console.log(doctors);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyfilter = () => {
    if (speciality) {
      setFilterDoc(doctors?.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyfilter();
  }, [doctors, speciality]);

  return (
    <div className="my-16">
      <p>Browse through the doctors specialist.</p>
      <div className="flex flex-col  sm:flex-row items-start mt-4 gap-3">
        <button
          className={`py-1 px-3 text-sm border-rounded sm:hidden ${
            showFilter ? "bg-naviblue text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filter
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterDoc?.map((item, index) => (
            <div
              key={item._id} // Ensure each item has a unique key
              onClick={() => navigate(`/my-appointment/${item._id}`)}
              className="border-2 rounded-lg"
            >
              <Link to="">
                <img className="bg-stone-200" src={item.image} alt="" />
                <div className="px-2 pb-3">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500 my-2">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-xs">{item.speciality}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
