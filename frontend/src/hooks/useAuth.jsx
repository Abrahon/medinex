import AuthProvider from "@/context/AuthProvider";
import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
  const auth = useContext(AuthProvider);
  return auth;
};

export default useAuth;
