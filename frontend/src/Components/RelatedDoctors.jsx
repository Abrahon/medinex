import { AppContext } from "@/context/AppProvider";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

const RelatedDoctors = ({ specialty, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  // Debugging logs to inspect data
  console.log("specialty:", specialty);
  console.log("Doctors:", doctors);
  console.log("Related Doctors:", relDoc);

  useEffect(() => {
    // Corrected the length check
    if (doctors.length > 0 && specialty) {
      // Filter doctors by specialty and exclude the current doctor
      const doctorsData = doctors.filter(
        (doc) => doc.specialty === specialty && doc._id !== docId
      );
      console.log("Filtered Doctors:", doctorsData);
      setRelDoc(doctorsData); // Set the filtered doctors
    }
  }, [doctors, specialty, docId]);

  return (
    <div className="my-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl mb-2">Related Doctors</h1>
        <p className="text-xs">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {relDoc.length > 0 ? (
          relDoc.slice(0, 5).map((item, index) => (
            //  <Link to={`/my-appoinment/${item._id}`}>
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border-2 rounded-lg cursor-pointer"
            >
              <img className="bg-stone-200" src={item.img} alt={item.name} />
              <div className="px-2 pb-3">
                <div className="flex items-center gap-2 text-sm text-center text-green-500 my-2">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-lg">{item.name}</p>
                <p className="text-xs">{item.specialty}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl col-span-full">
            No related doctors found!
          </p>
        )}
      </div>
    </div>
  );
};

export default RelatedDoctors;
