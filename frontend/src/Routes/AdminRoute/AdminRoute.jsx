import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import useAdmin from "@/hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) {
    return <div>Loading...</div>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/unauthorized" />;
};

export default AdminRoute;
