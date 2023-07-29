import Banner from "../../../components/Banner";
import { Container, Grid } from "@mui/material";
import AuthorList from "../../../components/CardAuthor/AuthorList";
import {
   CardList,
   CardListHeader,
   CustomCardListDirection,
} from "../../../components/CardPost";

// const cards = [
//    {
//       id: 1,
//       title: "Duong Nguyen Minh Minh Minh Thong Kakaka",
//       summary:
//          "Duong Nguyen Minh Minh Minh Thong Kakakakakaakaka hahahaha hahahahaha",
//       posterPath:
//          "https://cdn.discordapp.com/attachments/911999301717200906/1129624110931120329/323817117_1263876954160070_4031113429306859744_n.jpg",
//       author: "Whisper",
//       categories: ["Kiến thức"],
//       createDate: "9 July",
//    },
//    {
//       id: 2,
//       title: "Duong Nguyen Minh Minh Minh Thong Kakaka",
//       summary:
//          "Duong Nguyen Minh Minh Minh Thong Kakakakakaakaka hahahaha hahahahaha",
//       posterPath:
//          "https://cdn.discordapp.com/attachments/911999301717200906/1129624110931120329/323817117_1263876954160070_4031113429306859744_n.jpg",
//       author: "Whisper",
//       categories: ["Kiến thức", "Đời sống", "Đời sống", "Đời sống", "Đời sống"],
//       createDate: "9 July",
//    },
//    {
//       id: 3,
//       title: "Nguyen Vo Quoc Annn Annn Annn Khang Thinh Vuong",
//       summary:
//          "https://cdn.discordapp.com/attachments/911999301717200906/1129624110931120329/323817117_1263876954160070_4031113429306859744_n.jpg",
//       posterPath:
//          "https://cdn.discordapp.com/attachments/1107290706776699041/1129081329204609145/image.png",
//       author: "Gwen Souma",
//       categories: ["Kiến thức", "Đời sống", "Đời sống", "Đời sống", "Đời sống"],
//       createDate: "9 July",
//    },
//    {
//       id: 4,
//       title: "Nguyen Hoang Quan Hung Luc Luong Nhan Dan",
//       summary:
//          "Nguyen Hoang Quan Hung Luc Luong Nhan Dan Hung Manh Nhat The Gioi",
//       posterPath:
//          "https://cdn.discordapp.com/attachments/999302746056433684/1129861823286493265/image.png",
//       author: "Nguyen Hoang Quan Ke",
//       categories: ["Kiến thức", "Đời sống", "Đời sống", "Đời sống", "Đời sống"],
//       createDate: "9 July",
//    },
// ];

const HomePageUser = () => {
   return (
      <>
         <Banner></Banner>

         <Container sx={{ mb: 10 }}>
            <CardListHeader text="Bài viết nổi bật" slug="/popularAuthor" />
            <CardList />
         </Container>
         <Container sx={{ mb: 10 }}>
            <CardListHeader text="Tác giả nổi bật" slug="/popularAuthor" />
            <CardList />
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
