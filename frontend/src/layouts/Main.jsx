import { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Box, Paper } from "@mui/material";

const Main = () => {
   useEffect(() => {
      document.title = "Trang chủ";
   }, []);
   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
         }}
      >
         <Navbar />
         <Box minHeight="65vh">
            <Outlet />
         </Box>
         <Paper mt="auto">
            <Footer />
         </Paper>
      </Box>
   );
};

export default Main;
