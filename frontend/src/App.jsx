import { Button, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from "./context/mode-context";
import Editor from "./components/editor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import CreatePostPage from "./pages/CreatePostPage";
function App() {
  const { theme, toggleColorMode } = useMode();
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/tao-bai-viet" element={<CreatePostPage />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.palette.mode}
      />
    </ThemeProvider>
  );
}

export default App;
