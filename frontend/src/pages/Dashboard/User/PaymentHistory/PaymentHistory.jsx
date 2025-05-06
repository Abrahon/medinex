import { AuthContext } from "@/context/AuthProvider";
import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../../../context/AuthProvider";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/payment-history/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
      })
      .catch((err) => console.error("❌ Error fetching payments:", err));
  }, [user?.email]);

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">💳 Payment History</h2>
      <h3 className="text-xl my-2">Total Payments: {payments.length}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Dr Name</th>
              <th className="p-2 border">Fee</th>
              <th className="p-2 border">Transaction ID</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, index) => (
              <tr key={pay._id} className="text-center hover:bg-gray-50">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{pay.name || pay.doctorName}</td>
                <td className="p-2 border">${pay.amount}</td>
                <td className="p-2 border">{pay.transactionId}</td>
                <td className="p-2 border">
                  {new Date(pay.paymentTime).toLocaleString()}
                </td>
                <td className="p-2 border capitalize">{pay.status}</td>
                {/* <td className="p-2 border capitalize">{user.email}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
          <p className="text-center mt-4">No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
