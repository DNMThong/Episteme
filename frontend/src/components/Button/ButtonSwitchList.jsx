import { useMode } from "../../context/mode-context";
import { tokens } from "../../constants/theme";
import { Button } from "@mui/material";

const ButtonSwitchList = ({ text, onClick = () => {}, active }) => {
   const { theme } = useMode();
   const token = tokens(theme.palette.mode);

   return (
      <Button
         variant="outlined"
         component="span"
         sx={{
            flexShrink: 0,
            width: "fit-content",
            wordBreak: "normal",
            wordWrap: "normal",
            borderColor: active ? "initial" : "transparent",
            color: token.text,
         }}
         onClick={onClick}
      >
         {text}
      </Button>
   );
};

export default ButtonSwitchList;
