// {settings.map((setting) => (
//    <MenuItem key={setting} onClick={handleCloseUserMenu}>
//       <Typography textAlign="center">{setting}</Typography>
//    </MenuItem>
// ))}

import { MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const SettingItem = ({ onClick, label }) => {
   return (
      <>
         <MenuItem onClick={onClick}>
            <Typography textAlign="center">{label}</Typography>
         </MenuItem>
      </>
   );
};

// const settings = ["Tài khoản", "Thông báo", "Dashboard", "Đăng xuất"];
const Settings = () => {
   const { user, setUser } = useAuth();
   const navigate = useNavigate();
   const handleOpenUserProfile = () => navigate(`/profile/${user.id}`);
   const handleOpenNotifications = () => console.log("Open Notification");
   const handleOpenDraftPosts = () => console.log("Open Draft");
   const handleLogout = async () => {
      await localStorage.removeItem("token_episteme");
      setUser(null);
   };
   return (
      <>
         <SettingItem onClick={handleOpenUserProfile} label="Tài khoản" />
         <SettingItem onClick={handleOpenNotifications} label="Thông báo" />
         <SettingItem onClick={handleOpenDraftPosts} label="Bài viết nháp" />
         <SettingItem onClick={handleLogout} label="Đăng xuất" />
      </>
   );
};

export default Settings;
