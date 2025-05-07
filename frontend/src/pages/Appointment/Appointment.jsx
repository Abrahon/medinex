import { assets } from "@/assets/assets/assets_frontend/assets";
import RelatedDoctors from "@/Components/RelatedDoctors";
import { AppContext } from "@/context/AppProvider";
import { AuthContext } from "@/context/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const Appointment = () => {
  const { _id } = useParams();
  const { doctors } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const [docInfo, setDocInfo] = useState(null);
  const [availableSchedule, setAvailableSchedule] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const doc = doctors.find((d) => d._id === _id);
    if (doc) setDocInfo(doc);
  };

  const fetchSchedule = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/schedules?doctorEmail=${docInfo.email}`
      );
      const data = await res.json();
      setAvailableSchedule(data);
    } catch (err) {
      console.error("Error fetching schedule:", err);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, _id]);

  useEffect(() => {
    if (docInfo?.email) {
      fetchSchedule();
    }
  }, [docInfo?.email]);

  const handleAppointment = async () => {
    if (!user) {
      return Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to book an appointment!",
      });
    }

    if (!slotTime) {
      return Swal.fire({
        icon: "warning",
        title: "Time Slot Required",
        text: "Please select a time slot!",
      });
    }

    const selectedDay = availableSchedule[selectedDayIndex]?.day;

    const booking = {
      userEmail: user.email,
      img: docInfo.img,
      userName: user.displayName,
      doctorId: docInfo._id,
      doctorName: docInfo.name,
      doctorEmail: docInfo.email,
      specialty: docInfo.specialty,
      appointmentTime: `${selectedDay} ${slotTime}`,
      fees: docInfo.fees,
      status: "pending",
    };

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      const data = await res.json();
      if (data.insertedId) {
        Swal.fire("Success!", "Appointment booked successfully!", "success");
      } else {
        Swal.fire("Error", "Failed to book appointment", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    docInfo && (
      <div className="px-4 sm:px-8 py-6 max-w-7xl mx-auto">
        {/* Doctor Info Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Doctor image and info */}
          <div className="w-full lg:w-1/3">
            <div className="bg-naviblue rounded-lg overflow-hidden">
              <img className="w-full h-64 " src={docInfo.img} alt="" />
            </div>
            <p className="flex items-center text-2xl sm:text-3xl text-gray-800 font-semibold mt-4 gap-2">
              {docInfo.name}
              <img className="w-6" src={assets.verified_icon} alt="" />
            </p>
            <p className="font-semibold text-base sm:text-lg text-gray-700 mt-1">
              {docInfo?.degree || "MBBS"} - {docInfo.specialty}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              {docInfo.email}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Experience: {docInfo.experience} years
            </p>
          </div>

          {/* Right: About and Fee */}
          <div className="w-full lg:w-2/3 border-2 p-4 rounded-lg">
            <p className="font-bold text-lg mb-2">About</p>
            <p className="text-gray-700 text-sm sm:text-base">
              {docInfo.about}
            </p>
            <p className="font-bold mt-6 text-base sm:text-lg">
              Appointment Fee:{" "}
              <span className="text-primary">${docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* Booking Slot Section */}
        <div className="mt-10">
          <p className="font-semibold text-lg sm:text-xl text-gray-800">
            Booking Slots
          </p>

          {/* Day Selector */}
          <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2">
            {availableSchedule.length > 0 &&
              availableSchedule.map((item, index) => (
                <div
                  key={index}
                  className={`text-center px-3 py-2 min-w-[90px] cursor-pointer rounded-full border-2 whitespace-nowrap ${
                    selectedDayIndex === index
                      ? "bg-naviblue text-white"
                      : "border-gray-300 text-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedDayIndex(index);
                    setSlotTime("");
                  }}
                >
                  <p>{item.day}</p>
                </div>
              ))}
          </div>

          {/* Time Slots */}
          <div className="flex flex-wrap gap-3 mt-6">
            {availableSchedule[selectedDayIndex]?.slots?.map((slot, i) => (
              <div
                key={i}
                className={`text-center py-2 px-4 cursor-pointer rounded-full border-2 ${
                  slotTime === slot
                    ? "bg-primary text-white"
                    : "border-gray-300 text-gray-800"
                }`}
                onClick={() => setSlotTime(slot)}
              >
                <p>{slot}</p>
              </div>
            ))}
          </div>

          {/* Booking Button */}
          <div className="mt-6">
            <button
              onClick={handleAppointment}
              className="bg-naviblue px-8 py-3 text-white rounded-full w-full sm:w-fit"
            >
              Book An Appointment
            </button>
          </div>
        </div>

        {/* Related Doctors */}
        <div className="mt-10">
          <RelatedDoctors docId={_id} specialty={docInfo.specialty} />
        </div>
      </div>
    )
  );
};

export default Appointment;
