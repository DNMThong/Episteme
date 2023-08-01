/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CardPost from "./CardPost";

const CardList = ({
   slug = "posts",
   direction = "vertical",
   containerAttributes = {},
}) => {
   const [posts, setPosts] = useState([]);
   useEffect(() => {
      function fetchData() {
         fetch(`/src/data/${slug}.json`)
            .then((result) => result.json())
            .then((res) => {
               console.log(res);
               setPosts(res);
            })
            .catch((err) => {
               console.log(err);
            });
      }
      fetchData();
   }, [slug]);
   return (
      <Grid container spacing={3} {...containerAttributes}>
         {posts &&
            posts.length > 0 &&
            posts.map((item) => {
               const postDirection =
                  direction === "vertical"
                     ? {
                          md: 3,
                          sm: 6,
                          xs: 12,
                       }
                     : { xs: 12 };

               return (
                  <Grid item {...postDirection} key={item.id}>
                     <CardPost blogInfo={item} direction={direction} />
                  </Grid>
               );
            })}
      </Grid>
   );
};

export default CardList;
