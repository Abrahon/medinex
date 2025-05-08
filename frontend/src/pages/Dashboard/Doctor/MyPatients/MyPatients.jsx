import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyPatients = () => {
  const { user } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const doctorEmail = user?.email;
    if (doctorEmail) {
      fetch(
        `https://medinex-tan.vercel.app/bookings?doctorEmail=${doctorEmail}`
      )
        .then((res) => res.json())
        .then((data) => setPatients(data))
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setPatients([]);
        });
    }
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this patient booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://medinex-tan.vercel.app/bookings/${id}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          setPatients((prev) => prev.filter((p) => p._id !== id));
          Swal.fire(
            "Deleted!",
            "The patient booking has been removed.",
            "success"
          );
        } else {
          Swal.fire("Error!", "Failed to delete booking.", "error");
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="md:p-5 p-2">
      <h2 className="text-3xl font-bold text-naviblue mb-6">👨‍⚕️ My Patients</h2>
      <div className="overflow-x-auto shadow-md rounded-xl bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-50 text-gray-700 uppercase">
            <tr>
              <th className="py-3 px-4 text-left">SL</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Gender</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-400">
                  No patients found.
                </td>
              </tr>
            ) : (
              patients.map((patient, i) => (
                <tr
                  key={patient._id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4">{patient.userName}</td>
                  <td className="py-3 px-4">{patient.userEmail}</td>
                  <td className="py-3 px-4">{patient.phone || "N/A"}</td>
                  <td className="py-3 px-4">{patient.gender || "N/A"}</td>
                  <td className="py-3 px-4">{patient.appointmentTime}</td>
                  <td className="py-3 px-4">{patient.status}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(patient._id)}
                      className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition-all"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPatients;
