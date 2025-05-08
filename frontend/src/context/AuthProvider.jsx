import app from "@/firebase/firebase.init";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import axios from "axios";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const googleProvide = new GoogleAuthProvider();

  // Create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // For existing user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvide);
  };

  const logOut = () => {
    setLoading(true);
    setRole(null);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        // Get JWT token from server
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);

            // Fetch role without `useNavigate`
            axios
              .get(
                `http://localhost:5000/users/role?email=${currentUser.email}`,
                {
                  headers: {
                    Authorization: `Bearer ${res.data.token}`,
                  },
                }
              )
              .then((res) => {
                setRole(res.data?.role); // Expects 'admin', 'doctor', 'user', etc.
              })
              .catch(() => setRole(null));
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    createUser,
    signIn,
    updateUserProfile,
    logOut,
    signInGoogle,
    role,
    loading,
    setUser, // Add this
    setRole,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
