import Banner from "../../../components/Banner";
import { Container, Grid } from "@mui/material";
import AuthorList from "../../../components/CardAuthor/AuthorList";
import {
   CardList,
   CardListHeader,
   CustomCardListDirection,
} from "../../../components/CardPost";

const HomePageUser = () => {
   return (
      <>
         <Banner></Banner>

         <Container sx={{ mb: 10 }}>
            <CardListHeader text="Bài viết mới" slug="/newest" />
            <CardList type="newest" />
         </Container>
         <Container sx={{ mb: 10 }}>
            <CardListHeader text="Bài viết nổi bật" slug="/popular" />
            <CardList type="popular" />
         </Container>
         <Container sx={{ mb: 10 }}>
            <Grid container spacing={2}>
               <Grid item xs={12} md={9}>
                  <CustomCardListDirection cardDirection="horizontal" />
               </Grid>
               <Grid item xs={12} md={3}>
                  <AuthorList />
               </Grid>
            </Grid>
         </Container>
      </>
   );
};

export default HomePageUser;
