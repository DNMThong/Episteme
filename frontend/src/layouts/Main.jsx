import { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

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
      }}>
      <Navbar />
      <Box>
        <Outlet />
      </Box>
      <Box mt="auto">
        <Footer />
      </Box>
    </Box>
  );
};

export default Main;
