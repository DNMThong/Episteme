import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

const CardDraftStyled = styled(Box)(({ theme }) => ({
   "&": {
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: theme.palette.mode === "light" ? "#ccc" : "#F8F8FF",
      display: "flex",
      flexDirection: "column",
      padding: 16,
      borderRadius: 4,
   },
   "& .card-draft__footer": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
   },
   "& h5": {
      fontWeight: 600,
   },
   "& h6": {
      fontWeight: 500,
   },
   "& .card-draft__date": {
      fontWeight: 400,
      fontSize: 13,
   },
}));

const CardDraft = () => {
   return (
      <CardDraftStyled>
         <Typography variant="h5">CardTitle</Typography>
         <Typography variant="h6" component="p">
            CardTitle
         </Typography>
         <Box className="card-draft__footer">
            <Typography
               component="span"
               variant="subtitle1"
               className="card-draft__date"
            >
               29 thang 7 nam 2023
            </Typography>
            <Box className="card-draft__btns">
               <Button>Chỉnh sửa</Button>
               <Button>Xóa</Button>
            </Box>
         </Box>
      </CardDraftStyled>
   );
};

export default CardDraft;
