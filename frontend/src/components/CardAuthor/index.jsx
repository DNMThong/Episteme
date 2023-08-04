import {
   Box,
   Button,
   Card,
   CardContent,
   CardMedia,
   Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { cardStyle } from "./style";
import { useMode } from "../../context/mode-context";
import { tokens } from "../../constants/theme";
import { DEFAULT_IMAGE } from "../../constants/default";

const CardAuthor = ({ data }) => {
   const { theme } = useMode();
   const token = tokens(theme.palette.mode);
   return (
      <NavLink to={"/author/add"}>
         <Card
            sx={{
               ...cardStyle.style,
            }}
         >
            <Box sx={cardStyle.cardMediaContainer}>
               <CardMedia
                  component="img"
                  sx={cardStyle.cardMedia}
                  image={data.image || DEFAULT_IMAGE.USER_AVATAR}
                  title="green iguana"
               />
            </Box>
            <CardContent sx={cardStyle.cardContent}>
               <Box className="card__title">
                  <Typography
                     gutterBottom
                     component="span"
                     sx={{
                        fontWeight: 600,
                        fontSize: "14px",
                     }}
                  >
                     Lizard
                  </Typography>
                  <Button
                     variant="outlined"
                     sx={{
                        color: token.text,
                        borderColor: "currentColor",
                        borderRadius: 4,
                        padding: "2px 8px",
                        fontSize: "12px",
                        textTransform: "none",
                     }}
                  >
                     Theo dõi
                  </Button>
               </Box>
               <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={cardStyle.cardText}
               >
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
               </Typography>
            </CardContent>
         </Card>
      </NavLink>
   );
};

export default CardAuthor;
