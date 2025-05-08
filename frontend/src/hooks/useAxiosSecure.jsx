// src/hooks/useAxiosSecure.js

import { AuthContext } from "@/context/AuthProvider";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://medinex-tan.vercel.app", // Or your backend URL
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("access-token");

    // Set the Authorization header if the token exists
    if (token) {
      axiosSecure.defaults.headers.Authorization = `Bearer ${token}`;
    }

    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const status = error.response ? error.response.status : null;

        // For 401 or 403 errors, logout the user and redirect to the login page
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptors on component unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, logOut]);

  return axiosSecure; // Return the configured axios instance
};

export default useAxiosSecure;
