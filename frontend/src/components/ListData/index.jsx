import { useEffect, useState } from "react";
import CardAuthor from "../CardAuthor";
import { CardPost } from "../CardPost";
import { Grid } from "@mui/material";
import CardDraft from "../CardDraft/CardDraft";
import { getAllCardByType } from "../../services/authorService";

const ListData = ({ type, userId }) => {
   const [data, setData] = useState([]);
   useEffect(() => {
      getAllCardByType(type, userId)
         .then((response) => {
            setData(response?.data);
         })
         .catch((e) => console.log(e));
   }, [type]);
   if (!data) return null;
   return (
      <Grid container spacing={2}>
         {data &&
            data.length > 0 &&
            data.map((item) => {
               return (
                  <Grid item xs={12} key={item.id}>
                     {type === "drafts" && <CardDraft info={item} />}
                     {type === "posts" && (
                        <CardPost postInfo={item} direction="horizontal" />
                     )}
                     {type === "bookmarks" && (
                        <CardPost
                           postInfo={item?.post}
                           direction="horizontal"
                        />
                     )}
                     {type.includes("follow") && <CardAuthor data={item} />}
                  </Grid>
               );
            })}
      </Grid>
   );
};

export default ListData;
