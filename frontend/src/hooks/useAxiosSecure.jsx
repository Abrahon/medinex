// src/hooks/useAxiosSecure.js

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // Or your backend URL
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access-token");

    axiosSecure.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [navigate]);

  return axiosSecure; // 👈 this must be an Axios instance
};

export default useAxiosSecure;
