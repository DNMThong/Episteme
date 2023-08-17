import { Box, Typography } from "@mui/material";

const ProfileInfo = ({ userInfo }) => {
   if (!userInfo) return null;
   return (
      <Box
         component="div"
         sx={{
            display: "flex",
            flexFlow: "column",
            order: {
               xs: 2,
               md: 1,
            },
            rowGap: {
               md: "8px",
            },
         }}
      >
         <Typography variant="h5">{userInfo?.fullname}</Typography>
         <Typography
            variant="subtitle2"
            component="span"
            sx={{ fontSize: "12px" }}
         >
            @{userInfo?.email}
         </Typography>
      </Box>
   );
};

export default ProfileInfo;
