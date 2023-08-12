import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  useEffect(() => {
    document.title = "Trang chủ";
  });
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Main;
