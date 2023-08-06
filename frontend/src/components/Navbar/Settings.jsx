// {settings.map((setting) => (
//    <MenuItem key={setting} onClick={handleCloseUserMenu}>
//       <Typography textAlign="center">{setting}</Typography>
//    </MenuItem>
// ))}

import { MenuItem, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import LogoutHooks from './LogoutHooks';

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
    const location = useLocation();
    const navigate = useNavigate();
    console.log('🚀 ~ file: Settings.jsx:25 ~ Settings ~ location:', location);
    const handleOpenUserProfile = () => navigate(`/profile/${user.id}`);
    const handleOpenNotifications = () => console.log('Open Notification');
    const handleOpenDraftPosts = () => console.log('Open Draft');
    const handleOpenAdminPage = () => navigate('/admin');
    return (
        <>
            {user.role == 'ADMIN' && <SettingItem onClick={handleOpenAdminPage} label="Admin" />}
            <SettingItem onClick={handleOpenUserProfile} label="Tài khoản" />
            <SettingItem onClick={handleOpenNotifications} label="Thông báo" />
            <SettingItem onClick={handleOpenDraftPosts} label="Bài viết nháp" />
            <LogoutHooks />
        </>
    );
};

export default Settings;
