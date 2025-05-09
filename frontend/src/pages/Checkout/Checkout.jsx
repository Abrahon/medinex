import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {
  const { id } = useParams(); // booking ID
  // console.log("payment id", id);
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "",
    gender: "",
    paymentMethod: "Card",
  });

  useEffect(() => {
    fetch(`https://medinex-tan.vercel.app/bookings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBooking(data);
      })
      .catch((error) => {
        console.error("Failed to fetch booking:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatePayload = {
      ...formData,
      status: "pending",
    };

    const res = await fetch(`https://medinex-tan.vercel.app/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatePayload),
    });

    if (res.ok) {
      Swal.fire("Success!", "Appointment Confirmed!!!", "success");
      navigate(`/payment/${id}`);
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 shadow-lg rounded-lg bg-white mt-10">
      <h2 className="text-2xl font-bold mb-6">Confirm Appointment</h2>

      {booking ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* Read-only Doctor Info */}
          <div>
            <label className="text-sm font-medium">Doctor</label>
            <input
              type="text"
              readOnly
              value={booking?.doctorName || ""}
              className="w-full rounded-full border p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Appointment Time</label>
            <input
              type="text"
              readOnly
              value={booking?.appointmentTime || ""}
              className="w-full rounded-full border p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              readOnly
              value={booking?.doctorEmail || ""}
              className="w-full rounded-full border p-2"
            />
          </div>

          {/* User Input Fields */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              name="fullName"
              type="text"
              required
              onChange={handleChange}
              className="w-full rounded-full border p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Price</label>
            <input
              type="text"
              readOnly
              value={booking?.fees || ""}
              className="w-full rounded-full border p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              name="phone"
              type="tel"
              required
              onChange={handleChange}
              className="w-full rounded-full border p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Age</label>
            <input
              name="age"
              type="number"
              required
              onChange={handleChange}
              className="w-full rounded-full border p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              name="gender"
              required
              onChange={handleChange}
              className="w-full rounded-full border p-2"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Payment Method</label>
            <select
              name="paymentMethod"
              required
              onChange={handleChange}
              className="w-full rounded-full border p-2"
            >
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
              <option value="Mobile Banking">Mobile Banking</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-naviblue text-white py-2 rounded mt-4"
          >
            Confirme Appointment
          </button>
        </form>
      ) : (
        <p>Loading booking details...</p>
      )}
    </div>
  );
};

export default Checkout;
