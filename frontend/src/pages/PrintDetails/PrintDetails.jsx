import React from "react";
import { useLocation, useParams } from "react-router-dom";

const PrintDetails = () => {
  //   const { id } = useParams();
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return <p>No data to display.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Appointment Summary</h2>
      <p>
        <strong>Doctor:</strong> {data.doctorName}
      </p>
      <p>
        <strong>Appointment Time:</strong> {data.appointmentTime}
      </p>
      <p>
        <strong>Doctor Email:</strong> {data.doctorEmail}
      </p>
      <p>
        <strong>Patient Name:</strong> {data.fullName}
      </p>
      <p>
        <strong>Phone:</strong> {data.phone}
      </p>
      <p>
        <strong>Age:</strong> {data.age}
      </p>
      <p>
        <strong>Gender:</strong> {data.gender}
      </p>
      <p>
        <strong>Payment Method:</strong> {data.paymentMethod}
      </p>
      <p>
        <strong>Status:</strong> {data.status}
      </p>
      <p>
        <strong>Fees:</strong> {data.fees}
      </p>
    </div>
  );
};

export default PrintDetails;
