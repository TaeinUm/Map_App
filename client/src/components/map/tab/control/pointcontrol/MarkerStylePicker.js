import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const MarkerStylePicker = ({ markers }) => {
  const [markerColor, setMarkerColor] = useState("#FF0000");
  const [markerSize, setMarkerSize] = useState("medium");

  const updateMarkersStyle = () => {
    markers.forEach((marker) => {
      // Update the color of the existing marker
      marker.getElement().style.backgroundColor = markerColor;

      // Adjust the size of the marker
      const scale = getSizeScale(markerSize);
      marker.getElement().style.width = `${scale * 20}px`; // Example size calculation
      marker.getElement().style.height = `${scale * 20}px`;
    });
  };

  const getSizeScale = (size) => {
    switch (size) {
      case "small":
        return 0.5;
      case "medium":
        return 1;
      case "large":
        return 1.5;
      default:
        return 1;
    }
  };

  return (
    <Box>
      <Typography>Select Marker Color:</Typography>
      <input
        type="color"
        value={markerColor}
        onChange={(e) => setMarkerColor(e.target.value)}
      />

      <FormControl fullWidth>
        <InputLabel>Marker Size</InputLabel>
        <Select
          value={markerSize}
          label="Marker Size"
          onChange={(e) => setMarkerSize(e.target.value)}
        >
          <MenuItem value="small">Small</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="large">Large</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={updateMarkersStyle}>Update Marker Styles</Button>
    </Box>
  );
};

export default MarkerStylePicker;
