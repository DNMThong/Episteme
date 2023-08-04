import { Avatar, Box, Button } from "@mui/material";
import "./style.css";
import InputComment from "./InputComment";
import { useState } from "react";
import { addCommentPost } from "../../services/commentService";
import { toast } from "react-toastify";

// https://www.gravatar.com/avatar/a1ebce7ca559986dd18d4c94ef56e37b?d=wavatar&f=y
const CommentBox = ({ type = "comment", user, handleCommentPost, onClose }) => {
  const [value, setValue] = useState("");

  return (
    <Box className="comment-box__container">
      <Box className="comment-box__form-group">
        {type === "comment" && (
          <Avatar className="form-group__avatar" src={user?.image} />
        )}
        <InputComment
          defaultValue={value}
          multiline={true}
          maxRows={3}
          placeholder="Nhận xét..."
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>
      <div className="comment-box__buttons">
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            handleCommentPost(value);
          }}
          disabled={!value}>
          Bình luận
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Hủy
        </Button>
      </div>
    </Box>
  );
};

export default CommentBox;
