import { createContext, useContext, useEffect, useState } from "react";
import { getUserWithToken } from "./../services/authService";

const AuthContext = createContext();

function AuthProvider(props) {
   const [user, setUser] = useState(null);
   useEffect(() => {
      getUserWithToken(localStorage.getItem("token_episteme") || "").then(
         (response) => {
            setUser(response.data);
         }
      );
   }, []);

   const value = { user, setUser };
   return (
      <AuthContext.Provider value={value} {...props}></AuthContext.Provider>
   );
}

function useAuth() {
   const context = useContext(AuthContext);
   if (typeof context === "undefined")
      throw new Error("useAuth must be used within a AuthProvider");
   return context;
}

export { useAuth, AuthProvider };
