import {
  Box,
  Link,
  IconButton,
} from "@mui/material";
import {
    AiTwotoneHeart,
  } from "react-icons/ai";

function LikedTemplates() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {[...Array(4)].map((_, index) => (
        <Box key={index} sx={{ mb: 2, position: "relative", width: "48%" }}>
          <Link href="/" underline="none">
            <Box
              component="img"
              src="mapImageUrl"
              sx={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                bgcolor: "grey",
              }}
            />
          </Link>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "red",
            }}
            aria-label="like"
          >
            <AiTwotoneHeart />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}

export default LikedTemplates;
