import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

const SetSchedule = () => {
  const { user } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState("");
  const [slots, setSlots] = useState([]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const allSlots = [
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const toggleSlot = (slot) => {
    setSlots((prevSlots) =>
      prevSlots.includes(slot)
        ? prevSlots.filter((s) => s !== slot)
        : [...prevSlots, slot]
    );
  };

  const handleAdd = () => {
    if (!day || slots.length === 0) {
      Swal.fire(
        "Warning",
        "Please select a day and at least one slot.",
        "warning"
      );
      return;
    }

    const exists = schedule.find((item) => item.day === day);
    if (exists) {
      Swal.fire(
        "Warning",
        "This day is already added. Choose another.",
        "warning"
      );
      return;
    }

    setSchedule([...schedule, { day, slots }]);
    setDay("");
    setSlots([]);
  };

  const handleSubmit = async () => {
    if (!user?.email) {
      Swal.fire("Error", "User not authenticated", "error");
      return;
    }

    try {
      for (const item of schedule) {
        const res = await fetch("https://medinex-tan.vercel.app/schedules", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctorEmail: user.email,
            day: item.day,
            slots: item.slots,
          }),
        });

        if (!res.ok) {
          throw new Error(`Failed to save schedule for ${item.day}`);
        }
      }

      Swal.fire("Success!", "Schedule has been added.", "success");
      setSchedule([]);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Something went wrong!", "error");
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-naviblue">
        Set Schedule
      </h2>

      {/* Day Selector */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Day</label>
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border w-full p-2 rounded"
        >
          <option value="">Choose day</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Time Slots */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Time Slots</label>
        <div className="flex flex-wrap gap-2">
          {allSlots.map((slot) => (
            <motion.button
              key={slot}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSlot(slot)}
              className={`px-3 py-1 rounded-full border transition ${
                slots.includes(slot)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300"
              }`}
            >
              {slot}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Add Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAdd}
        className="bg-green-500 text-white px-4 py-2 rounded w-full mt-4 transition"
      >
        Add Day
      </motion.button>

      {/* Schedule Preview */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Schedule Preview</h3>
        <ul className="space-y-2">
          <AnimatePresence>
            {schedule.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-gray-100 p-2 rounded shadow-sm"
              >
                <strong>{item.day}</strong>: {item.slots.join(", ")}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
        disabled={schedule.length === 0}
        className={`mt-6 w-full py-3 rounded ${
          schedule.length === 0
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-blue-700 text-white"
        }`}
      >
        Submit Schedule
      </motion.button>
    </motion.div>
  );
};

export default SetSchedule;
