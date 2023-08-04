import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import InfoAuthor from "../../../components/InfoAuthor";
import ActionPost from "../../../components/ActionPost";
import PostRender from "../../../components/PostRender";
import { getPostBySlug } from "../../../services/postService";
import { useParams } from "react-router-dom";
import { CommentBox, ReplyBox } from "../../../components/Comment";
import { addBookmark, removeBookmark } from "../../../services/bookmarkService";
import { useAuth } from "../../../context/auth-context";
import {
  addCommentPost,
  getCommentPost,
} from "../../../services/commentService";
import { toast } from "react-toastify";

const ViewPostPage = () => {
  const [post, setPost] = useState();
  const [notFound, setNotFound] = useState(false);
  const [comments, setComments] = useState([]);
  const { slug } = useParams();
  const { user } = useAuth();
  console.log(123);

  useEffect(() => {
    getPostBySlug(slug)
      .then((response) => {
        setPost(response?.data);
      })
      .catch((error) => {
        setNotFound(true);
      });
  }, [slug]);

  useEffect(() => {
    if (post?.id) {
      getCommentPost(post?.id).then((response) => {
        setComments(response);
      });
    }
  }, [post]);
  console.log(comments);

  const handleCommentPost = (value) => {
    const data = {
      content: value,
      userId: user.id,
    };
    addCommentPost(post.id, data)
      .then((response) => {
        setComments((comment) => [response.data, ...comment]);
        toast.success("Thêm bình luận thành công");
      })
      .catch(() => toast.error("Thêm bình luận thất bại"));
  };

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
          post={post}
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
            {user && (
              <CommentBox
                user={user}
                handleCommentPost={handleCommentPost}></CommentBox>
            )}
            <Box display="flex" flexDirection="column" gap="16px" mt="16px">
              {comments.map((comment) => (
                <ReplyBox postId={post.id} comment={comment} key={comment.id} />
              ))}
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
