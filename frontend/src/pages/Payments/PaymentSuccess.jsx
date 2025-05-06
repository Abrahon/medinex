import { motion } from "framer-motion";

import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="my-10">
      <motion.div
        className="flex flex-col items-center justify-center mx-auto bg-green-100 p-4 w-1/2 "
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <CheckCircle size={80} color="#22c55e" className="mb-4" />
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          🎉Payment Successful!
        </h1>
        <p className="text-lg text-green-600">
          Thank you for your Payment. Your Appointment has been confirmed!
        </p>
        <Link
          to="/"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
