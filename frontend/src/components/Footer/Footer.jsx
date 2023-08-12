import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Box,
   Container,
   Divider,
   Grid,
   Paper,
   Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logoSVG from "../../assets/img/logo.svg";
import { Height, Troubleshoot } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useMode } from "../../context/mode-context";
import { tokens } from "../../constants/theme";
const Footer = () => {
   const { theme } = useMode();
   const token = tokens(theme.palette.mode);
   return (
      <Paper
         sx={{
            paddingBlock: 3,
         }}
      >
         <Container>
            <Grid container columnGap={2} rowGap={3}>
               <Grid item lg={2} md={2} xs={12}>
                  <Box
                     display="flex"
                     alignItems="center"
                     flexDirection="column"
                     gap={3}
                  >
                     <img
                        src={logoSVG}
                        alt="Episteme"
                        style={{
                           // width: "70%",
                           // height: "69px",
                           objectFit: "cover",
                        }}
                     />
                     <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        gap={1}
                     >
                        <Typography component="span" variant="h5">
                           Episteme
                        </Typography>
                        <Typography
                           component="span"
                           variant="h5"
                           sx={{
                              fontSize: {
                                 xs: "10px",
                                 md: "12px",
                              },
                           }}
                        >
                           Learn, Grow & Inspire
                        </Typography>
                     </Box>
                  </Box>
               </Grid>
               <Grid item xs={12} md={3} sm={4}>
                  <Box
                     display="flex"
                     gap={2}
                     flexDirection="column"
                     sx={{
                        "& > *": {
                           color: token.text,
                        },
                        "& li:hover": {
                           color: token.greenAccent,
                           cursor: "pointer",
                        },
                     }}
                  >
                     <Typography
                        component="h6"
                        variant="h5"
                        textTransform="uppercase"
                     >
                        Tài nguyên
                     </Typography>
                     <Box
                        component="ul"
                        display="flex"
                        gap={1}
                        flexDirection="column"
                        margin={0}
                        padding={0}
                        sx={{
                           listStyle: "none",
                        }}
                     >
                        <Box component="li">
                           <Typography component="span" variant="h6">
                              Bài viết
                           </Typography>
                        </Box>
                        <Box component="li">
                           <Typography component="span" variant="h6">
                              Tác giả
                           </Typography>
                        </Box>
                        <Box component="li">
                           <Typography component="span" variant="h6">
                              Tags
                           </Typography>
                        </Box>
                     </Box>
                  </Box>
               </Grid>
               <Grid item xs={12} md={3} sm={4}>
                  <Box
                     display="flex"
                     gap={2}
                     flexDirection="column"
                     sx={{
                        "& > *": {
                           color: token.text,
                        },
                        "& li:hover": {
                           color: token.greenAccent,
                           cursor: "pointer",
                        },
                     }}
                  >
                     <Typography
                        component="h6"
                        variant="h5"
                        textTransform="uppercase"
                     >
                        Về chúng tôi
                     </Typography>
                     <Box
                        component="ul"
                        display="flex"
                        gap={1}
                        flexDirection="column"
                        margin={0}
                        padding={0}
                        sx={{
                           listStyle: "none",
                        }}
                     >
                        <Box component="li">
                           <Typography component="span" variant="h6">
                              Đội ngũ phát triển
                           </Typography>
                        </Box>
                        <Box component="li">
                           <Typography component="span" variant="h6">
                              Điều khoản sử dụng
                           </Typography>
                        </Box>
                        <Box component="li">
                           <Typography component="span" variant="h6">
                              Về chúng tôi
                           </Typography>
                        </Box>
                     </Box>
                  </Box>
               </Grid>
               <Grid item xs={12} md={3} sm={4}>
                  <Box
                     display="flex"
                     gap={2}
                     flexDirection="column"
                     sx={{
                        "& > *": {
                           color: token.text,
                        },
                        "& li:hover": {
                           color: token.greenAccent,
                           cursor: "pointer",
                        },
                     }}
                  >
                     <Typography
                        component="h6"
                        variant="h5"
                        textTransform="uppercase"
                     >
                        Liên hệ
                     </Typography>
                     <Box
                        component="ul"
                        display="flex"
                        gap={1}
                        flexDirection="column"
                        margin={0}
                        padding={0}
                        sx={{
                           listStyle: "none",
                        }}
                     >
                        <Box component="li">
                           <Typography component="span" variant="h6">
                              Đội ngũ phát triển
                           </Typography>
                        </Box>
                        <Box component="li">
                           <Typography
                              component="span"
                              variant="h6"
                           ></Typography>
                        </Box>
                        <Box component="li">
                           <Typography
                              component="span"
                              variant="h6"
                           ></Typography>
                        </Box>
                     </Box>
                  </Box>
               </Grid>
               <Grid item xs={12} marginX="auto">
                  <Divider></Divider>
               </Grid>
               <Grid item xs={12} alignItems="center">
                  <Typography
                     variant="subtitle2"
                     component="p"
                     sx={{
                        width: "100%",
                        textAlign: "center",
                     }}
                  >
                     © 2023 Episteme. All rights reserved.
                  </Typography>
               </Grid>
            </Grid>
         </Container>
      </Paper>
   );
};
export default Footer;
