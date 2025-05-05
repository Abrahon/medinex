import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const DoctorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isDoctor, setIsDoctor] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users/role?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsDoctor(data.role === "doctor");
          setChecking(false);
        })
        .catch(() => {
          setIsDoctor(false);
          setChecking(false);
        });
    } else {
      setChecking(false);
    }
  }, [user]);

  if (loading || checking) return <p>Loading...</p>;

  return isDoctor ? children : <Navigate to="/" />;
};

export default DoctorRoute;
