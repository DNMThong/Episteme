/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import {
   Avatar,
   Box,
   Button,
   Chip,
   Container,
   Grid,
   Typography,
} from "@mui/material";
import { useMode } from "../../../context/mode-context";
import { tokens } from "../../../constants/theme";
import { useAuth } from "../../../context/auth-context";
import { useParams } from "react-router-dom";
import {
   CardPost,
   CustomCardListDirection,
} from "../../../components/CardPost";
import { DEFAULT_IMAGE } from "../../../constants/default";
import { getAuthorById } from "../../../services/authService";
import {
   getAllDraftOfAuthor,
   getAllPostOfAuthor,
   getFollowersOfAuthor,
   getFollowingsOfAuthor,
} from "../../../services/authorService";
import CardDraft from "../../../components/CardDraft/CardDraft";
import CardAuthor from "../../../components/CardAuthor";

const headings = [
   {
      heading: "Bài viết",
      slug: "/",
   },
   {
      heading: "Theo tác giả",
      slug: "/listByAuthor",
   },
   {
      heading: "Mới nhất",
      slug: "/newestBLogs",
   },
   {
      heading: "Đang theo dõi",
      slug: "/popularBlogs",
   },
   {
      heading: "Người theo dõi",
      slug: "/highestRateBlogs",
   },
   {
      heading: "Bản nháp",
      slug: "/drafts",
   },
];

const ProfilePage = () => {
   const { userId } = useParams();
   const { user } = useAuth();
   const [userInfo, setUserInfo] = useState(null);
   const [cardType, setCardType] = useState("");
   const [slug, setSlug] = useState("");
   const [data, setData] = useState([]);
   const {
      theme: { palette },
   } = useMode();
   const token = tokens(palette.mode);
   const isMyProfile = userId === user?.id;

   useEffect(() => {
      if (isMyProfile) setUserInfo(user);
      else {
         getAuthorById(userId)
            .then((response) => setUserInfo(response.data))
            .catch((e) => console.log(e));
      }
   }, []);

   const handleFollowClick = (e) => {
      e.preventDefault();
      console.log("FOLLOW");
   };
   const handleUpdateProfile = (e) => {
      e.preventDefault();
      console.log("UPDATE");
   };
   return (
      <Fragment>
         <Container>
            <Grid
               container
               spacing={1}
               sx={{
                  marginBlock: "50px 0",
                  flexFlow: {
                     xs: "column",
                     md: "row",
                  },
                  alignItems: {
                     xs: "center",
                     md: "flex-start",
                  },
               }}
            >
               <Grid item md={1} sm={2}>
                  <Avatar
                     alt={userInfo?.fullname || userInfo?.id || userInfo?.email}
                     src={userInfo?.image || DEFAULT_IMAGE.USER_AVATAR}
                     sx={{
                        display: "block",
                        marginX: "auto",
                        maxWidth: "80px",
                        width: "100%",
                        height: "80px",
                        marginBottom: {
                           sm: 2,
                           md: 0,
                        },
                     }}
                  />
               </Grid>
               <Grid
                  item
                  md={11}
                  sm={10}
                  sx={{
                     marginY: "auto",
                     display: "flex",
                     rowGap: 2,
                     alignItems: {
                        xs: "center",
                        md: "initial",
                     },
                     flexFlow: {
                        xs: "column",
                        md: "row",
                     },
                     justifyContent: {
                        md: "space-between",
                     },
                  }}
               >
                  <Box
                     component="div"
                     sx={{
                        display: "flex",
                        flexFlow: "column",
                        order: {
                           xs: 2,
                           md: 1,
                        },
                        rowGap: {
                           md: "8px",
                        },
                     }}
                  >
                     <Typography variant="h5">{userInfo?.fullname}</Typography>
                     <Typography
                        variant="subtitle2"
                        component="span"
                        sx={{ fontSize: "12px" }}
                     >
                        @{userInfo?.id}
                     </Typography>
                  </Box>
                  {isMyProfile ? (
                     <MyButton
                        onClick={handleUpdateProfile}
                        label="Chỉnh sửa thông tin cá nhân"
                     />
                  ) : (
                     <MyButton onClick={handleFollowClick} label="+ Theo dõi" />
                  )}
               </Grid>
            </Grid>
         </Container>
         <Container
            sx={{
               marginTop: "50px",
            }}
         >
            <Grid container spacing={2}>
               <Grid item md={9} xs={12}>
                  <ListButtons
                     setCardType={setCardType}
                     setData={setData}
                     userId={userId}
                  />
                  <ListData type={cardType} data={data} />
               </Grid>
               <Grid item md={3} xs={12}>
                  <Box
                     component="ul"
                     sx={{
                        display: "flex",
                        flexFlow: "column",
                        rowGap: 1,
                        listStyle: "none",
                        alignItems: "flex-start",
                        padding: 2,
                        borderRadius: 1,
                        border: `1px solid ${token.textColor}`,
                        "> li": {
                           width: "100%",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "space-between",
                           cursor: "pointer",
                           ":hover > span:last-child": {
                              color: token.greenAccent,
                           },
                           "> span": {
                              md: {
                                 fontSize: "14px",
                              },
                              xs: {
                                 fontSize: "10px",
                              },
                           },
                           // fontSize: {
                           //    md: "16px",
                           // },
                        },
                     }}
                  >
                     <Box component="li">
                        <Typography variant="subtitle2" component="span">
                           Tổng số lượt xem
                        </Typography>
                        <Typography variant="subtitle2" component="span">
                           322
                        </Typography>
                     </Box>
                     <Box component="li">
                        <Typography variant="subtitle2" component="span">
                           Số lượng bài viết
                        </Typography>
                        <Typography variant="subtitle2" component="span">
                           322
                        </Typography>
                     </Box>
                     <Box component="li">
                        <Typography variant="subtitle2" component="span">
                           Người theo dõi
                        </Typography>
                        <Typography variant="subtitle2" component="span">
                           2
                        </Typography>
                     </Box>
                     <Box component="li">
                        <Typography variant="subtitle2" component="span">
                           Bài viết đã lưu
                        </Typography>
                        <Typography variant="subtitle2" component="span">
                           3
                        </Typography>
                     </Box>
                  </Box>
                  <Box component="div">
                     <Typography variant="h5" marginBottom={2}>
                        Các danh mục liên quan
                     </Typography>
                     <Box
                        component="div"
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           flexWrap: "wrap",
                           gap: 1,
                        }}
                     >
                        {[
                           "Kiến thức",
                           "Đời sống",
                           "Đời sống",
                           "Đời sống",
                           "Đời sống",
                        ].map((item, index) => {
                           return (
                              <Chip
                                 label={item}
                                 key={index}
                                 sx={{
                                    cursor: "pointer",
                                    height: "fit-content",
                                    "& .MuiChip-root span.MuiChip-label": {
                                       padding: "2px 8px",
                                    },
                                 }}
                              />
                           );
                        })}
                     </Box>
                  </Box>
               </Grid>
            </Grid>
         </Container>
      </Fragment>
   );
};

const ListData = ({ type, data }) => {
   return (
      <Grid container spacing={2}>
         {data &&
            data.length > 0 &&
            data.map((item) => {
               return (
                  <Grid item xs={12} key={item.id}>
                     {type === "draft" && (
                        <CardDraft key={item.id} info={item} />
                     )}
                     {type === "post" && (
                        <CardPost
                           key={item.id}
                           postInfo={item}
                           direction="horizontal"
                        />
                     )}
                     {type === "author" && (
                        <CardAuthor key={item.id} data={item} />
                     )}
                  </Grid>
               );
            })}
      </Grid>
   );
};

const ListButtons = ({ setCardType, setData, userId }) => {
   const [active, setActive] = useState("post");
   useEffect(() => {
      getAllPostOfAuthor(userId)
         .then((response) => setData(response?.data))
         .catch((e) => console.log(e));
   }, []);
   const handleGetPosts = () => {
      getAllPostOfAuthor(userId)
         .then((response) => setData(response?.data))
         .catch((e) => console.log(e));
      setActive("post");
      setCardType("post");
   };
   const handleGetDrafts = () => {
      getAllDraftOfAuthor(userId)
         .then((response) => setData(response?.data))
         .catch((e) => console.log(e));
      setActive("draft");
      setCardType("draft");
   };
   const handleGetFollowings = () => {
      getFollowingsOfAuthor(userId)
         .then((response) => setData(response?.data))
         .catch((e) => console.log(e));
      setActive("following");
   };
   const handleGetFollowers = () => {
      getFollowersOfAuthor(userId)
         .then((response) => setData(response?.data))
         .catch((e) => console.log(e));
      setActive("follower");
   };
   return (
      <Box
         sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            mb: 3,
            overflowX: "auto",
            flexWrap: "nowrap",
            alignItems: "center",
         }}
      >
         <ButtonItem
            text="Bài viết"
            onClick={handleGetPosts}
            active={active === "post"}
         />
         <ButtonItem
            text="Bài viết nháp"
            onClick={handleGetDrafts}
            active={active === "draft"}
         />
         <ButtonItem
            text="Theo dõi"
            onClick={handleGetFollowings}
            active={active === "following"}
         />
         <ButtonItem
            text="Người theo dõi"
            onClick={handleGetFollowers}
            active={active === "follower"}
         />
      </Box>
   );
};

const ButtonItem = ({ text, onClick = () => {}, active }) => {
   const { theme } = useMode();
   const token = tokens(theme.palette.mode);

   return (
      <Button
         variant="outlined"
         component="span"
         sx={{
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

const MyButton = ({ onClick = () => {}, label }) => {
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
            // ":hover": {
            //    color: token.greenAccent,
            //    borderColor: "currentColor",
            // },
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

export default ProfilePage;
