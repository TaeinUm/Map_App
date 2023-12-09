import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

const HeatmapColorPicker = ({ heatColors, setHeatColors }) => {
  return (
    <Box sx={{ marginTop: "40px" }}>
      {Object.entries(heatColors).map(([key, value]) => (
        <Box
          key={key}
          style={{ display: "flex", alignItems: "center", margin: "10px 0" }}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography sx={{ color: "#fafafa" }}>{`Density ${key}:`}</Typography>
          <input
            type="color"
            value={value}
            onChange={(e) => setHeatColors(key, e.target.value)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default HeatmapColorPicker;
