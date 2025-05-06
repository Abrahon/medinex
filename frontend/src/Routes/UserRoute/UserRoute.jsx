import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isUser, setIsUser] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users/role?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsUser(data.role === "user");
          setChecking(false);
        })
        .catch(() => {
          setIsUser(false);
          setChecking(false);
        });
    } else {
      setChecking(false);
    }
  }, [user]);

  if (loading || checking) return <p>Loading...</p>;

  return isUser ? children : <Navigate to="/" />;
};

export default UserRoute;
