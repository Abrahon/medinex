
// const { createContext } = require("react");

import app from "@/firebase/firebase.init";
import axios from "axios";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword, updateProfile,signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
// import app from "./Firebase/firebase.init";
export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
  const[user,setUser] = useState(null);
  const[loading,setLoadaing] = useState(true);
  const googleProvide = new GoogleAuthProvider()


  // create user
  const createUser = (email, password)=>{
    setLoadaing(true)
    return createUserWithEmailAndPassword(auth, email, password)
  };
  
  

  // fro existing user
  const signIn = (email, password)=>{
    setLoadaing(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInGoogle = ()=>{
    setLoadaing(true);
    return signInWithPopup(auth, googleProvide);
}
  const logOut = () => {
    setLoadaing(true);
    return signOut(auth);
}

const updateUserProfile = (name, photo) => {
  return updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: photo,
  });
};


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log('Current user:', currentUser);
    setUser(currentUser);
    setLoadaing(false);
  });

  return () => unsubscribe();
}, []);

  
  const authInfo={
    user,
    createUser,
    signIn,
    updateUserProfile,
    logOut,
    signInGoogle,
    


  }
  return (
    <div>
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider