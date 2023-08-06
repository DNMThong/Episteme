import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import CommentBox from "./CommentBox";
import { addCommentReplyPost } from "../../services/commentService";
import { toast } from "react-toastify";

const ReplyAction = ({ postId, comment }) => {
   const { id, content, userId, createAt, comments } = comment;
   const [openReplyInput, setOpenReplyInput] = useState(false);
   const handleCloseReplyInput = () => {
      setOpenReplyInput(false);
   };
   const handleReplyClick = () => {
      setOpenReplyInput(true);
   };

   const handleCommentPost = (value) => {
      addCommentReplyPost(postId, id, {
         content: value,
         userId,
      })
         .then((response) => {
            toast.success("Thêm bình luận thành công");
            // setListSubCmtReply((prev) => [...prev, response.data]);
         })
         .catch(() => toast.error("Thêm bình luận thất bại"));
   };
   return (
      <Box display="flex" flexDirection="column">
         <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
         >
            <Box>
               <Button variant="text" onClick={handleReplyClick}>
                  Trả lời
               </Button>
               <Button variant="text" onClick={handleReplyClick}>
                  Chỉnh sửa
               </Button>
            </Box>
            <Typography
               className="reply-info__create-date"
               variant="subtitle2"
               component="span"
            >
               {createAt}
            </Typography>
         </Box>
         {openReplyInput && (
            <CommentBox
               type="reply"
               onClose={handleCloseReplyInput}
               handleCommentPost={handleCommentPost}
            />
         )}
      </Box>
   );
};

export default ReplyAction;
