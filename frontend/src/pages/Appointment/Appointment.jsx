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
  console.log("slot", availableSchedule);

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
      console.log("doctor slot", data);
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
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to book an appointment!",
      });
      return;
    }

    if (!slotTime) {
      Swal.fire({
        icon: "warning",
        title: "Time Slot Required",
        text: "Please select a time slot!",
      });
      return;
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
      <div>
        {/* Doctor Info Section */}
        <div className="flex flex-col sm:flex-row gap-6 my-10">
          <div className="bg-naviblue rounded-lg">
            <img className="" src={docInfo.img} alt="" />
          </div>
          <div className="border-2 p-4 rounded-lg w-full">
            <p className="flex text-3xl font-semibold">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" />
            </p>
            <p className="font-semibold text-lg">
              {docInfo.degree} - {docInfo.specialty}
              <span className="ml-2 text-sm">{docInfo.experience} years</span>
            </p>
            <p>{docInfo.email}</p>
            <p className="font-bold mt-4">About</p>
            <p>{docInfo.about}</p>
            <p className="font-bold mt-6">
              Appointment fee: <span>${docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* Booking Slot Section */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>

          {/* Day Selector */}
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {availableSchedule.length > 0 &&
              availableSchedule.map((item, index) => (
                <div
                  key={index}
                  className={`text-center px-1 py-6 min-w-24 cursor-pointer rounded-full border-2 ${
                    selectedDayIndex === index
                      ? "bg-naviblue text-white"
                      : "border-gray-200"
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
          <div className="flex gap-3 flex-wrap my-10">
            {availableSchedule[selectedDayIndex]?.slots?.map((slot, i) => (
              <div
                key={i}
                className={`text-center py-2 px-4 cursor-pointer rounded-full border-2 ${
                  slotTime === slot
                    ? "bg-primary text-white"
                    : "border-gray-200"
                }`}
                onClick={() => setSlotTime(slot)}
              >
                <p>{slot.toLowerCase()}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleAppointment}
            className="bg-naviblue px-12 py-4 text-white rounded-full my-6"
          >
            Book An Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={_id} specialty={docInfo.specialty} />
      </div>
    )
  );
};

export default Appointment;
