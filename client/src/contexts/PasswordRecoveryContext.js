import { useState } from "react";
import { createContext } from "react";

export const PasswordRecoveryContext = createContext(null);

export const PasswordRecoveryProvider = ({ children }) => {
    //const [page, setPage] = useState("login");
    const [email, setEmail] = useState();
    const [otp, setOTP] = useState();
  
    // function NavigateComponents() {
    //   if (page === "login") return <Login />;
    //   if (page === "otp") return <OTPInput />;
    //   if (page === "reset") return <Reset />;
  
    //   return <Recovered />;
    // }
  
    return (
      <PasswordRecoveryContext.Provider
        value={{ otp, setOTP, setEmail, email }}
      >
        {children}
      </PasswordRecoveryContext.Provider>
    );
 
  

  
};