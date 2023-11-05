import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

function Instruction() {
  /****      return       ****/
  return (
    <div>
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Side Line with Linear Gradient */}
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
        {/* Instruction Title1 */}
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
          {/* Instruction Title2 */}
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
            {/* Instructions and Images details */}
            <Box
              component="img"
              data-cy="instruction-image"
              src="path-to-image1.jpg"
              alt="Description 1"
              sx={{ width: "100%", maxWidth: "300px" }}
            />
            <Typography data-cy="instruction-text">Instructions 1</Typography>
            <Typography data-cy="instruction-text">Instructions 2</Typography>
            <Typography data-cy="instruction-text">Instructions 3</Typography>
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
              data-cy="instruction-image"
              src="path-to-image2.jpg"
              alt="Description 2"
              sx={{ width: "100%", maxWidth: "300px" }}
            />
            <Typography data-cy="instruction-text">Instructions 4</Typography>
            <Typography data-cy="instruction-text">Instructions 5</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Instruction;
