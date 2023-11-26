import React from "react";
import { Box, Slider, Typography } from "@mui/material";

const LineWidthSlider = ({ value, onChange }) => {
  return (
    <Box sx={{ padding: "10px", marginBottom: "30px" }}>
      <Typography gutterBottom sx={{ color: "#fafafa" }}>
        Flow Line Width
      </Typography>
      <Slider
        value={value}
        onChange={onChange}
        min={1}
        max={10}
        step={0.5}
        marks
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default LineWidthSlider;
