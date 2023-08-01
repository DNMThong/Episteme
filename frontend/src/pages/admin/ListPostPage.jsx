import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../constants/theme";
import HeaderAdmin from "../../components/HeaderAdmin";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ActionTable from "../../components/ActionTable";
import { Link } from "react-router-dom";
import DisplayTimeTable from "../../components/DisplayTimeTable";
import ChipCustom from "../../components/ChipCustom";
import { useState } from "react";

const ListPostPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "name",
      headerName: "Tên bài viết",
      width: 250,
    },
    {
      field: "author",
      headerName: "Tác giả",
      width: 100,
      renderCell: ({ row }) => (
        <Link to="/s">
          <Typography color={colors.greenAccent}>Tác giả</Typography>
        </Link>
      ),
    },
    {
      field: "createAt",
      headerName: "Ngày tạo",
      width: 200,
      renderCell: ({ row }) => (
        <DisplayTimeTable time="11:45 PM" date="23/7/2023" />
      ),
    },
    {
      field: "updateAt",
      headerName: "Ngày cập nhập",
      width: 200,
      renderCell: ({ row }) => (
        <DisplayTimeTable time="11:45 PM" date="23/7/2023" />
      ),
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
      renderCell: ({ row: { id } }) => {
        const [isLock, setIsLock] = useState(false);
        return (
          <ActionTable
            view={() => {}}
            lock={() => setIsLock((prev) => !prev)}
            isLock={isLock}
            remove={() => {}}
          />
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <HeaderAdmin title="Bài viết" subtitle="Danh sách bài viết" />
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
              createAt: "11:09:23PM 23/7/2023",
              updateAt: "11:54:23PM 23/7/2023",
              status: "Hoạt động",
            },
          ]}
          components={{ Toolbar: GridToolbar }}></DataGrid>
      </Box>
    </Box>
  );
};

export default ListPostPage;
