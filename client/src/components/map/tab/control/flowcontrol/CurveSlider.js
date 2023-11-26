import React from "react";
import { Box, Slider, Typography } from "@mui/material";

const CurveSlider = ({ value, onChange }) => {
  return (
    <Box sx={{ padding: "10px" }}>
      <Typography gutterBottom sx={{ color: "#fafafa" }}>
        Flow Line Curvature
      </Typography>
      <Slider
        value={value}
        onChange={onChange}
        min={0}
        max={15}
        step={0.1}
        marks
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default CurveSlider;
