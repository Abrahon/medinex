import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
// import CheckoutForm from './CheckoutForm'
import { useParams } from "react-router-dom";
import CheckoutFrom from "./CheckoutFrom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const [appointment, setAppointment] = useState(null);
  const { appointmentId } = useParams();
  console.log("payment id", appointmentId);
  console.log("appointment data:", appointment?.fees);
  console.log(appointmentId);

  useEffect(() => {
    fetch(`http://localhost:5000/bookings/${appointmentId}`)
      .then((res) => res.json())
      .then((data) => {
        setAppointment(data);
      })
      .catch((error) => {
        console.error("Failed to fetch booking:", error);
      });
  }, [appointmentId]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Appointment Payment</h1>
      {/* <p>Price: $<span className="font-semibold">{appointment?.fees}</span></p> */}

      {appointment?.fees && (
        <Elements stripe={stripePromise}>
          <CheckoutFrom
            bookingId={appointmentId}
            fees={appointment?.fees}
            doctorName={appointment?.doctorName}
          />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
