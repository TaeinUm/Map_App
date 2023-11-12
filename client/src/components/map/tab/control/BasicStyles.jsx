import React from "react";
import {
  Typography,
  Box,
  Input,
  Checkbox,
  Select,
  Button,
} from "@mui/material";

const BasicStyles = ({
  categories,
  styleSettings,
  handleColorChange,
  handleVisibilityChange,
  fontStyle,
  handleFontChange,
  regionColor,
  setRegionColor,
  selectedCountry,
}) => {
  return (
    <div>
      <h3 style={{ color: "#fafafa", textAlign: "left" }}>Basic Styles</h3>
      <Typography variant="h6" sx={{ color: "#fafafa", marginBottom: "10px" }}>
        Selected Country: {selectedCountry}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#fafafa",
        }}
      >
        <label>Region Color: </label>
        <input
          type="color"
          value={regionColor}
          onChange={(e) => setRegionColor(e.target.value)}
        />
      </div>
      {categories.map((category) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fafafa",
          }}
          key={category}
        >
          <label>{category}: </label>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <input
              type="color"
              value={styleSettings.color[category]}
              onChange={(e) => handleColorChange(category, e.target.value)}
              disabled={!styleSettings.visibility[category]}
            />
            <label>Visible: </label>
            <input
              type="checkbox"
              checked={styleSettings.visibility[category]}
              onChange={(e) =>
                handleVisibilityChange(category, e.target.checked)
              }
            />
          </div>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#fafafa",
        }}
      >
        <label style={{ marginBottom: "10px" }}>Font Style: </label>
        <select
          value={fontStyle}
          onChange={(e) => handleFontChange(e.target.value)}
        >
          <option value="Arial Unicode MS Bold">Arial Unicode MS Bold</option>
          <option value="Open Sans Bold">Open Sans Bold</option>
          <option value="DIN Offc Pro Medium">DIN Offc Pro Medium</option>
          <option value="Roboto Regular">Roboto Regular</option>
          <option value="Roboto Bold">Roboto Bold</option>
        </select>
      </div>
    </div>
  );
};

export default BasicStyles;
