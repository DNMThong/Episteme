import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../constants/theme";
import HeaderAdmin from "../../components/HeaderAdmin";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ActionTable from "../../components/ActionTable";
import InfoUserTable from "../../components/InfoUserTable";
import DisplayTimeTable from "../../components/DisplayTimeTable";
import ChipCustom from "./../../components/ChipCustom/index";
import { useEffect, useState } from "react";
import { getUsersAdmin } from "../../services/userAdminService";

const ListUserPost = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const response = getUsersAdmin();
    const fetchData = async () => {
      try {
        const response = await getUsersAdmin();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  console.log(users);

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 200,
    },
    {
      field: "fullname",
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
    // {
    //   field: "registeredAt",
    //   headerName: "Ngày đăng ký",
    //   width: 150,
    //   renderCell: ({ row }) => (
    //     <DisplayTimeTable time="11:45 PM" date="23/7/2023" />
    //   ),
    // },
    // {
    //   field: "lastLogin",
    //   headerName: "Đăng nhập cuối",
    //   width: 150,
    //   renderCell: ({ row }) => (
    //     <DisplayTimeTable time="11:45 PM" date="23/7/2023" />
    //   ),
    // },
    {
      field: "role",
      headerName: "Vai trò",
      width: 100,
      renderCell: ({ row: { role } }) => (
        <ChipCustom type={role.toLowerCase()} label={role} />
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: ({ row: { status } }) => {
        if (status === "active") {
          return <ChipCustom type="success" label={status} />;
        }
        return <ChipCustom type="success" label={status} />;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: ({ row: { id } }) => (
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
          rows={users}
          components={{ Toolbar: GridToolbar }}
          key={"abcsa"}></DataGrid>
      </Box>
    </Box>
  );
};

export default ListUserPost;
