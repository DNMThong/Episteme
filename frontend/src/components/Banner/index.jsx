import { Box, Container } from "@mui/material";
import banner from "../../assets/img/episteme.mp4";
import overlay from "../../assets/img/episteme.jpg";

const Banner = () => {
   return (
      <Container
         sx={{
            my: 5,
            "& img, & video": {
               objectFit: "cover",
               display: "block",
               width: "100%",
               height: "100%",
               borderRadius: 4,
               position: "relative",
               zIndex: 15,
            },
         }}
      >
         <Box
            sx={{
               position: "relative",
               zIndex: 10,
               height: {
                  xs: 200,
                  sm: 300,
                  md: 400,
               },
               "& video.video": {
                  display: {
                     xs: "none",
                     sm: "block",
                  },
                  objectPosition: {
                     xs: "-15px",
                     md: "-50px",
                     lg: 0,
                  },
               },
               "& .backgroundImage": {
                  position: "absolute",
                  objectPosition: {
                     xs: "-15px",
                     md: 0,
                  },
                  filter: {
                     sm: "blur(12px)",
                     xs: "none",
                  },
                  top: 0,
                  left: 0,
                  zIndex: -1,
               },
            }}
         >
            <video muted autoPlay loop className="video">
               <source src={banner} type="video/mp4" />
            </video>
            <img className="backgroundImage" src={overlay} alt="" />
         </Box>
      </Container>
   );
};

export default Banner;
