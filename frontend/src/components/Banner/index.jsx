import { Box, Container } from "@mui/material";

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
      }}>
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          height: "400px",
          "& .backgroundImage": {
            position: "absolute",
            filter: "blur(12px)",
            top: 0,
            left: 0,
            zIndex: -1,
          },
        }}>
        <video muted autoPlay loop className="video">
          <source src="episteme.mp4" type="video/mp4" />
        </video>
        <img className="backgroundImage" src="episteme.jpg" alt="" />
      </Box>
    </Container>
  );
};

export default Banner;
