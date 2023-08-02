import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const InfoAuthor = ({
  name,
  createAt,
  amountView,
  amountBookmark,
  amountComment,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap="8px">
      <Box display="flex" alignItems="center" gap="12px">
        <Avatar src="https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg" />
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center" gap="12px">
            <Typography variant="h5">{name}</Typography>
            <Button sx={{ mb: "auto" }}>Theo dõi</Button>
          </Box>
          <Typography variant="subtitle2">Ngày tạo {createAt}</Typography>
        </Box>
      </Box>
      <Box display="flex" gap="12px" ml="auto">
        <Box display="flex" gap="4px" alignItems="center">
          <VisibilityIcon />
          <Typography>{amountView}</Typography>
        </Box>
        <Box display="flex" gap="4px" alignItems="center">
          <CommentIcon />
          <Typography>{amountComment}</Typography>
        </Box>
        <Box display="flex" gap="4px" alignItems="center">
          <BookmarkIcon />
          <Typography>{amountBookmark}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoAuthor;
