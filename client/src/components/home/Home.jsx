import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";

/****  Import Components  *****/
import Trending from "./Trending";
import Instruction from "./Instruction";

const Home = () => {
  return (
    <Box sx={{ fontFamily: "Arial", width: "100%", m: "auto", p: 2 }}>
      {/* TOP5 Trending Map Graphics */}
      <Trending />

      {/* Simple Instruction */}
      <Instruction />
    </Box>
  );
};

export default Home;
