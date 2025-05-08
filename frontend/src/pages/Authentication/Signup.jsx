import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthProvider";
import Swal from "sweetalert2";

const Signup = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const image =
      form.image.value || "https://i.ibb.co/2yT7VxT/default-user.png";
    const email = form.email.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    createUser(email, newPassword)
      .then(() => {
        return updateUserProfile(name, image);
      })
      .then(() => {
        const newUser = {
          name,
          email,
          image,
          role: "user",
        };

        return fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("User save response:", data); // For debugging

        if (data.insertedId || data.message === "User already exists") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        } else {
          Swal.fire("Warning", "Unexpected response from server.", "warning");
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
        Swal.fire("Error", error.message || "Something went wrong", "error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <label className="block text-gray-600 mb-1">Image Link</label>
            <input
              type="text"
              name="image"
              placeholder="Paste your profile image URL"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your Email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="newPassword"
              required
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
          >
            Sign Up
          </motion.button>

          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline text-red-600">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
