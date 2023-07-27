import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../constants/theme";
import HeaderAdmin from "../../components/HeaderAdmin";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ActionTable from "../../components/ActionTable";
import InfoUserTable from "../../components/InfoUserTable";
import DisplayTimeTable from "../../components/DisplayTimeTable";
import ChipCustom from "./../../components/ChipCustom/index";

const ListUserPost = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      headerName: "Thông tin",
      width: 200,
      renderCell: ({ row: { image, fullname, birthday } }) => (
        <InfoUserTable avatar={image} title={fullname} subtitle={birthday} />
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "registeredAt",
      headerName: "Ngày đăng ký",
      width: 150,
      renderCell: ({ row }) => (
        <DisplayTimeTable time="11:45 PM" date="23/7/2023" />
      ),
    },
    {
      field: "lastLogin",
      headerName: "Đăng nhập cuối",
      width: 150,
      renderCell: ({ row }) => (
        <DisplayTimeTable time="11:45 PM" date="23/7/2023" />
      ),
    },
    {
      field: "role",
      headerName: "Vai trò",
      width: 100,
      renderCell: ({ row }) => <ChipCustom type="user" label="User" />,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: ({ row: { status } }) => (
        <ChipCustom type="success" label={status} />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: ({ row }) => (
        <ActionTable view={() => {}} edit={() => {}} remove={() => {}} />
      ),
    },
  ];

  return (
    <Box m="20px">
      <HeaderAdmin title="Người dùng" subtitle="Danh sách người dùng" />
      <Box
        mt="40px"
        overflow="auto"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
        }}>
        <DataGrid
          columns={columns}
          rows={[
            {
              id: "13",
              name: "Displays element information like tag name, class, id, size etc.",
              registeredAt: "11:09:23PM 23/7/2023",
              lastLogin: "11:54:23PM 23/7/2023",
              status: "Hoạt động",
              image:
                "https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj",
              fullname: "Nguyễn Văn ABC",
              birthday: "1/1/2023",
              email: "nguyenvana123@gmail.com",
            },
          ]}
          components={{ Toolbar: GridToolbar }}></DataGrid>
      </Box>
    </Box>
  );
};

export default ListUserPost;
