import { Button } from "@mui/material";
import { tokens } from "../../constants/theme";
import { useMode } from "../../context/mode-context";

const ServiceProfileButton = ({ onClick = () => {}, label }) => {
   const {
      theme: { palette },
   } = useMode();
   const token = tokens(palette.mode);
   return (
      <Button
         onClick={onClick}
         variant="outlined"
         sx={{
            alignSelf: "center",
            color: token.textColor,
            height: "fit-content",
            borderColor: "currentColor",
            order: {
               md: 2,
               xs: 1,
            },
         }}
      >
         {label}
      </Button>
   );
};

export default ServiceProfileButton;
