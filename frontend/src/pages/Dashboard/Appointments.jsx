import React from "react";

const Appointments = () => {
  const patients = [
    {
      id: 1,
      picture: "https://via.placeholder.com/50",
      name: "John Doe",
      department: "Cardiology",
      age: 45,
      dateTime: "2024-06-12 10:30 AM",
      doctor: "Dr. Smith",
      fees: "$200",
    },
    {
      id: 2,
      picture: "https://via.placeholder.com/50",
      name: "Jane Smith",
      department: "Neurology",
      age: 38,
      dateTime: "2024-06-13 02:00 PM",
      doctor: "Dr. Brown",
      fees: "$250",
    },
    {
      id: 3,
      picture: "https://via.placeholder.com/50",
      name: "Michael Johnson",
      department: "Dermatology",
      age: 29,
      dateTime: "2024-06-14 11:00 AM",
      doctor: "Dr. Wilson",
      fees: "$150",
    },
    {
      id: 4,
      picture: "https://via.placeholder.com/50",
      name: "Emily Davis",
      department: "Orthopedics",
      age: 50,
      dateTime: "2024-06-15 01:30 PM",
      doctor: "Dr. Clark",
      fees: "$180",
    },
  ];

  return (
    <div className="container mx-auto px-4 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient List</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-2">Picture</th>
              <th className="p-2">Name</th>
              <th className="p-2">Department</th>
              <th className="p-2">Age</th>
              <th className="p-2">Date & Time</th>
              <th className="p-2">Doctor</th>
              <th className="p-2">Fees</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="odd:bg-gray-100 even:bg-white text-center"
              >
                <td className="p-2">
                  <img
                    src={patient.picture}
                    alt={patient.name}
                    className="w-10 h-10 rounded-full mx-auto"
                  />
                </td>
                <td className="p-2 text-gray-700">{patient.name}</td>
                <td className="p-2 text-gray-700">{patient.department}</td>
                <td className="p-2 text-gray-700">{patient.age}</td>
                <td className="p-2 text-gray-700">{patient.dateTime}</td>
                <td className="p-2 text-gray-700">{patient.doctor}</td>
                <td className="p-2 text-green-600 font-semibold">
                  {patient.fees}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
