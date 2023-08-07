import { Formik } from "formik";
import TabPanel from "./TabPanel";
import * as yup from "yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { changePassword } from "../../services/authService";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth-context";

const passwordInitialValues = {
   oldPassword: "",
   newPassword: "",
   confirmNewPassword: "",
};

const passwordSchema = yup.object().shape({
   oldPassword: yup.string().required("Vui lòng mật khẩu của bạn"),
   newPassword: yup
      .string()
      .required("Vui lòng điền mật khẩu mới")
      .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
      .max(32, "Mật khẩu phải ít hơn hoặc bằng 32 kí tự"),
   confirmNewPassword: yup
      .string()
      .oneOf(
         [yup.ref("newPassword"), null],
         "Xác nhận mật khẩu phải trùng với mật khẩu mới"
      )
      .required("Vui lòng nhập xác nhận mật khẩu"),
});

const ChangePasswordTab = ({ user, value, index }) => {
   const { setUser } = useAuth();
   const handleSubmitChangePasswordForm = async (values) => {
      const _value = {
         email: user.email,
         oldPassword: values.oldPassword,
         newPassword: values.newPassword,
      };
      await changePassword(_value)
         .then((response) => {
            toast.success("Đổi mật khẩu thành công");
            console.log(
               "🚀 ~ file: ChangePasswordTab.jsx:43 ~ .then ~ response.data?.infoUser:",
               response.data?.infoUser
            );
            setUser(response.data?.infoUser);
            localStorage.setItem("token_episteme", response.data?.token);
         })
         .catch(() => toast.error("Thay đổi mật khẩu thất bại"));
   };

   return (
      <TabPanel value={value} index={index}>
         {user && (
            <Formik
               onSubmit={handleSubmitChangePasswordForm}
               initialValues={passwordInitialValues}
               validationSchema={passwordSchema}
            >
               {({
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  handleBlur,
               }) => (
                  <form id="change-password" onSubmit={handleSubmit}>
                     <Grid
                        container
                        spacing={2}
                        direction="column"
                        sx={{
                           maxWidth: {
                              md: "450px",
                              xs: "100%",
                           },
                        }}
                     >
                        <Typography
                           component="h4"
                           variant="h4"
                           sx={{
                              textAlign: "center",
                           }}
                        >
                           Đổi mật khâu
                        </Typography>
                        <Grid
                           item
                           md={6}
                           sx={{
                              display: "flex",
                              flexFlow: "column",
                              gap: 1,
                           }}
                        >
                           <Typography
                              htmlFor="oldPassword"
                              variant="h5"
                              component="label"
                           >
                              Mật khẩu cũ
                           </Typography>
                           <TextField
                              type="password"
                              name="oldPassword"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                 !!touched.oldPassword && !!errors.oldPassword
                              }
                              helperText={
                                 !!touched.oldPassword && errors.oldPassword
                              }
                           ></TextField>
                        </Grid>
                        <Grid
                           item
                           md={6}
                           sx={{
                              display: "flex",
                              flexFlow: "column",
                              gap: 1,
                           }}
                        >
                           <Typography
                              htmlFor="newPassword"
                              variant="h5"
                              component="label"
                           >
                              Mật khẩu mới
                           </Typography>
                           <TextField
                              type="password"
                              name="newPassword"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                 !!touched.newPassword && !!errors.newPassword
                              }
                              helperText={
                                 !!touched.newPassword && errors.newPassword
                              }
                           ></TextField>
                        </Grid>
                        <Grid
                           item
                           md={6}
                           sx={{
                              display: "flex",
                              flexFlow: "column",
                              gap: 1,
                           }}
                        >
                           <Typography
                              htmlFor="confirmNewPassword"
                              variant="h5"
                              component="label"
                           >
                              Xác nhận mật khẩu mới
                           </Typography>
                           <TextField
                              type="password"
                              name="confirmNewPassword"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                 !!touched.confirmNewPassword &&
                                 !!errors.confirmNewPassword
                              }
                              helperText={
                                 !!touched.confirmNewPassword &&
                                 errors.confirmNewPassword
                              }
                           ></TextField>
                        </Grid>
                        <Grid
                           item
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              gap: 2,
                           }}
                        >
                           <Button variant="outlined">Hủy</Button>
                           <Button variant="contained" type="submit">
                              Thay đổi mật khẩu
                           </Button>
                        </Grid>
                     </Grid>
                  </form>
               )}
            </Formik>
         )}
      </TabPanel>
   );
};

export default ChangePasswordTab;
