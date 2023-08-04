/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useMode } from "../../../context/mode-context";
import { tokens } from "../../../constants/theme";
import { useAuth } from "../../../context/auth-context";
import { useParams } from "react-router-dom";
import { CustomCardListDirection } from "../../../components/CardPost";
import { DEFAULT_IMAGE } from "../../../constants/default";

const headings = [
  {
    heading: "Bài viết",
    slug: "/",
  },
  {
    heading: "Theo tác giả",
    slug: "/listByAuthor",
  },
  {
    heading: "Mới nhất",
    slug: "/newestBLogs",
  },
  {
    heading: "Đang theo dõi",
    slug: "/popularBlogs",
  },
  {
    heading: "Người theo dõi",
    slug: "/highestRateBlogs",
  },
  {
    heading: "Bản nháp",
    slug: "/drafts",
  },
];

const ProfilePage = () => {
  const { userId } = useParams();
  const { user, setUser } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  console.log("🚀 ~ file: ProfilePage.jsx:48 ~ ProfilePage ~ user:", user);
  const {
    theme: { palette },
  } = useMode();
  const token = tokens(palette.mode);
  const isMyProfile = userInfo && userId === userInfo.id;
  console.log(
    "🚀 ~ file: ProfilePage.jsx:55 ~ ProfilePage ~ user.id:",
    user.id
  );
  console.log("🚀 ~ file: ProfilePage.jsx:55 ~ ProfilePage ~ userId:", userId);

  useEffect(() => setUserInfo(user), []);

  const handleFollowClick = (e) => {
    e.preventDefault();
    console.log("FOLLOW");
  };
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log("UPDATE");
  };
  return (
    <Fragment>
      <Container>
        <Grid
          container
          spacing={1}
          sx={{
            marginBlock: "50px 0",
            flexFlow: {
              xs: "column",
              md: "row",
            },
            alignItems: {
              xs: "center",
              md: "flex-start",
            },
          }}>
          <Grid item md={1} sm={2}>
            <Avatar
              alt={user.fullname || user.id || user.email}
              src={user.image || DEFAULT_IMAGE.USER_AVATAR}
              sx={{
                display: "block",
                marginX: "auto",
                maxWidth: "80px",
                width: "100%",
                height: "80px",
                marginBottom: {
                  sm: 2,
                  md: 0,
                },
              }}
            />
          </Grid>
          <Grid
            item
            md={11}
            sm={10}
            sx={{
              marginY: "auto",
              display: "flex",
              rowGap: 2,
              alignItems: {
                xs: "center",
                md: "initial",
              },
              flexFlow: {
                xs: "column",
                md: "row",
              },
              justifyContent: {
                md: "space-between",
              },
            }}>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexFlow: "column",
                order: {
                  xs: 2,
                  md: 1,
                },
                rowGap: {
                  md: "8px",
                },
              }}>
              <Typography variant="h5">{user.id}</Typography>
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ fontSize: "12px" }}>
                @{user.id}
              </Typography>
            </Box>
            {isMyProfile ? (
              <MyButton
                onClick={handleUpdateProfile}
                label="Chỉnh sửa thông tin cá nhân"
              />
            ) : (
              <MyButton onClick={handleFollowClick} label="+ Theo dõi" />
            )}
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{
          marginTop: "50px",
        }}>
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <CustomCardListDirection
              headerBtns={headings}
              cardDirection="vertical"
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Box
              component="ul"
              sx={{
                display: "flex",
                flexFlow: "column",
                rowGap: 1,
                listStyle: "none",
                alignItems: "flex-start",
                padding: 2,
                borderRadius: 1,
                border: `1px solid ${token.textColor}`,
                "> li": {
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  ":hover > span:last-child": {
                    color: token.greenAccent,
                  },
                  "> span": {
                    md: {
                      fontSize: "14px",
                    },
                    xs: {
                      fontSize: "10px",
                    },
                  },
                  // fontSize: {
                  //    md: "16px",
                  // },
                },
              }}>
              <Box component="li">
                <Typography variant="subtitle2" component="span">
                  Tổng số lượt xem
                </Typography>
                <Typography variant="subtitle2" component="span">
                  322
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="subtitle2" component="span">
                  Số lượng bài viết
                </Typography>
                <Typography variant="subtitle2" component="span">
                  322
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="subtitle2" component="span">
                  Người theo dõi
                </Typography>
                <Typography variant="subtitle2" component="span">
                  2
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="subtitle2" component="span">
                  Bài viết đã lưu
                </Typography>
                <Typography variant="subtitle2" component="span">
                  3
                </Typography>
              </Box>
            </Box>
            <Box component="div">
              <Typography variant="h5" marginBottom={2}>
                Các danh mục liên quan
              </Typography>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                }}>
                {[
                  "Kiến thức",
                  "Đời sống",
                  "Đời sống",
                  "Đời sống",
                  "Đời sống",
                ].map((item, index) => {
                  return (
                    <Chip
                      label={item}
                      key={index}
                      sx={{
                        cursor: "pointer",
                        height: "fit-content",
                        "& .MuiChip-root span.MuiChip-label": {
                          padding: "2px 8px",
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const MyButton = ({ onClick = () => {}, label }) => {
  const {
    theme: { palette },
  } = useMode();
  const token = tokens(palette.mode);
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        alignSelf: "center",
        color: token.textColor,
        height: "fit-content",
        borderColor: "currentColor",
        // ":hover": {
        //    color: token.greenAccent,
        //    borderColor: "currentColor",
        // },
        order: {
          md: 2,
          xs: 1,
        },
      }}>
      {label}
    </Button>
  );
};

export default ProfilePage;
