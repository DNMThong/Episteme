import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import HeaderAdmin from "../../components/HeaderAdmin";
import StatBox from "./../../components/StatBox/index";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { tokens } from "../../constants/theme";
import { useTheme } from "@emotion/react";
import LineChart from "../../components/LineChart";
import { data } from "../../data/linechart";
import InfoUserTable from "../../components/InfoUserTable";
import { Link } from "react-router-dom";

const HomePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <HeaderAdmin
        title="Trang chủ"
        subtitle="Thống kê một số thông tin"></HeaderAdmin>
      <Grid container spacing="20px">
        <Grid item md={4} sm={4} xs={12}>
          <StatBox
            icon={
              <VisibilityIcon
                sx={{ color: colors.greenAccent, fontSize: "26px" }}
              />
            }
            title="112"
            increase="+12%"
            subtitle="Lượng truy cập"></StatBox>
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <StatBox
            icon={
              <CreateNewFolderIcon
                sx={{ color: colors.greenAccent, fontSize: "26px" }}
              />
            }
            title="112"
            increase="+12%"
            subtitle="Bài viết mới"></StatBox>
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <StatBox
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent, fontSize: "26px" }}
              />
            }
            title="112"
            increase="+12%"
            subtitle="Người dùng mới"></StatBox>
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
          <Paper sx={{ padding: "20px", overflowX: "auto" }}>
            <Typography variant="h5">Thống kê theo tuần</Typography>
            <Box height="400px" minWidth="400px">
              <LineChart data={data} />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <Paper sx={{ padding: "20px", mb: "20px" }}>
            <Typography variant="h5" mb="20px">
              Tác giả nổi bật
            </Typography>
            <Stack spacing="15px" overflow="hidden">
              <Link to="/user">
                <InfoUserTable
                  online={true}
                  title="Nguyễn Văn A"
                  subtitle="nguyenvana@gmail.com"
                  avatar="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"></InfoUserTable>
              </Link>
              <Link to="/user">
                <InfoUserTable
                  online={true}
                  title="Nguyễn Văn A"
                  subtitle="nguyenvana@gmail.com"
                  avatar="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"></InfoUserTable>
              </Link>
              <Link to="/user">
                <InfoUserTable
                  online={true}
                  title="Nguyễn Văn A"
                  subtitle="nguyenvana@gmail.com"
                  avatar="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"></InfoUserTable>
              </Link>
              <Link to="/user">
                <InfoUserTable
                  online={true}
                  title="Nguyễn Văn A"
                  subtitle="nguyenvana@gmail.com"
                  avatar="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"></InfoUserTable>
              </Link>
              <Link to="/user">
                <InfoUserTable
                  online={true}
                  title="Nguyễn Văn A"
                  subtitle="nguyenvana@gmail.com"
                  avatar="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"></InfoUserTable>
              </Link>
            </Stack>
          </Paper>
          <Paper sx={{ padding: "20px" }}>
            <Typography variant="h5">Bài viết nổi bật</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
