import { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useMode } from "../../../context/mode-context";
import { tokens } from "../../../constants/theme";

const initialValues = {
   fullName: "",
   email: "",
   password: "",
   confirmPassword: "",
};

const userSchema = yup.object().shape({
   fullName: yup.string().required("Vui lòng nhập họ và tên"),
   email: yup
      .string()
      .email("Vui lòng nhập đúng định dạng email")
      .required("Vui lòng nhập email"),
   password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
      .max(32, "Mật khẩu phải ít hơn hoặc bằng 32 kí tự"),
   confirmPassword: yup
      .string()
      .oneOf(
         [yup.ref("password"), null],
         "Xác nhận mật khẩu phải trùng với mật khẩu"
      )
      .required("Vui lòng nhập xác nhận mật khẩu"),
});

const RegisterPage = () => {
   const { setMode } = useMode();
   const token = tokens("light");
   const handleSubmitForm = (values) => {
      console.log("submit");
      console.log(values);
   };
   useEffect(() => setMode("light"), []);
   return (
      <>
         <Container
            sx={{
               position: "fixed",
               inset: 0,
            }}
         >
            <Grid
               container
               alignItems={"center"}
               justifyContent={"center"}
               sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
               }}
            >
               <Grid item xs={12} md={3}>
                  <Box
                     sx={{
                        color: token.textColor,
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
                        Đăng ký
                     </Typography>
                     <Formik
                        initialValues={initialValues}
                        validationSchema={userSchema}
                        handleSubmit={handleSubmitForm}
                     >
                        {({ touched, errors, handleChange, handleSubmit }) => (
                           <form onSubmit={handleSubmit}>
                              <TextField
                                 id="fullName"
                                 name="fullName"
                                 label="Họ và tên"
                                 type="text"
                                 sx={{
                                    width: "100%",
                                    marginBottom: 2,
                                 }}
                                 onChange={handleChange}
                                 error={!!touched.fullName && !!errors.fullName}
                                 helperText={
                                    !!touched.fullName && errors.fullName
                                 }
                              />
                              <TextField
                                 id="email"
                                 name="email"
                                 label="Email"
                                 type="text"
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
                              <TextField
                                 id="confirmPassword"
                                 name="confirmPassword"
                                 label="Xác nhận mật khẩu"
                                 type="password"
                                 sx={{
                                    width: "100%",
                                    marginBottom: 2,
                                 }}
                                 onChange={handleChange}
                                 error={
                                    !!touched.confirmPassword &&
                                    !!errors.confirmPassword
                                 }
                                 helperText={
                                    !!touched.confirmPassword &&
                                    errors.confirmPassword
                                 }
                              />
                              <Button
                                 type="submit"
                                 size="large"
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
                                 Đăng ký
                              </Button>
                           </form>
                        )}
                     </Formik>
                     <Box
                        sx={{
                           position: "relative",
                           marginBottom: 3,
                           left: "50%",
                           transform: "translateX(-50%)",
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
                     <Typography
                        component="p"
                        textAlign="center"
                        sx={{
                           "& a[href='/login']": {
                              color: token.greenAccent,
                           },
                        }}
                     >
                        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                     </Typography>
                  </Box>
               </Grid>
            </Grid>
         </Container>
      </>
   );
};

export default RegisterPage;
