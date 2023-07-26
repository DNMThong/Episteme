import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from "./context/mode-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import CreatePostPage from "./pages/CreatePostPage";
import AdminLayout from "./layouts/AdminLayout";
import ListPostPage from "./pages/admin/ListPostPage";
import HomePage from "./pages/admin/HomePage";
import ListUsersPage from "./pages/admin/ListUsersPage";
import FormAddUserPage from "./pages/admin/FormAddUserPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ListCategoryPage from "./pages/admin/ListCategoryPage";
import FormAddCategoryPage from "./pages/admin/FormAddCategoryPage";
function App() {
  const { theme } = useMode();
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Routes>
          <Route path="/tao-bai-viet" element={<CreatePostPage />}></Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<HomePage />} />
            <Route path="users" element={<ListUsersPage />} />
            <Route path="users/add" element={<FormAddUserPage />} />
            <Route path="posts" element={<ListPostPage />} />
            <Route path="categories" element={<ListCategoryPage />} />
            <Route path="categories/add" element={<FormAddCategoryPage />} />
            <Route path="*" element={<Box p="20px">Not found</Box>} />
          </Route>
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
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
