import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaClock,
  FaClipboardList,
  FaStar,
} from "react-icons/fa";

const DoctorHome = () => {
  const [appointments, setAppointments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch Appointments
  useEffect(() => {
    const doctorEmail = user?.email;
    if (doctorEmail) {
      fetch(`http://localhost:5000/bookings?doctorEmail=${doctorEmail}`)
        .then((res) => res.json())
        .then((data) => setAppointments(data))
        .catch((error) => {
          console.error("Error fetching schedule:", error);
          setAppointments([]);
        });
    }
  }, [user]);

  useEffect(() => {
    const doctorEmail = user?.email;
    console.log(doctorEmail);
    if (doctorEmail) {
      fetch(`http://localhost:5000/schedules?doctorEmail=${doctorEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setSchedule(data);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setSchedule([]); // ⚠️ Probably a typo; should be setSchedule([])
        });
    }
  }, [user]);

  const pendingAppointments = appointments.filter(
    (appt) => appt.status === "pending"
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        Welcome Doctor{" "}
        <span className="text-green-600">{user.displayName}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaClipboardList />}
          title="Total Appointments"
          value={appointments.length}
          color="text-blue-500"
        />
        <StatCard
          icon={<FaCalendarCheck />}
          title="Pending Appointments"
          value={pendingAppointments.length}
          color="text-yellow-500"
        />
        <StatCard
          icon={<FaClock />}
          title="Available Days"
          value={schedule.length}
          color="text-green-600"
        />
        <StatCard
          icon={<FaStar />}
          title="Patient Feedback"
          value={0}
          color="text-purple-500"
        />
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Reminders</h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Review pending appointments daily.</li>
          <li>Update your schedule for the upcoming week.</li>
          <li>Respond to new feedback or queries.</li>
        </ul>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h4 className="text-xl font-semibold">{value}</h4>
    </div>
  </div>
);

export default DoctorHome;
