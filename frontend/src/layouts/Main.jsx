import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
   return (
      <>
         <Navbar />
         <Outlet />
         <Footer />
      </>
   );
};

export default Main;
