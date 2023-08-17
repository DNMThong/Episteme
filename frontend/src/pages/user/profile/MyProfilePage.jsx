/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useAuth } from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { CardPost } from "../../../components/CardPost";
import {
   getAllCardByType,
   getStatisticByType,
} from "../../../services/authorService";
import CardDraft from "../../../components/CardDraft/CardDraft";
import CardAuthor from "../../../components/CardAuthor";
import {
   PostCategoryStat,
   ProfileStatistic,
} from "../../../components/ProfileStatistic";
import Swal from "sweetalert2";
import { deletePost } from "../../../services/postService";
import { toast } from "react-toastify";
import { ButtonSwitchList } from "../../../components/Button";
import {
   ProfileAvatar,
   ProfileInfo,
   ServiceProfileButton,
} from "../../../components/ProfileInfo";

const MyProfilePage = ({ title }) => {
   const navigate = useNavigate();
   const { user } = useAuth();
   const [cardType, setCardType] = useState("posts");
   const [statistic, setStatistic] = useState({});
   const [categoriesPosted, setCategoriesPosted] = useState([]);
   // const [loading, setLoading] = useState(true);

   useEffect(() => {
      document.title = title;
      if (user?.id) {
         getStatisticByType(user?.id, "posts-views")
            .then((response) =>
               setStatistic((prev) => {
                  return { ...prev, totalView: response.data };
               })
            )
            .catch((e) =>
               console.log("ProfilePage - GetStatisticByType-postviews", e)
            );
         getStatisticByType(user?.id, "post-number")
            .then((response) =>
               setStatistic((prev) => {
                  return { ...prev, totalPost: response.data };
               })
            )
            .catch((e) =>
               console.log("ProfilePage - GetStatisticByType-posts", e)
            );
         getStatisticByType(user?.id, "bookmarks-number")
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
         getStatisticByType(user?.id, "follows/count")
            .then((response) =>
               setStatistic((prev) => {
                  return { ...prev, totalFollower: response.data };
               })
            )
            .catch((e) =>
               console.log("ProfilePage - GetStatisticByType-followers", e)
            );
         getStatisticByType(user?.id, "pominent-categories")
            .then((response) => setCategoriesPosted(response.data))
            .catch((e) =>
               console.log("ProfilePage - GetStatisticByType-categories", e)
            );
      }
   }, [user]);

   const handleUpdateProfile = () => {
      navigate("/update-profile");
   };
   return (
      <Box>
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
                  <ProfileAvatar user={user}></ProfileAvatar>
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
                  <ProfileInfo userInfo={user}></ProfileInfo>
                  <ServiceProfileButton
                     onClick={handleUpdateProfile}
                     label="Chỉnh sửa thông tin cá nhân"
                  />
               </Grid>
            </Grid>
         </Container>
         <Container
            sx={{
               marginBlock: "50px",
            }}
         >
            <Grid container spacing={2}>
               <Grid item md={9} xs={12}>
                  <ListButtons setCardType={setCardType} />
                  <ListData type={cardType} user={user} />
               </Grid>
               <Grid item md={3} xs={12}>
                  <ProfileStatistic statistic={statistic} />
                  <PostCategoryStat categories={categoriesPosted} />
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

const ListData = ({ type, user }) => {
   const [data, setData] = useState([]);
   useEffect(() => {
      if (user?.id) {
         getAllCardByType(type, user?.id)
            .then((response) => setData(response.data))
            .catch((e) => console.log(e));
      }
   }, [type, user]);

   const handleDeleteDraftPost = (id) => {
      Swal.fire({
         title: `Bạn có chắc muốn xóa bài viết nháp này`,
         text: "Khi xóa không thể hoàn tác lại!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Xóa",
         cancelButtonText: "Hủy",
      }).then((result) => {
         if (result.isConfirmed) {
            deletePost(id)
               .then(() => {
                  setData((prevData) =>
                     prevData.filter((prevItem) => prevItem.id !== id)
                  );
                  toast.success("Xóa bài viết nháp thành công");
               })
               .catch(() =>
                  toast.error("Đã có lỗi xảy ra! Không xóa được bài viết nháp")
               );
         }
      });
   };

   if (!data || data.length <= 0) return null;
   return (
      <Grid container spacing={2}>
         {!data ||
            (data.length <= 0 && (
               <Grid item xs={12} textAlign="center">
                  Không có thông tin
               </Grid>
            ))}
         {data &&
            data.length > 0 &&
            data.map((item) => {
               return (
                  <Grid item xs={12} key={item.id}>
                     {type === "drafts" && (
                        <CardDraft
                           handleDeleteDraftPost={() =>
                              handleDeleteDraftPost(item.id)
                           }
                           info={item}
                        />
                     )}
                     {(type === "posts" || type === "bookmarks") && (
                        <CardPost postInfo={item} direction="horizontal" />
                     )}
                     {type.includes("follow") && <CardAuthor data={item} />}
                  </Grid>
               );
            })}
      </Grid>
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
   const handleGetDrafts = () => {
      setActive("drafts");
      setCardType("drafts");
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
            text="Bài viết nháp"
            onClick={handleGetDrafts}
            active={active === "drafts"}
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

export default MyProfilePage;
