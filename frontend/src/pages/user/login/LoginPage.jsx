import {
   Box,
   Button,
   Container,
   Divider,
   Grid,
   TextField,
   Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";
import { useMode } from "../../../context/mode-context";
import { tokens } from "../../../constants/theme";
import { useAuth } from "../../../context/auth-context";
import { login } from "../../../services/authService";
import "./style.css";

const initialValues = {
   email: "",
   password: "",
};

const userSchema = yup.object().shape({
   email: yup
      .string()
      .email("Vui lòng nhập đúng định dạng email")
      .required("Vui lòng nhập email"),
   password: yup.string().required("Vui lòng nhập mật khẩu"),
});

const LoginPage = () => {
   const { theme, setMode } = useMode();
   const token = tokens(theme.palette.mode);
   const navigate = useNavigate();
   const { setUser } = useAuth();

   const [errorMessage, setErrorMessage] = useState("");

   const handleSubmitForm = async (values) => {
      // 1. Send info to server
      // 2. Set Token from response to LocalStorage
      // 3. Get set user
      await login(values)
         .then((res) => {
            setErrorMessage("");
            const { infoUser, token } = res.data;
            localStorage.setItem("token_episteme", token);
            setUser(infoUser);
            navigate("/");
         })
         .catch((error) => {
            console.log(error);
            setErrorMessage(
               "Email hoặc mật khẩu không hợp lê! Vui lòng kiểm tra lại!"
            );
         });
   };
   useEffect(() => setMode("light"), []);
   return (
      <>
         <Container
            sx={{
               height: "100vh",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            <Grid container alignItems={"center"} justifyContent={"center"}>
               <Grid item xs={12} md={3} sm={6}>
                  <Box
                     sx={{
                        color: token.textColor,
                        textAlign: "center",
                        "& .css-whuiwr-MuiFormHelperText-root.Mui-error": {
                           fontSize: "13px",
                        },
                     }}
                  >
                     <Typography
                        variant="h3"
                        sx={{
                           textAlign: "center",
                           textTransform: "uppercase",
                           marginBottom: 4,
                        }}
                     >
                        Đăng nhập
                     </Typography>
                     {errorMessage && (
                        <Typography
                           variant="h6"
                           component="p"
                           marginBottom={3}
                           sx={{ color: "red" }}
                        >
                           {errorMessage}
                        </Typography>
                     )}
                     <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        validationSchema={userSchema}
                     >
                        {({ errors, touched, handleChange, handleSubmit }) => (
                           <form onSubmit={handleSubmit}>
                              <TextField
                                 id="email"
                                 name="email"
                                 label="Email"
                                 type="email"
                                 sx={{
                                    width: "100%",
                                    marginBottom: 2,
                                 }}
                                 onChange={handleChange}
                                 error={!!touched.email && !!errors.email}
                                 helperText={!!touched.email && errors.email}
                              />
                              <TextField
                                 id="password"
                                 name="password"
                                 label="Mật khẩu"
                                 type="password"
                                 sx={{
                                    width: "100%",
                                    marginBottom: 2,
                                 }}
                                 onChange={handleChange}
                                 error={!!touched.password && !!errors.password}
                                 helperText={
                                    !!touched.password && errors.password
                                 }
                              />
                              <Button
                                 // disabled={isSubmitting}
                                 size="large"
                                 type="submit"
                                 variant="outlined"
                                 sx={{
                                    display: "block",
                                    color: "#fff",
                                    backgroundColor: token.greenAccent,
                                    borderColor: token.greenAccent,
                                    marginX: "auto",
                                    fontSize: "14px",
                                    marginBottom: 3,
                                    "&:hover": {
                                       backgroundColor: "#fff",
                                       color: token.greenAccent,
                                       borderColor: token.greenAccent,
                                    },
                                 }}
                              >
                                 Đăng nhập
                                 {/* {isSubmitting ? (
                                    <div className="loading-spin"></div>
                                 ) : (
                                    "Đăng nhập"
                                 )} */}
                              </Button>
                           </form>
                        )}
                     </Formik>
                     <Box
                        sx={{
                           position: "relative",
                           marginBottom: 3,
                        }}
                     >
                        <Divider></Divider>
                        <Typography
                           variant="subtitle2"
                           sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              fontWeight: 400,
                              padding: "4px 8px",
                              backgroundColor: "#fff",
                           }}
                        >
                           Hoặc
                        </Typography>
                     </Box>
                     <Button
                        fullWidth
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        sx={{
                           color: "#fff",
                           backgroundColor: "#183dd5",
                           marginBottom: 2,
                        }}
                     >
                        Google
                     </Button>
                     <Box
                        sx={{
                           fontSize: "14px",
                           "& a": {
                              color: token.greenAccent,
                           },
                           "& a > *": {
                              color: "inherit",
                           },
                        }}
                     >
                        <Link
                           to="/forgetPasswrod"
                           style={{
                              display: "inline-block",
                           }}
                        >
                           <Typography variant="subtitle2">
                              Quên mật khẩu?
                           </Typography>
                        </Link>
                        <Typography variant="subtitle2">
                           Chưa có tài khoản?{" "}
                           <Link to="/register">Đăng ký ngay</Link>
                        </Typography>
                     </Box>
                  </Box>
               </Grid>
            </Grid>
         </Container>
      </>
   );
};

export default LoginPage;
