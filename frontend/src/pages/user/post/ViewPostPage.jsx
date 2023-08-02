import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import InfoAuthor from "../../../components/InfoAuthor";
import ActionPost from "../../../components/ActionPost";
import PostRender from "../../../components/PostRender";
import { getPostBySlug } from "../../../services/postService";
import { useParams } from "react-router-dom";
import { CommentBox, ReplyBox } from "../../../components/Comment";

const ViewPostPage = () => {
  const [post, setPost] = useState();
  const [notFound, setNotFound] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    getPostBySlug(slug)
      .then((response) => {
        setPost(response?.data);
      })
      .catch((error) => {
        setNotFound(true);
      });
  }, [slug]);

  if (notFound) return <Typography>404</Typography>;

  return (
    <Container sx={{ mt: "50px", position: "relative" }}>
      <Box
        display="flex"
        maxWidth="700px"
        width="full"
        mx="auto"
        gap="30px"
        alignItems="start">
        <ActionPost
          breakPoint="sm"
          display={{ sm: "flex", xs: "none" }}></ActionPost>
        <Box
          sx={{
            maxWidth: "650px",
            width: "100%",
            position: "relative",
          }}>
          <InfoAuthor
            name={post?.author.fullname}
            createAt={post?.createAt}
            amountView={post?.view}
            amountBookmark={post?.total_bookmark}
            amountComment={post?.total_comment}></InfoAuthor>
          <Typography variant="h2" mt="40px" mb="10px">
            Quân tới chơi
          </Typography>
          <Typography variant="caption">Đây là mô tả</Typography>
          <PostRender blocks={JSON.parse(post?.content || "[]")}></PostRender>
          <Box mt="12px">
            <CommentBox></CommentBox>
            <Box display="flex" flexDirection="column" gap="12px" mt="12px">
              <ReplyBox />
              <ReplyBox />
              <ReplyBox />
            </Box>
          </Box>
        </Box>
      </Box>
      <ActionPost
        breakPoint="sm"
        display={{ sm: "none", xs: "flex" }}></ActionPost>
    </Container>
  );
};

export default ViewPostPage;
