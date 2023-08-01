/* eslint-disable react/prop-types */
import { CardMedia } from "@mui/material";

const CardPoster = ({ posterPath, width = "100%", height = "140px" }) => {
   return (
      <CardMedia
         component="img"
         alt="green iguana"
         width={width}
         height={height}
         image={posterPath}
      />
   );
};

export default CardPoster;
