import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import InfoAuthor from "../../../components/InfoAuthor";
import ActionPost from "../../../components/ActionPost";
import PostRender from "../../../components/PostRender";
import { getPostBySlug } from "../../../services/postService";
import { useParams } from "react-router-dom";
import { addBookmark, removeBookmark } from "../../../services/bookmarkService";
import { useAuth } from "../../../context/auth-context";
import {
  addCommentPost,
  getCommentPost,
} from "../../../services/commentService";
import { toast } from "react-toastify";
import Comment from "../../../components/Comment";

const ViewPostPage = () => {
  const [post, setPost] = useState();
  const [notFound, setNotFound] = useState(false);
  const [comments, setComments] = useState([]);
  const { slug } = useParams();
  const { user } = useAuth();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  console.log(matches);

  useEffect(() => {
    getPostBySlug(slug)
      .then((response) => {
        setPost(response?.data);
      })
      .catch((error) => {
        setNotFound(true);
      });
  }, [slug]);

  const handleCommentPost = (value) => {};

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
        {matches && (
          <ActionPost
            post={post}
            slug={slug}
            breakPoint="sm"
            display={{ sm: "flex", xs: "none" }}></ActionPost>
        )}
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
            {post?.title}
          </Typography>
          <Typography variant="caption">{post?.description}</Typography>
          <PostRender blocks={JSON.parse(post?.content || "[]")}></PostRender>
          <Box m="20px 0">
            <Comment post={post}></Comment>
          </Box>
        </Box>
      </Box>
      {!matches && (
        <ActionPost
          breakPoint="sm"
          post={post}
          slug={slug}
          display={{ sm: "none", xs: "flex" }}></ActionPost>
      )}
    </Container>
  );
};

export default ViewPostPage;
