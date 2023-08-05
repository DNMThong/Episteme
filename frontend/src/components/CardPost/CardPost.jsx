/* eslint-disable react/prop-types */
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CardPoster from "./CardPoster";
import CardFooter from "./CardFooter";

const CardPost = ({ postInfo, direction = "vertical" }) => {
  const { thumbnail, ...info } = postInfo;
  console.log(postInfo);
  return (
    <Link
      to={`/p/${info.slug}`}
      style={{
        display: "block",
        height: "100%",
        maxHeight: direction === "horizontal" ? "140px" : "270px",
      }}>
      <Card
        sx={{
          cursor: "pointer",
          backgroundImage: "none",
          boxShadow: "none",
          border: 0,
          height: "100%",
          // maxHeight: direction === "horizontal" ? "140px" : "280px",
          display: "flex",
          flexFlow: direction === "horizontal" ? "row" : "column",
          "& .categories__container": {
            transition: "all 0.2s linear",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            columnGap: "4px",
            fontWeight: {
              xs: 400,
              md: 500,
            },
            fontSize: {
              xs: "12px",
              md: "14px",
            },
            // ":hover": {
            //    position: "relative",
            //    zIndex: 1000,
            //    flexWrap: "wrap",
            //    rowGap: 1,
            // },
          },
          "& .MuiCardContent-root": {
            padding: "8px 0px",
            flexFlow: "column",
          },
          "& .card__info": {
            height: "100%",
            display: "flex",
            flexFlow: "column",
          },
          "& .MuiCardMedia-root":
            direction === "vertical"
              ? {
                  minHeight: "140px",
                  height: "100%",
                  borderRadius: "6px",
                }
              : {
                  width: "140px",
                  height: "auto",
                  borderRadius: "6px",
                  marginRight: 2,
                },

          "& .card__title": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            textDecoration: "none",
            fontSize: {
              xs: "16px",
              md: "18px",
            },
          },
          "& .card__footer": {
            display: "flex",
            alignItems: "center",
            columnGap: 1,
            marginTop: "auto",
          },
          "& .card__footer > *": {
            fontSize: {
              xs: "10px",
              md: "12px",
              lg: "14px",
            },
          },
          "& .card__footer .dot": {
            display: "inline-block",
            width: 4,
            height: 4,
            borderRadius: "100%",
            backgroundColor: "#ccc",
          },
        }}>
        <CardPoster posterPath={thumbnail} height="140px" />
        <Box component="div" className="card__info">
          <CardContent>
            <Box className="categories__container">
              {info.categories &&
                info.categories.length > 0 &&
                info.categories.slice(0, 1).map((item) => {
                  return (
                    <Chip
                      label={item.name}
                      key={item.id}
                      sx={{
                        cursor: "pointer",
                        height: "fit-content",
                        "> span": {
                          fontSize: "12px",
                          padding: "2px 8px",
                        },
                      }}
                    />
                  );
                })}
            </Box>
            <Typography
              gutterBottom
              variant="h4"
              component="p"
              className="card__title">
              {info.title}
            </Typography>
          </CardContent>
          <CardFooter info={info} />
        </Box>
      </Card>
    </Link>
  );
};

export default CardPost;
