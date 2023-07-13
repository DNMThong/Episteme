import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import Test from "./components/Test";
import { useMode } from "./context/mode-context";

function App() {
  const { theme, toggleColorMode } = useMode();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button
        variant="contained"
        sx={{
          color: "#fff",
          fontWeight: 600,
        }}
        onClick={toggleColorMode}>
        Click
      </Button>
      <Test></Test>
    </ThemeProvider>
  );
}

export default App;
