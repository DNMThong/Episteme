import { Box, Typography } from "@mui/material";
import image from "../../../assets/img/ngongbagang.png";
import { useEffect } from "react";

const About = ({ title }) => {
   useEffect(() => {
      document.title = title;
   }, []);
   return (
      <Box
         sx={{
            textAlign: "center",
            mt: "70px",
         }}
      >
         <Typography
            variant="h1"
            sx={{
               backgroundImage: `linear-gradient(96.38deg, rgb(72, 202, 125) -0.67%, rgb(72, 202, 125) 31.53%, rgb(56, 182, 255) 61.61%, rgb(56, 182, 255) 100.67%)`,
               backgroundClip: "text",
               WebkitBackgroundClip: "text",
               color: "transparent",
            }}
         >
            Ngỗng Ba Gang
         </Typography>
         <Typography
            variant="h5"
            sx={{
               mt: "20px",
            }}
         >
            Chúng tôi chỉ đơn giản là những chú ngỗng ba gang luôn hoàn thành
            nhiệm vụ cùng nhau
         </Typography>
         <Box
            sx={{
               width: "100%",
               maxWidth: "400px",
               margin: "40px auto",
            }}
         >
            <img
               style={{ width: "100%", objectFit: "cover" }}
               className="image"
               src={image}
               alt="ngong-ba-gang"
            />
         </Box>
      </Box>
   );
};

export default About;
