// const { createContext } = require("react");

import app from "@/firebase/firebase.init";
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
// import app from "./Firebase/firebase.init";
export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const googleProvide = new GoogleAuthProvider();

  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // fro existing user
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
        axios
          .get(`http://localhost:5000/users/role?email=${currentUser.email}`)
          .then((res) => {
            setRole(res.data?.role); // Expects 'admin', 'doctor', 'user', etc.
          })
          .catch(() => setRole(null));
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     console.log('Current user:', currentUser);
  //     setUser(currentUser);
  //     setLoadaing(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  const authInfo = {
    user,
    createUser,
    signIn,
    updateUserProfile,
    logOut,
    signInGoogle,
    role,
    loading,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
