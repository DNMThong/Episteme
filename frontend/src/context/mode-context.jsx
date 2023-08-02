import { createTheme } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";
import { themeSettings } from "../constants/theme";

const ModeContext = createContext();

export const ModeProvider = (props) => {
   const [mode, setMode] = useState("dark");

   const toggleColorMode = () =>
      setMode((prev) => (prev === "light" ? "dark" : "light"));

   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

   const value = {
      toggleColorMode,
      theme,
      setMode,
   };
   return (
      <ModeContext.Provider value={value} {...props}></ModeContext.Provider>
   );
};

export const useMode = () => {
   const context = useContext(ModeContext);
   if (typeof context === "undefined")
      throw new Error("useAuth must be used within AuthProvider");
   return context;
};
