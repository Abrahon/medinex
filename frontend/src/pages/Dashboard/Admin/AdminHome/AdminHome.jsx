import { AppContext } from "@/context/AppProvider";
import { useContext, useEffect, useState } from "react";
import { FaUser, FaUserMd, FaCalendarAlt, FaBlog } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { AuthContext } from "@/context/AuthProvider";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const AdminHome = () => {
  const [alluser, setAlluser] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmenstData, setAppointsmentData] = useState([]);
  const { doctors } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setAlluser(data))
      .catch((err) => console.error("Failed to fetch users", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Failed to fetch bookings", err));
  }, []);

  // Group doctors by specialty
  const specialtyData = Object.values(
    doctors.reduce((acc, doc) => {
      acc[doc.specialty] = acc[doc.specialty] || {
        name: doc.specialty,
        value: 0,
      };
      acc[doc.specialty].value++;
      return acc;
    }, {})
  );

  const totalSpecialtyCount = specialtyData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const appointmentData = [
    { month: "Jan", count: 2 },
    { month: "Feb", count: 2 },
    { month: "Mar", count: 3 },
    { month: "Apr", count: 2 },
    { month: "May", count: 1 },
    { month: "Jun", count: 0 },
    { month: "Jul", count: 0 },
    { month: "Aug", count: 0 },
    { month: "Sep", count: 0 },
    { month: "Oct", count: 0 },
    { month: "Nov", count: 0 },
    { month: "Dec", count: 0 },
  ];
  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => {
        const monthlyCounts = {};
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        months.forEach((m) => (monthlyCounts[m] = 0));

        data.forEach((booking) => {
          const month = new Date(booking.date).toLocaleString("default", {
            month: "short",
          });
          monthlyCounts[month] += 1;
        });

        const formattedData = months.map((m) => ({
          month: m,
          count: monthlyCounts[m],
        }));

        setAppointments(data);
        setAppointsmentData(formattedData); // <-- New state you should define
      })
      .catch((err) => console.error("Failed to fetch bookings", err));
  }, []);

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">
        Welcome Admin <span className="text-green-600">{user.displayName}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaUser />}
          title="Total Users"
          value={alluser.length}
          color="text-blue-500"
        />
        <StatCard
          icon={<FaUserMd />}
          title="Total Doctors"
          value={doctors.length}
          color="text-green-500"
        />
        <StatCard
          icon={<FaCalendarAlt />}
          title="Appointments"
          value={appointments.length}
          color="text-purple-500"
        />
        <StatCard
          icon={<FaBlog />}
          title="Pending Blogs"
          value={0}
          color="text-red-500"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-1 gap-10">
        <motion.div
          className="bg-white shadow rounded-2xl p-5"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h3 className="text-lg font-semibold mb-4">
            Doctor Specialty Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={specialtyData}
                cx="50%"
                cy="50%"
                label={({ name, value }) =>
                  `${name}: ${((value / totalSpecialtyCount) * 100).toFixed(
                    1
                  )}%`
                }
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive
              >
                {specialtyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white shadow rounded-2xl p-5"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h3 className="text-lg font-semibold mb-4">Monthly Appointments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    className="bg-white rounded-2xl shadow p-5 flex items-center gap-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h4 className="text-xl font-semibold">{value}</h4>
    </div>
  </motion.div>
);

export default AdminHome;
