import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import HeaderAdmin from "../../components/HeaderAdmin";
import StatBox from "./../../components/StatBox/index";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { tokens } from "../../constants/theme";
import { useTheme } from "@emotion/react";
import LineChart from "../../components/LineChart";
import { data } from "../../data/linechart";
import InfoUserTable from "../../components/InfoUserTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReportPostNew } from "../../services/reportService";
import { getReportUserNew } from "./../../services/reportService";
import { getPostsPedingForAdmin } from "../../services/postService";

const getPrevDay = (about) => {
  // Lấy ngày hiện tại
  var currentDate = new Date();

  // Lấy ngày 7 ngày trước
  var sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - about);

  return sevenDaysAgo.toISOString().split("T")[0];
};

const precentDownUp = (value1, value2) => {
  if (value2 === 0) return 0;
  const precent = ((value2 - value1) / value2) * 100;
  console.log(precent);
  return precent;
};

const HomePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [reportWeek, setReportWeek] = useState([]);
  const [reportUserDay, setReportUserDay] = useState({
    total: 0,
    prescent: 0,
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsPedingForAdmin().then((response) => setPosts(response?.data));
  }, []);

  const [reportPostrDay, setReportPostrDay] = useState({
    total: 0,
    prescent: 0,
  });
  console.log(getPrevDay(0));
  useEffect(() => {
    getReportPostNew(getPrevDay(6), getPrevDay(0)).then((response) =>
      setReportWeek((prev) => [...prev, response.data])
    );
    getReportUserNew(getPrevDay(6), getPrevDay(0)).then((response) =>
      setReportWeek((prev) => [...prev, response.data])
    );

    getReportPostNew(getPrevDay(1), getPrevDay(0)).then((response) => {
      const report = response.data.data;

      setReportPostrDay({
        total: report[1].y,
        prescent: precentDownUp(report[0].y, report[1].y),
      });
    });
    getReportUserNew(getPrevDay(1), getPrevDay(0)).then((response) => {
      const report = response.data.data;
      setReportUserDay({
        total: report[1].y,
        prescent: precentDownUp(report[0].y, report[1].y),
      });
    });
  }, []);

  return (
    <Box m="20px">
      <HeaderAdmin
        title="Trang chủ"
        subtitle="Thống kê một số thông tin"></HeaderAdmin>
      <Grid container spacing="20px">
        <Grid item md={4} sm={4} xs={12}>
          <StatBox
            progress={1}
            icon={
              <ConfirmationNumberIcon
                sx={{ color: colors.greenAccent, fontSize: "26px" }}
              />
            }
            title={posts.length}
            subtitle="Bài viết chờ duyệt"></StatBox>
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <StatBox
            icon={
              <CreateNewFolderIcon
                sx={{ color: colors.greenAccent, fontSize: "26px" }}
              />
            }
            progress={reportPostrDay.prescent / 100}
            title={reportPostrDay.total}
            increase={`${reportPostrDay.prescent}%`}
            subtitle="Bài viết mới"></StatBox>
        </Grid>
        {reportUserDay && (
          <Grid item md={4} sm={4} xs={12}>
            <StatBox
              progress={reportUserDay.prescent / 100}
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent, fontSize: "26px" }}
                />
              }
              title={reportUserDay.total}
              increase={`${reportUserDay.prescent}%`}
              subtitle="Người dùng mới"></StatBox>
          </Grid>
        )}
        <Grid item md={8} sm={12} xs={12}>
          <Paper sx={{ padding: "20px", overflowX: "auto" }}>
            <Typography variant="h5">Thống kê theo tuần</Typography>
            <Box height="400px" minWidth="400px">
              <LineChart data={reportWeek} />
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
