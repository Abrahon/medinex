import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthProvider';

const MyPatients = () => {
  const { user } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPatients = async () => {
      try {
        const res = await fetch(`http://localhost:5000/bookings/doctors?email=${user.email}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setPatients(data);
        } else {
          console.warn('Expected array but got:', data);
          setPatients([]); // fallback
        }
      } catch (error) {
        console.error('Failed to load patients', error);
        setPatients([]);
      }
    };

    fetchPatients();
  }, [user?.email]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Patients</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">SL</th>
              <th className="py-2 px-4 border">Patient Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Date & Time</th>
              <th className="py-2 px-4 border">Slot</th>
              <th className="py-2 px-4 border">Specialty</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No patients found.
                </td>
              </tr>
            ) : (
              patients.map((patient, i) => (
                <tr key={patient._id || i} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{i + 1}</td>
                  <td className="py-2 px-4 border">{patient.fullName}</td>
                  <td className="py-2 px-4 border">{patient.email}</td>
                  <td className="py-2 px-4 border">{patient.appointmentTime}</td>
                  <td className="py-2 px-4 border">{patient.slot || 'N/A'}</td>
                  <td className="py-2 px-4 border">{patient.specialty || 'N/A'}</td>
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
