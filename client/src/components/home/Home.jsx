import React from "react";
import { Box } from "@mui/material";

/****  Import Components  *****/
import Trending from "./Trending";
import Instruction from "./Instruction";

const Home = () => {
  return (
    <Box sx={{ fontFamily: "Arial", width: "100%", m: "auto", p: 2 }}>
      {/* TOP5 Trending Map Graphics */}
      <Box sx={{ mt: "20px" }}>
        <Trending />
      </Box>

      {/* Simple Instruction */}
      <Box sx={{ mt: "120px" }}>
        <Instruction />
      </Box>
    </Box>
  );
};

export default Home;
