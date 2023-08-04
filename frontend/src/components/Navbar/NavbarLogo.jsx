import { Avatar, Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.svg";

// eslint-disable-next-line react/prop-types
const NavbarLogo = ({ type = "tablet" }) => {
  return (
    <NavLink to="/" className={type === "tablet" ? "logo" : "logo--sm"}>
      <Box mr={0}>
        <Avatar
          className={type === "tablet" ? "logo__img" : "logo__img--sm"}
          src={logo}
        />
      </Box>
      <Box
        className="logo__text"
        sx={{
          display: "flex",
          flexFlow: "column",
          fontFamily: "inherit",
          letterSpacing: "0.05rem",
          textDecoration: "none",
          textAlign: "center",
        }}>
        <Typography variant="h5" component="span" className="logo__text-name">
          Episteme
        </Typography>
        <Typography variant="body2" component="span">
          Inspire, learn, grow
        </Typography>
      </Box>
    </NavLink>
  );
};

export default NavbarLogo;
