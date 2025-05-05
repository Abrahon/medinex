import { AuthContext } from "@/context/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const userEmail = user?.email;
  console.log(userEmail);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail) return;
    fetch(`http://localhost:5000/bookings?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("Navigating to checkout with ID:", item._id);
        console.log("Fetched bookings:", data);
        setBookings(data);
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [userEmail]);

  const handleDeleteBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/bookings/${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            Swal.fire("Deleted!", "Booking has been deleted.", "success");
            // Update local user list
            setBookings((prev) => prev.filter((book) => book._id !== id));
          } else {
            Swal.fire("Error", "Failed to delete Booking.", "error");
          }
        } catch (err) {
          console.error("Error deleting booking:", err);
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>
      <hr className="mb-6" />

      {bookings.length === 0 ? (
        <p className="text-gray-500">No appointments booked yet.</p>
      ) : (
        bookings.map((item, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <img
                  className="w-32 h-32 object-cover rounded bg-naviblue"
                  src={item.img}
                  alt={item.doctorName}
                />
                <div>
                  <p className="font-semibold text-lg">{item.doctorName}</p>
                  <p className="text-sm text-gray-600">{item.specialty}</p>
                  <p className="text-sm mt-2 font-medium">Date & Time:</p>
                  <p className="text-sm text-gray-700">
                    {item.appointmentTime}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    Status: <span className="text-blue-600">{item.status}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                <button
                  onClick={() => navigate(`/checkout/${item._id}`)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-naviblue hover:text-white transition-all duration-30"
                >
                  Pay Online
                </button>
                <button
                  onClick={() => handleDeleteBooking(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
            <hr className="mt-4" />
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointment;
