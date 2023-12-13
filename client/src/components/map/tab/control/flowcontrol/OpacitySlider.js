import React from "react";
import { Box, Slider, Typography } from "@mui/material";

const OpacitySlider = ({ value, onChange }) => {
  return (
    <Box data-cy="flow-opacity" sx={{ padding: "20px" }}>
      <Typography gutterBottom sx={{ color: "#Fafafa" }}>
        Flow Line Opacity
      </Typography>
      <Slider
        value={value}
        onChange={onChange}
        min={0}
        max={1}
        step={0.05}
        marks
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default OpacitySlider;
