import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

function Regional({
  selectionType,
  handleSelectionTypeChange,
  color,
  handleContinentSelect,
  handleCategoryColor,
  log,
  updateCountryColor,
  countries,
  handleCountryChange,
  selectedCountry,
}) {
  const handleColorChange = (event) => {
    const newColor = event.target.value;
    handleCategoryColor(newColor);
  };

  return (
    <>
      <RadioGroup
        row
        value={selectionType}
        onChange={handleSelectionTypeChange}
      >
        <FormControlLabel value="country" control={<Radio />} label="Country" />
        <FormControlLabel
          value="continent"
          control={<Radio />}
          label="Continent"
        />
      </RadioGroup>

      {selectionType === "country" ? (
        <FormControl>
          <input type="color" value={color} onChange={handleColorChange} />
          <InputLabel>Country</InputLabel>
          <Select
            value={selectedCountry}
            label="Country"
            onChange={handleCountryChange}
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={updateCountryColor}>
            Update Color
          </Button>
        </FormControl>
      ) : (
        <FormControl>
          <input type="color" value={color} onChange={handleColorChange} />
          <Button variant="contained" onClick={updateCountryColor}>
            Update Color
          </Button>
          <InputLabel>Continent</InputLabel>
          <Button
            variant="contained"
            onClick={() => handleContinentSelect("north_america")}
          >
            Update North America
          </Button>
          <Button
            variant="contained"
            onClick={() => handleContinentSelect("asia")}
          >
            Update Asia
          </Button>
          <Button
            variant="contained"
            onClick={() => handleContinentSelect("europe")}
          >
            Update Europe
          </Button>
          <Button
            variant="contained"
            onClick={() => handleContinentSelect("africa")}
          >
            Update Africa
          </Button>
          <Button
            variant="contained"
            onClick={() => handleContinentSelect("south_america")}
          >
            Update South America
          </Button>
          <Button
            variant="contained"
            onClick={() => handleContinentSelect("australia_oceania")}
          >
            Update Australia Oceania
          </Button>
        </FormControl>
      )}
      <Box>
        {log.map((entry, index) =>
          entry.country ? (
            <Typography
              key={index}
              sx={{ color: "#fafafa" }}
            >{`${entry.country}: ${entry.color}`}</Typography>
          ) : (
            <Typography
              key={index}
              sx={{ color: "#fafafa" }}
            >{`${entry.continent}: ${entry.color}`}</Typography>
          )
        )}
      </Box>
    </>
  );
}

export default Regional;
