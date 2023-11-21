import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import continents from "../tab/control/continentsData";

const ContinentColorUpdater = ({ handleContinentSelect, color }) => {
  return (
    <Box>
      {Object.keys(continents).map((continent) => (
        <Button
          key={continent}
          sx={{
            width: "220px",
            marginBottom: "30px",
            backgroundColor: "#fafafa",
            color: "black",
          }}
          variant="contained"
          onClick={() => handleContinentSelect(continent)}
        >
          Update {continent}
        </Button>
      ))}
    </Box>
  );
};

export default ContinentColorUpdater;
