import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { CardList, CardPost } from "../../../components/CardPost";
import { CommentBox, ReplyBox } from "../../../components/Comment";
import { DEFAULT_IMAGE } from "../../../constants/default";
import { tokens } from "../../../constants/theme";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { getPostsByType } from "../../../services/postService";
import { getAuthorById } from "../../../services/authService";
import {
   addCommentPost,
   getCommentPost,
} from "../../../services/commentService";
import { toast } from "react-toastify";
import TopComment from "../../../components/Comment/TopComment";
import ReplyBox2 from "../../../components/Comment/ReplyBox2";

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
            setPosts(data.data.content);
         })
         .catch(() => setErrorMessage("Không tìm thấy bài viết nào"));
   }, []);

   // Example
   const [comments, setComments] = useState([]);
   console.log("🚀 ~ file: ListPage.jsx:39 ~ ListPage ~ comments:", comments);
   const [user, setUser] = useState(null);

   useEffect(() => {
      getAuthorById("123456789")
         .then((response) => setUser(response?.data))
         .catch((e) => console.log(e));

      getCommentPost(2).then((response) => {
         setComments(response);
      });
   }, []);

   const handleCommentPost = (value) => {
      const data = {
         content: value,
         userId: user.id,
      };
      addCommentPost(2, data)
         .then((response) => {
            setComments((comment) => [response.data, ...comment]);
            toast.success("Thêm bình luận thành công");
         })
         .catch(() => toast.error("Thêm bình luận thất bại"));
   };

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
                  {/* <Box mt="12px">
                     {user && (
                        <TopComment user={user} onClick={handleCommentPost} />
                     )}
                     <Box
                        display="flex"
                        flexDirection="column"
                        gap="16px"
                        mt="16px"
                     >
                        {comments.map((comment) => (
                           <ReplyBox2
                              postId={2}
                              comment={comment}
                              key={comment.id}
                           />
                        ))}
                     </Box>
                  </Box> */}
               </Grid>
            </Grid>
         </Container>
      </>
   );
};

export default ListPage;
