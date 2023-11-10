import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";

const instructions = [
  { id: 1, text: "1. Go to Map page", image: "image1.jpg" },
  {
    id: 2,
    text: "2. Choose graphics or map files to edit",
    image: "image2.jpg",
  },
  {
    id: 3,
    text: "3. Change graphics style just by a few clicks",
    image: "image2.jpg",
  },
  { id: 4, text: "4. You can also change JSON file", image: "image2.jpg" },
  { id: 5, text: "5. Save Your map graphics!", image: "image2.jpg" },
];

function Instruction() {
  const [selectedInstruction, setSelectedInstruction] = useState(
    instructions[0]
  );

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
          {/* Instructions and Images details */}
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
              {instructions.map((instruction) => (
                <Button
                  key={instruction.id}
                  onClick={() => setSelectedInstruction(instruction)}
                  sx={{ color: "#fafafa" }}
                >
                  {instruction.text}
                </Button>
              ))}
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ width: "80%", height: "800px", backgroundColor: "grey" }}
            >
              <div className="animation-container">
                <img
                  src={selectedInstruction.image}
                  alt={selectedInstruction.text}
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default Instruction;
