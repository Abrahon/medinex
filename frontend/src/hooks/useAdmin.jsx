import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure"; // Ensure this is the correct import
import { AuthContext } from "@/context/AuthProvider";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); // Make sure this returns the correct Axios instance
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email && !loading) {
      axiosSecure
        .get(`/users/role?email=${user.email}`)
        .then((res) => {
          setIsAdmin(res.data.role === "admin");
          setIsAdminLoading(false);
        })
        .catch(() => {
          setIsAdmin(false);
          setIsAdminLoading(false);
        });
    } else {
      setIsAdmin(false);
      setIsAdminLoading(false);
    }
  }, [user, loading, axiosSecure]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
