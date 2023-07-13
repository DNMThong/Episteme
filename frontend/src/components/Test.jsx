import { Paper, Typography, useTheme } from "@mui/material";
import logo from "../assets/img/logo.svg";
const Test = () => {
  const theme = useTheme();
  console.log(theme.palette.primary);
  return (
    <div>
      <Typography variant="h2">Xin chào đã đến Episteme</Typography>
      <Typography variant="subtitle1">Xin chào đã đến Episteme</Typography>
      <Paper sx={{ width: "100%", height: "500px" }}>
        <img src={logo} alt="logo" width={200} />
        <Typography variant="h4">Xin chào</Typography>
      </Paper>
    </div>
  );
};

export default Test;
