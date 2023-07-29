/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { formatDate } from "../../utils/DateUtil";

const CardFooter = ({ info }) => {
   return (
      <Box className="card__footer">
         <Typography component="span" variant="h5">
            {formatDate("2023-07-23T18:21:37.8013529")}
         </Typography>
         <Typography component="span" className="dot" />
         <Typography
            component="span"
            variant="h6"
            sx={{
               flex: 1,
               display: "-webkit-box",
               "-webkit-line-clamp": 1,
               "-webkit-box-orient": "vertical",
               overflow: "hidden",
               textOverflow: "ellipsis",
            }}
         >
            {info.author}
         </Typography>
      </Box>
   );
};

export default CardFooter;
