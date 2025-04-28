import { doctors } from "@/assets/assets/assets_frontend/assets";

import { createContext } from "react";



export const AppContext = createContext()

const AppProvider = ({children})=>{
    

    const appInfo = {
        doctors
    }
    return(
       <AppContext.Provider value={appInfo}>
           {children}
       </AppContext.Provider>
    );
};
export default AppProvider;