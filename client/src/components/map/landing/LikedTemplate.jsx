import { Box, Link, IconButton } from "@mui/material";
import { AiTwotoneHeart } from "react-icons/ai";

// Array of image URLs
const imageUrls = [
  "https://geology.com/world/the-united-states-of-america-map.gif",
  "https://geology.com/maps/types-of-maps/weather-map.gif",
  "https://app.datawrapper.de/lib/plugins/vis-d3-maps/static/images/thumb-d3-maps-choropleth.png",
  "https://images.nationalgeographic.org/image/upload/v1638889599/EducationHub/photos/physical-map.jpg"
];

function LikedTemplates() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {imageUrls.map((imageUrl, index) => (
        <Box key={index} sx={{ mb: 2, position: "relative", width: "48%" }}>
          <Link href="/" underline="none">
            <Box
              component="img"
              src={imageUrl} // Use imageUrl here
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
