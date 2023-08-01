import { Container, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { CardList } from "../../../components/CardPost";
import { CommentBox, ReplyBox } from "../../../components/Comment";

const ListPage = () => {
   const { slug } = useParams();
   console.log(slug);
   return (
      <>
         <Paper
            sx={{
               padding: 4,
               textAlign: "center",
               marginBlock: "16px 32px",
            }}
         >
            <Typography variant="h3">Lists</Typography>
         </Paper>
         <Container>
            <CardList></CardList>
         </Container>
         <Container sx={{ marginTop: 3 }}>
            <Grid container>
               <Grid item xs={12} md={9}>
                  <CommentBox></CommentBox>
                  <ReplyBox />
               </Grid>
            </Grid>
         </Container>
      </>
   );
};

export default ListPage;
