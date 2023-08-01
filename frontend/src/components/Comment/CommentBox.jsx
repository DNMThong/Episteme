import { Avatar, Button } from "@mui/material";
import "./style.css";
import InputComment from "./InputComment";

// https://www.gravatar.com/avatar/a1ebce7ca559986dd18d4c94ef56e37b?d=wavatar&f=y
const CommentBox = ({
   type = "comment",
   onClose = () => {},
   onComment = () => {},
   onInputChange = () => {},
   onSubmit = () => {},
   value = "",
}) => {
   console.log("🚀 ~ file: CommentBox.jsx:12 ~ onSubmit:", onSubmit);
   return (
      <form onSubmit={onSubmit} className="comment-box__container">
         <div className="comment-box__form-group">
            {type === "comment" && (
               <Avatar
                  className="form-group__avatar"
                  src="https://www.gravatar.com/avatar/a1ebce7ca559986dd18d4c94ef56e37b?d=wavatar&f=y"
               />
            )}
            <InputComment
               defaultValue={value}
               multiline={true}
               maxRows={3}
               placeholder="Nhận xét..."
               onChange={onInputChange}
            />
         </div>
         <div className="comment-box__buttons">
            <Button type="submit" variant="contained" onClick={onComment}>
               Bình luận
            </Button>
            <Button variant="outlined" onClick={onClose}>
               Hủy
            </Button>
         </div>
      </form>
   );
};

export default CommentBox;
