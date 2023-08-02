import { Avatar, Button, Typography } from "@mui/material";
import InputComment from "./InputComment";
import { useState } from "react";
import CommentBox from "./CommentBox";
import { useParams } from "react-router-dom";

const ReplyBox = ({ avatar, name, createAt, value }) => {
  const { slug } = useParams();
  const [openReplyInput, setOpenReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleSubmitReply = (e) => {
    e.preventDefault();
    console.log(
      "🚀 ~ file: ReplyBox.jsx:11 ~ ReplyBox ~ replyContent:",
      replyContent
    );
  };

  const handleReplyContentChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleCloseReplyInput = () => {
    setOpenReplyInput(false);
  };

  const handleReplyClick = () => {
    setOpenReplyInput(true);
  };
  return (
    <div className="reply-box__container">
      <div className="reply__info">
        <Avatar className="reply-info__avatar" src={avatar} />
        <div className="reply-info__bottom">
          <Typography
            className="reply-info__username"
            variant="h6"
            component="span"
            fontWeight={400}>
            {name}
          </Typography>
          <Typography
            className="reply-info__create-date"
            variant="subtitle2"
            component="span">
            {createAt}
          </Typography>
        </div>
      </div>
      <div className="reply-content__container">
        <InputComment
          className="reply__content"
          defaultValue={
            "hay qua hhhhhhhhhhhhhhhhhhssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
          }
          inputProps={{
            readOnly: true,
          }}
        />
        <div className="reply__action">
          <Button variant="text" onClick={handleReplyClick}>
            Trả lời
          </Button>
        </div>
        {openReplyInput && (
          <CommentBox
            value={replyContent}
            type="reply"
            onClose={handleCloseReplyInput}
            onInputChange={handleReplyContentChange}
            onSubmit={handleSubmitReply}
          />
        )}
      </div>
    </div>
  );
};

export default ReplyBox;
