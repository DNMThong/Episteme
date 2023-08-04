import { Container, Grid, Paper, Typography } from "@mui/material";
import { CardList, CardPost } from "../../../components/CardPost";
import { CommentBox, ReplyBox } from "../../../components/Comment";
import { DEFAULT_IMAGE } from "../../../constants/default";
import { tokens } from "../../../constants/theme";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { getPostsByType } from "../../../services/postService";

const ListPage = () => {
   const { palette } = useTheme();
   const token = tokens(palette.mode);

   const [posts, setPosts] = useState([]);
   const [error, setErrorMessage] = useState("");

   useEffect(() => {
      document.title = "Bài viết";
   }, []);

   useEffect(() => {
      getPostsByType({ pageSize: 8 })
         .then((data) => {
            console.log(
               "🚀 ~ file: ListPage.jsx:20 ~ .then ~ data:",
               data.data
            );
            setPosts(data.data.content);
         })
         .catch(() => setErrorMessage("Không tìm thấy bài viết nào"));
   }, []);

   return (
      <>
         <Paper
            sx={{
               padding: 8,
               textAlign: "center",
               marginBlock: "16px 32px",
               color: "#fff",
               background: `${token.paper} url(${DEFAULT_IMAGE.BACKGROUND}) no-repeat center`,
            }}
         >
            <Typography variant="h2">Danh sách bài viết</Typography>
         </Paper>
         <Container>
            <Grid container spacing={2}>
               {posts &&
                  posts.length > 0 &&
                  posts.map((post) => {
                     return (
                        <Grid item key={post.id} lg={3} md={6} xs={12}>
                           <CardPost postInfo={post} />
                        </Grid>
                     );
                  })}
            </Grid>
         </Container>
         <Container sx={{ marginTop: 3 }}>
            <Grid container>
               <Grid item xs={12} md={9}>
                  <CommentBox></CommentBox>
                  <ReplyBox />
               </Grid>
            </Grid>
         </Container>
      </>
   );
};

export default ListPage;
