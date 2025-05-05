import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";

const MyPatients = () => {
  const { user } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const doctorEmail = user?.email;
    if (doctorEmail) {
      fetch(`http://localhost:5000/bookings?doctorEmail=${doctorEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setPatients(data);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setPatients([]);
        });
    }
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Patients</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">SL</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Gender</th>
              <th className="py-2 px-4 border">Time</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No patients found.
                </td>
              </tr>
            ) : (
              patients.map((patient, i) => (
                <tr key={patient._id}>
                  <td className="py-2 px-4 border">{i + 1}</td>
                  <td className="py-2 px-4 border">{patient.userName}</td>
                  <td className="py-2 px-4 border">{patient.userEmail}</td>
                  <td className="py-2 px-4 border">{patient.phone || "N/A"}</td>
                  <td className="py-2 px-4 border">
                    {patient.gender || "N/A"}
                  </td>
                  <td className="py-2 px-4 border">
                    {patient.appointmentTime}
                  </td>
                  <td className="py-2 px-4 border">{patient.status}</td>
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
