import Banner from "../../../components/Banner";
import { Box, Container, Grid } from "@mui/material";
import AuthorList from "../../../components/CardAuthor/AuthorList";
import { CardList, CardListHeader } from "../../../components/CardPost";
import { useEffect, useState } from "react";
import { getPopularAuthors } from "../../../services/authorService";
import { ButtonSwitchList } from "../../../components/Button";

const HomePageUser = () => {
   const [postType, setPostType] = useState("");
   const [popularAuthors, setPopularAuthors] = useState([]);
   useEffect(() => {
      document.title = "Trang chủ";
      getPopularAuthors()
         .then((response) => setPopularAuthors(response?.data))
         .catch((e) => console.log("HomePage - getPopularAuthor", e));
   }, []);
   return (
      <>
         <Banner></Banner>

         <Container sx={{ mb: 10 }}>
            <CardListHeader text="Bài viết mới" slug="/newest" />
            <CardList type="newest" />
         </Container>
         <Container sx={{ mb: 10 }}>
            <CardListHeader text="Bài viết nổi bật" slug="/popular" />
            <CardList type="popular" />
         </Container>
         <Container sx={{ mb: 10 }}>
            <Grid container spacing={2}>
               <Grid item md={9} xs={12} display="flex" flexDirection="column">
                  <Buttons setPostType={setPostType} />
                  <CardList
                     direction="horizontal"
                     type={postType}
                     pageSize={8}
                  />
               </Grid>
               <Grid item xs={12} md={3}>
                  <AuthorList authors={popularAuthors} />
               </Grid>
            </Grid>
         </Container>
      </>
   );
};

const Buttons = ({ setPostType }) => {
   const [activePostType, setActivePostType] = useState("");
   const handleGetPostByAuthor = () => {
      setPostType("");
      setActivePostType("");
   };
   const handleGetPostNewest = () => {
      setPostType("newest");
      setActivePostType("newest");
   };
   const handleGetPostPopular = () => {
      setPostType("popular");
      setActivePostType("popular");
   };
   //   const handleGetPostHighestRate = () => {
   //     setPostType("hightestRate");
   //     setActivePostType("highestRate");
   //   };
   return (
      <Box
         sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            mb: 3,
            flexWrap: "nowrap",
            alignItems: "center",
            overflowX: "auto",
            flexShrink: 0,
         }}
      >
         <ButtonSwitchList
            text="Theo tác giả"
            onClick={handleGetPostByAuthor}
            active={activePostType === ""}
         />
         <ButtonSwitchList
            text="Mới nhất"
            onClick={handleGetPostNewest}
            active={activePostType === "newest"}
         />
         <ButtonSwitchList
            text="Sôi nổi"
            onClick={handleGetPostPopular}
            active={activePostType === "popular"}
         />
         {/* <ButtonSwitchList
            text="Đánh giá cao"
            onClick={handleGetPostHighestRate}
            active={activePostType === "highestRate"}
         /> */}
      </Box>
   );
};

// const ButtonItem = ({ text, onClick = () => {}, active }) => {
//    const { theme } = useMode();
//    const token = tokens(theme.palette.mode);

//    return (
//       <Button
//          variant="outlined"
//          component="span"
//          sx={{
//             flexShrink: 0,
//             width: "fit-content",
//             wordBreak: "normal",
//             wordWrap: "normal",
//             borderColor: active ? "initial" : "transparent",
//             color: token.text,
//          }}
//          onClick={onClick}
//       >
//          {text}
//       </Button>
//    );
// };

export default HomePageUser;
