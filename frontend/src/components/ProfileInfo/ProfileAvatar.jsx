import { Avatar } from "@mui/material";

const ProfileAvatar = ({ user }) => {
   if (!user) return null;
   return (
      <Avatar
         alt={user?.fullname || user?.id || user?.email}
         src={user?.image}
         sx={{
            "& .MuiAvatar-root .MuiAvatar-circular": {
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
            },
            marginX: "auto",
            maxWidth: "80px",
            width: "100%",
            height: "80px",
            marginBottom: {
               sm: 2,
               md: 0,
            },
         }}
      />
   );
};

export default ProfileAvatar;
