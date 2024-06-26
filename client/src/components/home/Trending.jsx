import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getTop5Trending } from "../../api/graphicsAPI";

import placeholder from "../../assets/images/TerraCanvas_placeholder_image.png";

function Trending() {
  /****   useState Section  ****/
  const [scrollAmount, setScrollAmount] = useState(0);
  const [topGraphics, setTopGraphics] = useState([]);

  const navigate = useNavigate();

  const handlePostClick = (post) => {
    navigate(`/posts/${post.postType}/${post._id}`);
  };

  /****   useEffect Section  ****/
  useEffect(() => {
    const fetchGraphics = async () => {
      try {
        const data = await getTop5Trending();

        setTopGraphics(data);
      } catch (error) {
        console.error("Error fetching top graphics:", error);
      }
    };

    fetchGraphics();

    const interval = setInterval(() => {
      setScrollAmount((prev) => (prev - 650) % (650 * 3));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /****   return  ****/
  return (
    <div>
      <Box sx={{ overflow: "hidden", mb: 5 }}>
        {/* Title */}
        <Typography
          variant="h2"
          component="h3"
          sx={{
            fontSize: "40px",
            color: "#FAFAFA",
            mb: 2,
            display: "flex",
            flexGrow: "1",
            fontWeight: "bold",
          }}
        >
          Trending Map Graphics
        </Typography>
        <Box
          data-cy="trending-container"
          sx={{
            display: "flex",
            width: "3250px",
            gap: "10px",
            ml: 5,
            transition: "transform 0.5s",
            transform: `translateX(${scrollAmount}px)`,
          }}
        >
          {/* TOP5 Trending Map Graphics Examples */}
          {topGraphics.slice(0, 5).map((graphic, index) => (
            <Paper
              key={index}
              elevation={4}
              data-cy="trending-graphic"
              sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
              onClick={() => handlePostClick(graphic)}
            >
              <img
                src={graphic.postImages || placeholder}
                alt={graphic.postName}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Paper>
          ))}
          {Array(5 - topGraphics.length)
            .fill()
            .map((_, index) => (
              <Paper
                key={topGraphics.length + index}
                elevation={4}
                data-cy="trending-graphic"
                sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
              >
                img
              </Paper>
            ))}
        </Box>
      </Box>
    </div>
  );
}

export default Trending;
