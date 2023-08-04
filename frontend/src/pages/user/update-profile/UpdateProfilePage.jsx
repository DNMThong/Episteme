import {
   Avatar,
   Box,
   Button,
   Container,
   Grid,
   Paper,
   Tab,
   Tabs,
   TextField,
   Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";

const UpdateProfilePage = () => {
   const { userId } = useParams();
   const [value, setValue] = useState(0);
   const [selectedFile, setSelectedFile] = useState(null);
   const { user } = useAuth();

   const userInitialValues = {
      id: "",
      gmail: "",
      avatar: "",
      birthday: "",
      description: "",
   };

   useEffect(() => {
      if (user !== null) {
         userInitialValues.id = user.id;
         userInitialValues.gmail = user.gmail;
         userInitialValues.avatar = user.avatar;
         userInitialValues.birthday = user.birthday;
         userInitialValues.description = user.description;
         if (user.avatar) setSelectedFile(user.avatar);
         if (selectedFile) {
            const formData = new FormData();
            formData.append("myFile", selectedFile, selectedFile.name);
            userInitialValues.avatar = selectedFile;
         }
      }
   }, []);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const onFileUpload = (e) => {
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
      console.log(setSelectedFile);
   };

   return (
      <>
         <Paper
            sx={{
               marginBottom: 5,
               textAlign: "center",
               paddingBlock: {
                  md: 5,
                  xs: 2,
               },
               letterSpacing: {
                  md: "0.5px",
               },
               fontSize: {
                  md: 32,
               },
               fontWeight: {
                  md: 600,
               },
            }}
         >
            ACCOUNT
         </Paper>
         <Container>
            <Grid container spacing={3}>
               <Grid item md={3} xs={12}>
                  <Tabs
                     // orientation="vertical"
                     className="tabs"
                     variant="scrollable"
                     value={value}
                     onChange={handleChange}
                     sx={{
                        borderRight: 1,
                        borderColor: "divider",
                        flexFlow: { md: "column", xs: "row" },
                        "& .MuiTabs-indicator": {
                           display: "none",
                        },
                        height: {
                           md: "600px",
                           xs: "fit-content",
                        },

                        "& .MuiTabs-scroller .MuiTabs-hideScrollbar .MuiTabs-scrollableX":
                           {
                              height: {
                                 md: "100%",
                                 xs: "fit-content",
                              },
                           },

                        "& .MuiTabs-flexContainer": {
                           justifyContent: {
                              xs: "center",
                              md: "flex-start",
                           },
                           height: {
                              md: "100%",
                              xs: "fit-content",
                           },
                           flexFlow: { md: "column", xs: "row" },
                        },
                     }}
                  >
                     <Tab label="Cập nhật thông tin" {...a11yProps(0)} />
                     <Tab label="Đổi mật khẩu" {...a11yProps(1)} />
                  </Tabs>
               </Grid>
               <Grid item md={9} xs={12}>
                  <TabPanel value={value} index={0}>
                     <Grid
                        container
                        component="form"
                        action=""
                        columnSpacing={2}
                        rowSpacing={3}
                     >
                        <Grid
                           item
                           md={12}
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                              columnGap: 3,
                              "label[for='image']": {
                                 width: {
                                    xs: "80px",
                                    md: "120px",
                                 },
                                 height: {
                                    xs: "80px",
                                    md: "120px",
                                 },
                                 verticalAlign: "middle",
                                 textAlign: "center",
                                 cursor: "pointer",
                              },
                              ".update-img-btn": {
                                 height: "fit-content",
                              },
                              ".img-label": {
                                 display: "block",
                                 width: "100%",
                                 marginBottom: 1,
                              },
                           }}
                        >
                           <Typography
                              component="span"
                              variant="h5"
                              className="img-label"
                           >
                              Ảnh đại diện
                           </Typography>
                           <input
                              type="file"
                              hidden
                              id="image"
                              onChange={onFileUpload}
                           />
                           <label htmlFor="image">
                              <Avatar
                                 sx={{ width: "100%", height: "100%" }}
                                 src={selectedFile}
                              />
                           </label>
                           <Button
                              variant="contained"
                              className="update-img-btn"
                           >
                              Cập nhật ảnh
                           </Button>
                           <Button
                              variant="outlined"
                              className="update-img-btn"
                           >
                              Xóa
                           </Button>
                        </Grid>
                        <Grid
                           item
                           xs={12}
                           sx={{
                              display: "flex",
                              flexFlow: "column",
                              rowGap: 3,
                           }}
                        >
                           <Box
                              sx={{
                                 display: "flex",
                                 flexFlow: "column",
                                 gap: 1,
                              }}
                           >
                              <Typography
                                 htmlFor="fullName"
                                 variant="h5"
                                 component="label"
                              >
                                 Họ và tên
                              </Typography>
                              <TextField name="fullName"></TextField>
                           </Box>
                        </Grid>
                        <Grid item md={8} sm={6} xs={12}>
                           <Box
                              sx={{
                                 display: "flex",
                                 flexFlow: "column",
                                 gap: 1,
                              }}
                           >
                              <Typography
                                 htmlFor="email"
                                 variant="h5"
                                 component="label"
                              >
                                 Email
                              </Typography>
                              <TextField name="email" id="email"></TextField>
                           </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                           <Box
                              sx={{
                                 display: "flex",
                                 flexFlow: "column",
                                 gap: 1,
                              }}
                           >
                              <Typography
                                 htmlFor="birthday"
                                 variant="h5"
                                 component="label"
                              >
                                 Ngày sinh
                              </Typography>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                 <DemoContainer
                                    sx={{
                                       width: "100%",
                                       padding: 0,
                                       "& > div": {
                                          width: "100%",
                                          padding: 0,
                                       },
                                    }}
                                    components={["DesktopDatePicker"]}
                                 >
                                    <DemoItem className="desktop-date-picker-container">
                                       <DesktopDatePicker
                                          className="desktop-date-picker"
                                          defaultValue={dayjs("2022-04-17")}
                                       />
                                    </DemoItem>
                                 </DemoContainer>
                              </LocalizationProvider>
                           </Box>
                        </Grid>

                        <Grid item xs={12}>
                           <Box
                              sx={{
                                 display: "flex",
                                 flexFlow: "column",
                                 gap: 1,
                              }}
                           >
                              <Typography
                                 htmlFor="introduce"
                                 variant="h5"
                                 component="label"
                              >
                                 Giới thiệu bản thân
                              </Typography>
                              <TextField
                                 rows={3}
                                 maxRows={4}
                                 multiline
                                 name="introduce"
                                 id="introduce"
                              />
                           </Box>
                        </Grid>
                        <Grid
                           item
                           xs={12}
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              columnGap: 2,
                           }}
                        >
                           <Button variant="outlined">Hủy</Button>
                           <Button variant="contained">Cập nhật</Button>
                        </Grid>
                     </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                     <Grid
                        container
                        spacing={2}
                        component="form"
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
                           <TextField name="oldPassword"></TextField>
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
                           <TextField name="newPassword"></TextField>
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
                           <TextField name="confirmNewPassword"></TextField>
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
                           <Button variant="contained">
                              Thay đổi mật khẩu
                           </Button>
                        </Grid>
                     </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                     Item Three
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                     Item Four
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                     Item Five
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                     Item Six
                  </TabPanel>
                  <TabPanel value={value} index={6}>
                     Item Seven
                  </TabPanel>
               </Grid>
            </Grid>
         </Container>
      </>
   );
};

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`vertical-tabpanel-${index}`}
         aria-labelledby={`vertical-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{ p: 3 }}>
               {/* <img src={URL.createObjectURL(file)} alt="" />
               <input type="file" onChange={onFileChange} />
               <Button onClick={onFileUpload}>Upload!</Button>
               <Typography>{children}</Typography> */}
               {children}
            </Box>
         )}
      </div>
   );
}

//  TabPanel.propTypes = {
//    children: PropTypes.node,
//    index: PropTypes.number.isRequired,
//    value: PropTypes.number.isRequired,
//  };

function a11yProps(index) {
   return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
   };
}

export default UpdateProfilePage;
