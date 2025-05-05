import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";

const SetSchedule = () => {
  const { user } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState("");
  const [slots, setSlots] = useState([]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const allSlots = [
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleAdd = () => {
    if (!day || slots.length === 0) return;

    // Check if day already exists in schedule
    const exists = schedule.find((item) => item.day === day);
    if (exists) {
      alert("This day is already added. Please choose another.");
      return;
    }

    setSchedule([...schedule, { day, slots }]);
    setDay("");
    setSlots([]);
  };

  const handleSubmit = async () => {
    for (const item of schedule) {
      const res = await fetch("http://localhost:5000/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorEmail: user.email,
          day: item.day,
          slots: item.slots,
        }),
      });

      const result = await res.json();
      console.log(result);

      if (!result.success) {
        alert(`Failed to save schedule for ${item.day}`);
        return;
      }
    }

    alert("All schedules saved successfully!");
    setSchedule([]); // Optional: clear after saving
  };

  const toggleSlot = (slot) => {
    if (slots.includes(slot)) {
      setSlots(slots.filter((s) => s !== slot));
    } else {
      setSlots([...slots, slot]);
    }
  };
  // console.log("slot", toggleSlot);
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Set Available Schedule</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Day</label>
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border w-full p-2"
        >
          <option value="">Select a day</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Time Slots</label>
        <div className="flex flex-wrap gap-2">
          {allSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => toggleSlot(slot)}
              className={`px-3 py-1 border rounded ${
                slots.includes(slot) ? "bg-blue-500 text-white" : ""
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Day
      </button>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Preview</h3>
        <ul className="list-disc ml-6">
          {schedule.map((item, i) => (
            <li key={i}>
              {item.day}: {item.slots.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white mt-4 px-4 py-2 rounded"
      >
        Submit Schedule
      </button>
    </div>
  );
};

export default SetSchedule;
