import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../constants/theme";
import HeaderAdmin from "../../components/HeaderAdmin";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ActionTable from "../../components/ActionTable";
import InfoUserTable from "../../components/InfoUserTable";
import DisplayTimeTable from "../../components/DisplayTimeTable";
import ChipCustom from "../../components/ChipCustom/index";

const ListCategoryPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "name",
      headerName: "Tên",
      width: 250,
    },
    {
      field: "slug",
      headerName: "Đường dẫn",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row }) => (
        <ActionTable edit={() => {}} remove={() => {}} />
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
              name: "Lập trình",
              slug: "lap-trinh",
            },
          ]}
          components={{ Toolbar: GridToolbar }}></DataGrid>
      </Box>
    </Box>
  );
};

export default ListCategoryPage;
