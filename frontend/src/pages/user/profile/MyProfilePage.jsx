/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useMode } from "../../../context/mode-context";
import { tokens } from "../../../constants/theme";
import { useAuth } from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { CardPost } from "../../../components/CardPost";
import {
  getAllCardByType,
  getAllPostOfAuthor,
  getStatisticByType,
} from "../../../services/authorService";
import CardDraft from "../../../components/CardDraft/CardDraft";
import CardAuthor from "../../../components/CardAuthor";
import {
  PostCategoryStat,
  ProfileStatistic,
} from "../../../components/ProfileStatistic";

const MyProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cardType, setCardType] = useState("");
  const [statistic, setStatistic] = useState({});
  const [categoriesPosted, setCategoriesPosted] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStatisticByType(user?.id, "posts-views")
      .then((response) =>
        setStatistic((prev) => {
          return { ...prev, totalView: response.data };
        })
      )
      .catch((e) =>
        console.log("ProfilePage - GetStatisticByType-postviews", e)
      );
    getStatisticByType(user?.id, "post-number")
      .then((response) =>
        setStatistic((prev) => {
          return { ...prev, totalPost: response.data };
        })
      )
      .catch((e) => console.log("ProfilePage - GetStatisticByType-posts", e));
    getStatisticByType(user?.id, "bookmarks-number")
      .then((response) =>
        setStatistic((prev) => {
          return {
            ...prev,
            totalBookmark: response.data,
          };
        })
      )
      .catch((e) =>
        console.log("ProfilePage - GetStatisticByType-bookmarks", e)
      );
    getStatisticByType(user?.id, "follows/count")
      .then((response) =>
        setStatistic((prev) => {
          return { ...prev, totalFollower: response.data };
        })
      )
      .catch((e) =>
        console.log("ProfilePage - GetStatisticByType-followers", e)
      );
    getStatisticByType(user?.id, "pominent-categories")
      .then((response) => setCategoriesPosted(response.data))
      .catch((e) =>
        console.log("ProfilePage - GetStatisticByType-categories", e)
      );
  }, []);

  const handleUpdateProfile = () => {
    navigate("/update-profile");
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
              alt={user?.fullname || user?.id || user?.email}
              src={user?.image}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginX: "auto",
                width: "80px",
                height: "80px",
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
              <Typography variant="h5">{user?.fullname}</Typography>
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ fontSize: "12px" }}>
                @{user?.email}
              </Typography>
            </Box>
            <MyButton
              onClick={handleUpdateProfile}
              label="Chỉnh sửa thông tin cá nhân"
            />
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{
          marginTop: "50px",
        }}>
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <ListButtons setCardType={setCardType} />
            <ListData type={cardType} userId={user?.id} />
          </Grid>
          <Grid item md={3} xs={12}>
            <ProfileStatistic statistic={statistic} />
            <PostCategoryStat categories={categoriesPosted} />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const ListData = ({ type, userId }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await getAllPostOfAuthor(userId).then((response) => {
        setData(response.data);
      });
    }
    fetchData();
  }, []);

  console.log(data);
  if (!data) return null;
  return (
    <Grid container spacing={2}>
      {!data ||
        (data.length <= 0 && (
          <Grid item xs={12} textAlign="center">
            Không có thông tin
          </Grid>
        ))}
      {data &&
        data.length > 0 &&
        data.map((item) => {
          return (
            <Grid item xs={12} key={item.id}>
              {type === "drafts" && <CardDraft info={item} />}
              {type === "posts" && (
                <CardPost postInfo={item} direction="horizontal" />
              )}
              {type.includes("follow") && <CardAuthor data={item} />}
            </Grid>
          );
        })}
    </Grid>
  );
};

const ListButtons = ({ setCardType }) => {
  const [active, setActive] = useState("");
  useEffect(() => {
    setCardType("posts");
    setActive("posts");
  }, []);
  const handleGetPosts = () => {
    setActive("posts");
    setCardType("posts");
  };
  const handleGetDrafts = () => {
    setActive("drafts");
    setCardType("drafts");
  };
  const handleGetFollowings = () => {
    setActive("followings");
    setCardType("followings");
  };
  const handleGetFollowers = () => {
    setActive("followers");
    setCardType("followers");
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        mb: 3,
        overflowX: "auto",
        flexWrap: "nowrap",
        alignItems: "center",
        paddingBlock: 1,
      }}>
      <ButtonItem
        text="Bài viết"
        onClick={handleGetPosts}
        active={active === "posts"}
      />
      <ButtonItem
        text="Bài viết nháp"
        onClick={handleGetDrafts}
        active={active === "drafts"}
      />
      <ButtonItem
        text="Theo dõi"
        onClick={handleGetFollowings}
        active={active === "followings"}
      />
      <ButtonItem
        text="Người theo dõi"
        onClick={handleGetFollowers}
        active={active === "followers"}
      />
    </Box>
  );
};

const ButtonItem = ({ text, onClick = () => {}, active }) => {
  const { theme } = useMode();
  const token = tokens(theme.palette.mode);

  return (
    <Button
      variant="outlined"
      component="span"
      sx={{
        width: "fit-content",
        wordBreak: "normal",
        wordWrap: "normal",
        borderColor: active ? "initial" : "transparent",
        color: token.text,
        flexShrink: 0,
      }}
      onClick={onClick}>
      {text}
    </Button>
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
        order: {
          md: 2,
          xs: 1,
        },
      }}>
      {label}
    </Button>
  );
};

export default MyProfilePage;
