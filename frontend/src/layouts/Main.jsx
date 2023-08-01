import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
   return (
      <>
         <Navbar />
         <Outlet />
      </>
   );
};

export default Main;
