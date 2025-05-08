import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaClock,
  FaClipboardList,
  FaStar,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#FBBF24", "#4ADE80", "#F87171"]; // yellow, green, red

const DoctorHome = () => {
  const [appointments, setAppointments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const doctorEmail = user?.email;
    if (doctorEmail) {
      fetch(
        `https://medinex-tan.vercel.app/bookings?doctorEmail=${doctorEmail}`
      )
        .then((res) => res.json())
        .then((data) => {
          // Normalize status to lowercase to avoid case mismatch
          const normalizedData = data.map((item) => ({
            ...item,
            status: item.status?.toLowerCase() || "pending",
          }));
          setAppointments(normalizedData);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
          setAppointments([]);
        });
    }
  }, [user]);

  useEffect(() => {
    const doctorEmail = user?.email;
    if (doctorEmail) {
      fetch(
        `https://medinex-tan.vercel.app/schedules?doctorEmail=${doctorEmail}`
      )
        .then((res) => res.json())
        .then((data) => setSchedule(data))
        .catch((error) => {
          console.error("Error fetching schedule:", error);
          setSchedule([]);
        });
    }
  }, [user]);

  // Count statuses
  const pendingCount = appointments.filter(
    (appt) => appt.status === "pending"
  ).length;
  const approvedCount = appointments.filter(
    (appt) => appt.status === "confirmed"
  ).length;
  const rejectedCount = appointments.filter(
    (appt) => appt.status === "rejected"
  ).length;

  const chartData = [
    { name: "Pending", value: pendingCount },
    { name: "Confirmed", value: approvedCount },
    { name: "Rejected", value: rejectedCount },
  ];

  return (
    <div className="md:p-5 p-2">
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
          value={pendingCount}
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

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">📊 Appointment Status</h3>
        <div className="w-full h-72 bg-white p-4 rounded-xl shadow">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
                animationDuration={800}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
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
