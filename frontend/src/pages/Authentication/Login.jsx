import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthProvider";
import Swal from "sweetalert2";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const Login = () => {
  const { signIn, signInGoogle, setUser, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const loginInfo = { email, password };

    signIn(email, password)
      .then((result) => {
        console.log("successfully logged in: ", result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const googleProvider = new GoogleAuthProvider();

  // make sure the path is correct
  const handleGoogleSignIn = () => {
    signInGoogle(googleProvider)
      .then(async (result) => {
        const user = result.user;

        const newUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: "user",
        };

        try {
          // Step 1: Get JWT token
          const jwtRes = await axios.post(
            "https://medinex-tan.vercel.app/jwt",
            {
              email: user.email,
            }
          );

          const token = jwtRes.data.token;
          localStorage.setItem("access-token", token);

          // Step 2: Try to get the user's role
          let role;
          try {
            const roleRes = await axios.get(
              `https://medinex-tan.vercel.app/users/role?email=${user.email}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            role = roleRes.data.role;
          } catch (err) {
            if (err.response && err.response.status === 404) {
              // User not found → create it
              await axios.post(
                "https://medinex-tan.vercel.app/users",
                newUser,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              role = "user"; // default role
            } else {
              throw err; // some other error
            }
          }

          // Optional: setRole(role) if you exposed it in context

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Signed in successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/");
        } catch (error) {
          console.error("Google login error:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Google login failed!",
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSignIn} className="space-y-5">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              name="email"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              name="password"
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
          >
            Sign In
          </motion.button>

          <div className="flex justify-center items-center mt-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="transform transition-transform duration-300 hover:scale-110"
            >
              <FcGoogle className="text-5xl animate-bounce" />
            </button>
          </div>
          <p className="text-sm">
            Create a New Account{" "}
            <span className="text-green-600 cursor-pointer underline">
              <Link to="/sign-up">signUp</Link>
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
