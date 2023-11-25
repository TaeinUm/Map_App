import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

const HeatmapColorPicker = ({ map }) => {
  const [heatColors, setHeatColors] = useState({
    0.0: "rgba(33, 102, 172, 0)",
    0.2: "#0000FF", // Blue
    0.4: "#00FFFF", // Cyan
    0.6: "#00FF00", // Lime
    0.8: "#FFFF00", // Yellow
    1.0: "#FF0000", // Red
  });

  useEffect(() => {
    updateHeatmapColor();
  }, [heatColors]);

  const updateHeatmapColor = () => {
    const colorStops = Object.keys(heatColors)
      .sort((a, b) => parseFloat(a) - parseFloat(b)) // Sort by the density value
      .map((key) => [parseFloat(key), heatColors[key]])
      .flat();

    if (map) {
      map.setPaintProperty("heatmap-layer", "heatmap-color", [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        ...colorStops,
      ]);
    }
  };

  const handleColorChange = (density, color) => {
    const numericDensity = parseFloat(density);
    setHeatColors((prevColors) => ({
      ...prevColors,
      [numericDensity]: color,
    }));
  };

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
            onChange={(e) => handleColorChange(key, e.target.value)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default HeatmapColorPicker;
