/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { getAuthorById } from "../../../services/authService";
import { getStatisticByType } from "../../../services/authorService";
import {
   PostCategoryStat,
   ProfileStatistic,
} from "../../../components/ProfileStatistic";
import { useAuth } from "../../../context/auth-context";
import { checkFollow, follow, unfollow } from "../../../services/followService";
import { toast } from "react-toastify";
import { ButtonSwitchList } from "../../../components/Button";
import ListData from "../../../components/ListData";
import ProfileAvatar from "../../../components/ProfileInfo/ProfileAvatar";
import {
   ProfileInfo,
   ServiceProfileButton,
} from "../../../components/ProfileInfo";

const ProfilePage = ({ title }) => {
   const { userId } = useParams();
   const [userInfo, setUserInfo] = useState(null);
   const [cardType, setCardType] = useState("posts");
   const [statistic, setStatistic] = useState({});
   const [categoriesPosted, setCategoriesPosted] = useState([]);
   // const [data, setData] = useState(null);
   // const [loading, setLoading] = useState(true);
   const [followed, setFollowed] = useState(false);
   const { user } = useAuth();

   useEffect(() => {
      if (user?.id) {
         checkFollow({
            followerUserId: user?.id,
            followingUserId: userInfo?.id,
         }).then((response) => setFollowed(response?.data));
      }
   }, [user]);

   useEffect(() => {
      setCardType("posts");
   }, [userId]);

   useEffect(() => {
      document.title = title;
      if (userId) {
         getAuthorById(userId)
            .then((response) => setUserInfo(response.data))
            .catch((e) => console.log(e));
         getStatisticByType(userId, "posts-views")
            .then((response) =>
               setStatistic((prev) => {
                  return { ...prev, totalView: response.data };
               })
            )
            .catch((e) =>
               console.log("ProfilePage - GetStatisticByType-postviews", e)
            );
         getStatisticByType(userId, "post-number")
            .then((response) =>
               setStatistic((prev) => {
                  return { ...prev, totalPost: response.data };
               })
            )
            .catch((e) =>
               console.log("ProfilePage - GetStatisticByType-posts", e)
            );
         getStatisticByType(userId, "bookmarks-number")
            .then((response) =>
               setStatistic((prev) => {
                  return {
                     ...prev,
                     totalBookmark: response.data,
                  };
               })
            )
            .catch((e) =>
               console.log("ProfilePage - GetStatisticByType-bookmarks", e)
            );
         getStatisticByType(userId, "follows/count")
            .then((response) =>
               setStatistic((prev) => {
                  return { ...prev, totalFollower: response.data };
               })
            )
            .catch((e) =>
               console.log("ProfilePage - GetStatisticByType-followers", e)
            );
         getStatisticByType(userId, "pominent-categories")
            .then((response) => setCategoriesPosted(response.data))
            .catch((e) =>
               console.log("ProfilePage - GetStatisticByType-categories", e)
            );
      }
   }, [userId]);

   const handleFollowClick = (e) => {
      e.preventDefault();
      if (user?.id) {
         if (followed) {
            unfollow({
               followerUserId: user?.id,
               followingUserId: userInfo?.id,
            }).then(() => setFollowed(false));
         } else {
            follow({
               followerUserId: user?.id,
               followingUserId: userInfo?.id,
            }).then(() => setFollowed(true));
         }
      } else {
         toast.warning("Vui lòng đăng nhập để theo dõi tác giả");
      }
   };
   return (
      <Fragment>
         <Container
            sx={{
               marginY: "50px",
            }}
         >
            <Grid
               container
               spacing={1}
               sx={{
                  marginBlock: "50px",
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
                  <ProfileAvatar user={userInfo} />
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
                  <ProfileInfo userInfo={userInfo}></ProfileInfo>

                  <ServiceProfileButton
                     onClick={handleFollowClick}
                     label={`${followed ? "Đang theo dõi" : "+ Theo dõi"}`}
                  />
               </Grid>
            </Grid>
            <Grid
               container
               spacing={2}
               sx={{
                  minHeight: {
                     xs: "300px",
                     md: "50vh",
                  },
               }}
            >
               <Grid item md={9} xs={12}>
                  <ListButtons setCardType={setCardType} />
                  <ListData type={cardType} userId={userId} />
               </Grid>
               <Grid item md={3} xs={12}>
                  <ProfileStatistic statistic={statistic} />
                  <PostCategoryStat categories={categoriesPosted} />
               </Grid>
            </Grid>
         </Container>
      </Fragment>
   );
};

const ListButtons = ({ setCardType }) => {
   const [active, setActive] = useState("");
   useEffect(() => {
      setCardType("posts");
      setActive("posts");
   }, []);
   const handleGetPosts = () => {
      setActive("posts");
      setCardType("posts");
   };
   const handleGetFollowings = () => {
      setActive("followings");
      setCardType("followings");
   };
   const handleGetFollowers = () => {
      setActive("followers");
      setCardType("followers");
   };
   const handleGetBookmarks = () => {
      setActive("bookmarks");
      setCardType("bookmarks");
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
            paddingBlock: 1,
         }}
      >
         <ButtonSwitchList
            text="Bài viết"
            onClick={handleGetPosts}
            active={active === "posts"}
         />
         <ButtonSwitchList
            text="Đã lưu"
            onClick={handleGetBookmarks}
            active={active === "bookmarks"}
         />
         <ButtonSwitchList
            text="Theo dõi"
            onClick={handleGetFollowings}
            active={active === "followings"}
         />
         <ButtonSwitchList
            text="Người theo dõi"
            onClick={handleGetFollowers}
            active={active === "followers"}
         />
      </Box>
   );
};

export default ProfilePage;
