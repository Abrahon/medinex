// import { doctors } from "@/assets/assets/assets_frontend/assets";

import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  // const [doctor, setDoctor] = useState([]);
  useEffect(() => {
    fetch("https://medinex-tan.vercel.app/doctors")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Failed to fetch doctors:", error));
  }, []);

  const appInfo = {
    doctors,
    setDoctors,
  };
  return <AppContext.Provider value={appInfo}>{children}</AppContext.Provider>;
};
export default AppProvider;
