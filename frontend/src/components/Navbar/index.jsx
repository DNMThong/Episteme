import { useState } from "react";
import {
   AppBar,
   Avatar,
   Badge,
   Box,
   Button,
   Container,
   FormControlLabel,
   IconButton,
   Menu,
   MenuItem,
   Toolbar,
   Tooltip,
   Typography,
} from "@mui/material";
import { useMode } from "../../context/mode-context";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { flexRowMobile, getBackgroundColor } from "./style";
import { tokens } from "../../constants/theme";
import NavbarLogo from "./NavbarLogo";
import NavLinkButton from "./NavLinkButton";
import { SwitchTheme } from "../Switch";
import SearchIcon from "@mui/icons-material/Search";
import SearchBox from "./SearchBox";

const pages = [
   {
      text: "Trang chủ",
      to: "/",
   },
   {
      text: "Blog nổi bật",
      to: "/popularBlog",
   },
   {
      text: "Tác giả nổi bật",
      to: "/popularAuthor",
   },
   {
      text: "Về chúng tôi",
      to: "/aboutUs",
   },
];

const settings = ["Tài khoản", "Thông báo", "Dashboard", "Đăng xuất"];

function Navbar() {
   const { theme, toggleColorMode } = useMode();
   const { user } = useAuth();

   const token = tokens(theme.palette.mode);
   const textColor = token.text;

   const [anchorElNav, setAnchorElNav] = useState(null);
   const [anchorElUser, setAnchorElUser] = useState(null);
   const [showSearchBox, setShowSearchBox] = useState(false);

   const handleOpenSearch = () => {
      setShowSearchBox(true);
   };

   const handleCloseSearch = () => {
      setShowSearchBox(false);
   };

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   return (
      <AppBar
         position="static"
         sx={{
            backgroundImage: "none",
            backgroundColor: getBackgroundColor(theme),
            height: "64px",
            "& .logo": {
               color: textColor,
               display: {
                  xs: "none",
                  md: "flex",
               },
               textDecoration: "none",
            },
            "& .logo__img": {
               width: 60,
               height: "auto",
               display: { xs: "none", md: "flex" },
               mr: 2,
            },
            "& .logo__text": {
               color: textColor,
            },
            "& .logo--sm": {
               color: textColor,
               display: {
                  xs: "flex",
                  md: "none",
               },
               textDecoration: "none",
               columnGap: 2,
            },
            "& .logo__img--sm": {
               width: 60,
               height: "auto",
               display: { xs: "block", md: "none" },
            },

            "& .page__nav": {
               textDecoration: "none",
               color: textColor,
            },
            "& .page__nav.active": {
               color: token.greenAccent,
            },
            "& .btn__login, & .btn__register": {
               color: textColor,
               borderColor: "currentColor",
               borderRadius: 5,
            },
         }}
      >
         <Container
            maxWidth="lg"
            sx={{
               height: "100%",
            }}
         >
            {showSearchBox && <SearchBox onClose={handleCloseSearch} />}
            {!showSearchBox && (
               <Toolbar
                  disableGutters
                  sx={{
                     justifyContent: {
                        xs: "space-between",
                        md: "center",
                     },
                  }}
               >
                  <NavbarLogo type="tablet" />
                  <Box
                     sx={{
                        "flex-grow": 0,
                        display: { xs: "flex", md: "none" },
                     }}
                  >
                     <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                     >
                        <MenuIcon />
                     </IconButton>
                     <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                           vertical: "bottom",
                           horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                           vertical: "top",
                           horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                           display: { xs: "block", md: "none" },
                           "& a": {
                              textDecoration: "none",
                              color: textColor,
                           },
                        }}
                     >
                        {pages.map(({ text, to }) => (
                           <MenuItem key={to} onClick={handleCloseNavMenu}>
                              <NavLink to={to}>
                                 <Typography textAlign="center">
                                    {text}
                                 </Typography>
                              </NavLink>
                           </MenuItem>
                        ))}
                        {user && (
                           <MenuItem>
                              <NavLinkButton
                                 to="/tao-bai-viet"
                                 variant="outlined"
                                 sx={{
                                    color: textColor,
                                    borderColor: "currentColor",
                                    borderRadius: 5,
                                 }}
                                 startIcon={<EditIcon color={"inherit"} />}
                                 buttonText="Viết bài"
                              />
                           </MenuItem>
                        )}
                     </Menu>
                  </Box>
                  <Box sx={flexRowMobile()}>
                     <NavbarLogo type="mobile" />
                  </Box>
                  <Box
                     sx={{
                        flexGrow: 1,
                        // display: { xs: "none", md: "flex" },
                        display: { xs: "none", md: "flex" },
                        alignItems: "center",
                        "& .page__container": {
                           display: "flex",
                           justifyContent: "center",
                           columnGap: 4,
                           marginInline: "auto",
                        },
                     }}
                  >
                     <Box className="page__container">
                        {pages.map(({ text, to }) => (
                           <NavLink
                              className={({ isActive }) =>
                                 `page__nav ${isActive ? "active" : ""}`
                              }
                              key={to}
                              to={to}
                           >
                              <Typography
                                 variant="h5"
                                 component="span"
                                 onClick={handleCloseNavMenu}
                                 sx={{
                                    my: 2,
                                    display: "block",
                                    color: "inherit",
                                 }}
                              >
                                 {text}
                              </Typography>
                           </NavLink>
                        ))}
                     </Box>
                  </Box>

                  <Box
                     sx={{
                        flexGrow: 0,
                        borderLeft: {
                           xs: 0,
                           md: `2px solid ${theme.palette.divider}`,
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: {
                           xs: "flex-end",
                        },
                        columnGap: 2,
                        paddingInline: {
                           xs: "8px 0",
                           md: 2,
                        },
                        "& a[href='/tao-bai-viet']": {
                           display: {
                              xs: "none",
                              md: "flex",
                           },
                        },
                        "& a[href^='/']": {
                           textDecoration: "none",
                        },
                        "& a[href='/register']": {
                           display: {
                              xs: "none",
                              md: "block",
                           },
                        },
                     }}
                  >
                     {user ? (
                        <>
                           <Button
                              onClick={handleOpenSearch}
                              sx={{
                                 justifySelf: "flex-end !important",
                                 color: token.textColor,
                              }}
                           >
                              <SearchIcon
                                 fontSize="large"
                                 sx={{
                                    color: "inherit",
                                 }}
                              />
                           </Button>
                           <Badge
                              className="user__notification"
                              color="error"
                              badgeContent={user.noti}
                              sx={{
                                 display: {
                                    xs: "none",
                                    sm: "inline-flex",
                                 },
                                 color: textColor,
                                 cursor: "pointer",
                              }}
                           >
                              <NotificationsIcon />
                           </Badge>
                           <NavLinkButton
                              to="/tao-bai-viet"
                              buttonText="Viết bài"
                              variant="outlined"
                              textColor={textColor}
                              startIcon={<EditIcon color={"inherit"} />}
                           />

                           <Tooltip title={user.id}>
                              <IconButton
                                 onClick={handleOpenUserMenu}
                                 sx={{ p: 0 }}
                              >
                                 <Avatar
                                    alt="Remy Sharp"
                                    src={user.avatar || ""}
                                 />
                              </IconButton>
                           </Tooltip>
                           <ListMenuItemAccount
                              anchorElUser={anchorElUser}
                              handleCloseUserMenu={handleCloseUserMenu}
                              handleToggleMode={toggleColorMode}
                           />
                        </>
                     ) : (
                        <>
                           <NavLinkButton to="/login">
                              <Button className="btn__login" variant="outlined">
                                 Đăng nhập
                              </Button>
                           </NavLinkButton>
                           <NavLinkButton to="/register">
                              <Button
                                 className="btn__register"
                                 variant="outlined"
                              >
                                 Đăng ký
                              </Button>
                           </NavLinkButton>
                        </>
                     )}
                  </Box>
               </Toolbar>
            )}
         </Container>
      </AppBar>
   );
}

// eslint-disable-next-line react/prop-types
const ListMenuItemAccount = ({ anchorElUser, handleCloseUserMenu }) => {
   const { theme, toggleColorMode } = useMode();
   return (
      <Menu
         sx={{ mt: "45px" }}
         id="menu-appbar"
         anchorEl={anchorElUser}
         anchorOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         keepMounted
         transformOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         open={Boolean(anchorElUser)}
         onClose={handleCloseUserMenu}
      >
         <MenuItem>
            <FormControlLabel
               control={
                  <SwitchTheme
                     sx={{ m: 1 }}
                     defaultChecked
                     onClick={toggleColorMode}
                  />
               }
               label={theme.palette.mode === "dark" ? "Dark" : "Light"}
            />
         </MenuItem>
         {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
               <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
         ))}
      </Menu>
   );
};
export default Navbar;
