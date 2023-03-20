import { createContext,useEffect,useState } from "react";

export const userContext = createContext();

export const UserProvider = ({children})=>{
    const [userData,setuserData] = useState({});

useEffect(()=>{
    },[userData]);
    
    return (<userContext.Provider value={{userData,setuserData}}>{children}</userContext.Provider>)
}