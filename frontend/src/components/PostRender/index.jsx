import { Box } from "@mui/material";
import renderBlock from "./renderBlock";

const PostRender = ({ data: { blocks } }) => {
  return (
    <Box
      sx={{
        maxWidth: "650px",
        width: "100%",
        margin: "20px auto",
      }}>
      {blocks.map((block) => {
        const blockRender = renderBlock(block);
        if (!blockRender) return null;
        return (
          <Box key={block.id} sx={{ padding: "0.4em 0" }}>
            {blockRender}
          </Box>
        );
      })}
    </Box>
  );
};

export default PostRender;
