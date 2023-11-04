import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Home = () => {
  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollAmount((prev) => (prev - 650) % (650 * 3));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ fontFamily: "Arial", width: "100%", m: "auto", p: 2 }}>
      <Box sx={{ overflow: "hidden", mb: 5 }}>
        <Typography
          variant="h2"
          component="h3"
          sx={{
            fontSize: "50px",
            color: "#FAFAFA",
            mb: 2,
            ml: 5,
            display: "flex",
            flexGrow: "1",
            fontWeight: "bold",
          }}
        >
          Trending Map Graphics
        </Typography>
        <Box
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
          <Paper
            elevation={4}
            sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
          >
            img
          </Paper>
          <Paper
            elevation={4}
            sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
          >
            img
          </Paper>
          <Paper
            elevation={4}
            sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
          >
            img
          </Paper>
          <Paper
            elevation={4}
            sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
          >
            img
          </Paper>
          <Paper
            elevation={4}
            sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
          >
            img
          </Paper>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "15px",
            background: "linear-gradient(to bottom, #ff6a00, #ee0979)",
            left: "10%",
            top: 0,
            zIndex: 0,
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontSize: "40px",
            mb: 3,
            color: "#FAFAFA",
            fontWeight: "bold",
            zIndex: 2,
            marginLeft: "-60px",
          }}
        >
          MAP Your Vision,
        </Typography>
        <Box sx={{ display: "flex" }}>
          {/* Instruction Title */}
          <Typography
            variant="h2"
            sx={{
              fontSize: "40px",
              mb: 3,
              color: "#FAFAFA",
              fontWeight: "bold",
              marginLeft: "100px",
            }}
          >
            Connect Your WORLD
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "40px" }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Instructions and Images */}
            <Box
              component="img"
              src="path-to-image1.jpg"
              alt="Description 1"
              sx={{ width: "100%", maxWidth: "300px" }}
            />
            <Typography>Instructions 1</Typography>
            <Typography>Instructions 2</Typography>
            <Typography>Instructions 3</Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              component="img"
              src="path-to-image2.jpg"
              alt="Description 2"
              sx={{ width: "100%", maxWidth: "300px" }}
            />
            <Typography>Instructions 4</Typography>
            <Typography>Instructions 5</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
