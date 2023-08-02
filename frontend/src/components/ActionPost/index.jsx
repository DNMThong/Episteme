import { Box, Button, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useTheme } from "@emotion/react";
import { tokens } from "../../constants/theme";

const ActionPost = ({ breakPoint = "md", display }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  console.log();

  return (
    <Stack
      sx={{
        width: {
          [breakPoint]: "40px",
          xs: "100%",
        },
        display,
        gap: "8px",
        zIndex: "9999",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: {
          [breakPoint]: "column",
          xs: "row",
        },
        position: {
          [breakPoint]: "sticky",
          xs: "fixed",
        },
        top: {
          [breakPoint]: "0",
          xs: "unset",
        },
        bottom: {
          [breakPoint]: "unset",
          xs: "0",
        },
        left: {
          [breakPoint]: "unset",
          xs: "0",
        },
        right: {
          [breakPoint]: "unset",
          xs: "0",
        },
        padding: {
          [breakPoint]: "120px 0",
          xs: "10px",
        },
        backgroundColor: {
          [breakPoint]: "unset",
          xs: colors.paper,
        },
        "& .react-share__ShareButton": {
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        "& .react-share__ShareButton:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.08)!important",
        },
      }}>
      <IconButton
        sx={{ width: "40px", height: "40px" }}
        onClick={() => setLike((prev) => !prev)}>
        {like ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
      </IconButton>
      <IconButton
        sx={{ width: "40px", height: "40px" }}
        onClick={() => setBookmark((prev) => !prev)}>
        {bookmark ? <BookmarkOutlinedIcon /> : <BookmarkBorderOutlinedIcon />}
      </IconButton>
      <FacebookShareButton
        url={window.location.href}
        style={{ width: "40px", height: "40px" }}>
        <FacebookOutlinedIcon />
      </FacebookShareButton>
      <TwitterShareButton
        url={window.location.href}
        style={{ width: "40px", height: "40px" }}>
        <TwitterIcon />
      </TwitterShareButton>
    </Stack>
  );
};

export default ActionPost;
