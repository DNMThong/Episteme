import { Avatar, Box, Button, Typography } from "@mui/material";
import InputComment from "./InputComment";
import { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import { getAuthor } from "../../services/authorService";
import { addCommentReplyPost } from "../../services/commentService";
import { toast } from "react-toastify";

const ReplyBox = ({ comment, postId }) => {
   const { id, content, userId, createAt, comments } = comment;
   const [openReplyInput, setOpenReplyInput] = useState(false);
   const [userComment, setUserComment] = useState();
   const [listSubCmtReply, setListSubCmtReply] = useState(comments);

   useEffect(() => {
      getAuthor(userId).then((response) => setUserComment(response.data));
   }, [userId]);

   const handleCommentPost = (value) => {
      addCommentReplyPost(postId, id, {
         content: value,
         userId,
      })
         .then((response) => {
            toast.success("Thêm bình luận thành công");
            setListSubCmtReply((prev) => [...prev, response.data]);
            setOpenReplyInput(false);
         })
         .catch(() => toast.error("Thêm bình luận thất bại"));
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
            <Avatar className="reply-info__avatar" src={userComment?.avatar} />
            <div className="reply-info__bottom">
               <Typography
                  className="reply-info__username"
                  variant="h6"
                  component="span"
                  fontWeight={400}
               >
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
                  justifyContent: "space-between",
               }}
            >
               <Box>
                  <Button variant="text" onClick={handleReplyClick}>
                     Trả lời
                  </Button>
                  <Button variant="text" onClick={handleReplyClick}>
                     Chỉnh sửa
                  </Button>
                  {openReplyInput && (
                     <CommentBox
                        type="reply"
                        onClose={handleCloseReplyInput}
                        handleCommentPost={handleCommentPost}
                     />
                  )}
               </Box>
               <Typography
                  className="reply-info__create-date"
                  variant="subtitle2"
                  component="span"
               >
                  {createAt}
               </Typography>
            </Box>
            <Box>
               {listSubCmtReply &&
                  listSubCmtReply.length > 0 &&
                  listSubCmtReply.map((item) => {
                     return (
                        <Box key={item.id}>
                           <ReplyBox
                              postId={postId}
                              comment={item}
                              key={item.id}
                           />
                        </Box>
                     );
                  })}
               {/* <Box key={item.id} m="0 0 20px 20px">
                        <InputComment
                           className="reply__content"
                           defaultValue={item.content}
                           inputProps={{
                              readOnly: true,
                           }}
                        />
                     </Box> */}
            </Box>
            {/* {openReplyInput && (
               <CommentBox
                  type="reply"
                  onClose={handleCloseReplyInput}
                  handleCommentPost={handleCommentPost}
               />
            )} */}
         </div>
      </div>
   );
};

export default ReplyBox;
