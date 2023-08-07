import React, { useEffect, useState } from "react";
import InputComment from "./InputComment";
import { Avatar, Box, Button, Typography } from "@mui/material";
import CommentBox from "./CommentBox";
import { getAuthor } from "../../services/authorService";

const ReplyBoxSub = ({ comment }) => {
  const { content, userId, createAt } = comment;
  const [userComment, setUserComment] = useState();
  useEffect(() => {
    getAuthor(userId).then((response) => setUserComment(response.data));
  }, [userId]);
  return (
    <div className="reply-box__container">
      <div className="reply__info">
        <Avatar className="reply-info__avatar" src={userComment?.avatar} />
        <div className="reply-info__bottom">
          <Typography
            className="reply-info__username"
            variant="h6"
            component="span"
            fontWeight={400}>
            {userComment?.fullname}
          </Typography>
        </div>
      </div>
      <div className="reply-content__container">
        <InputComment
          className="reply__content"
          defaultValue={content}
          inputProps={{
            readOnly: true,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}>
          <Typography
            className="reply-info__create-date"
            variant="subtitle2"
            component="span">
            {createAt}
          </Typography>
        </Box>
        <Box></Box>
      </div>
    </div>
  );
};

export default ReplyBoxSub;
