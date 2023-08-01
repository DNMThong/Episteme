import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
   const [user, setUser] = useState({
      id: "whisper",
      gmail: "whisper14802@gmail.com",
      avatar:
         "https://cdn.discordapp.com/attachments/911999301717200906/1129624110931120329/323817117_1263876954160070_4031113429306859744_n.jpg",
      noti: 4,
   });
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
