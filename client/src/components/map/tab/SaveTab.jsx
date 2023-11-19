import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";
import * as mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

const selectStyle = {
  ".MuiInputBase-input": { color: "#fafafa" },
  ".MuiSelect-select": { color: "#fafafa" },
  ".MuiOutlinedInput-notchedOutline": { borderColor: "#fafafa" },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fafafa",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fafafa",
  },
  "& .MuiSvgIcon-root": {
    color: "#fafafa",
  },
  borderTop: "1px solid #fafafa",
};

function SaveTab({ onSave, mapLayer }) {
  const [title, setTitle] = useState("");
  const [versionSetting, setVersionSetting] = useState("");
  const [exportFile, setExportFile] = useState("");
  const [privacySetting, setPrivacySetting] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleVersionSettingChange = (event) => {
    setVersionSetting(event.target.value);
  };

  const handleExportFileChange = (event) => {
    setExportFile(event.target.value);
  };

  const handlePrivacySettingChange = (event) => {
    setPrivacySetting(event.target.value);
  };

  const exportMapAsJson = (map) => {
    try {
      const mapJson = map.getStyle();
      return JSON.stringify(mapJson, null, 2); // Converts JSON object to string
    } catch (error) {
      console.error("Error exporting map as JSON:", error);
      throw error;
    }
  };

  const exportMapAsImage = async (map, format) => {
    // Replace these with the actual values from your map
    const longitude = map.getCenter().lng;
    const latitude = map.getCenter().lat;
    const zoom = map.getZoom();

    // Construct the URL for the Static Images API
    const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},${zoom}/1024x768?access_token=${mapboxgl.accessToken}&format=${format}`;

    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      return new Blob([response.data], { type: `image/${format}` });
    } catch (error) {
      console.error("Error exporting map as image:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    let mapLayer;
    if (exportFile === "jpg" || exportFile === "png" || exportFile === "pdf") {
      exportMapAsImage();
    } else if (exportFile === "json") {
      exportMapAsJson();
    }

    // Call onSave function passed from parent component with required parameters
    onSave(title, versionSetting, privacySetting, mapLayer);
  };

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: 3,
        }}
      >
        <Typography sx={{ color: "#fafafa" }}>Title</Typography>
        <FormControl margin="normal">
          <TextField
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            size="small"
            sx={selectStyle}
            name="title"
          />
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: 3,
        }}
      >
        <Typography sx={{ color: "#fafafa", textAlign: "left" }}>
          Version Setting
        </Typography>
        <FormControl margin="normal" sx={{ width: "100%" }}>
          <Select
            size="small"
            value={versionSetting}
            onChange={handleVersionSettingChange}
            sx={selectStyle}
            name="versionSetting"
          >
            <MenuItem value="ver1">Ver 1.</MenuItem>
            <MenuItem value="ver2">Ver 2.</MenuItem>
            <MenuItem value="ver3">Ver 3.</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: 3,
        }}
      >
        <Typography sx={{ color: "#fafafa", textAlign: "left" }}>
          Export File
        </Typography>
        <FormControl margin="normal" sx={{ width: "100%" }}>
          <Select
            size="small"
            value={exportFile}
            onChange={handleExportFileChange}
            sx={selectStyle}
            name="exportFile"
          >
            <MenuItem value="none">NONE</MenuItem>
            <MenuItem value="jpg">JPG</MenuItem>
            <MenuItem value="png">PNG</MenuItem>
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="json">JSON</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: 3,
        }}
      >
        <Typography sx={{ color: "#fafafa", textAlign: "left" }}>
          Privacy Setting
        </Typography>
        <FormControl margin="normal" sx={{ width: "100%" }}>
          <Select
            size="small"
            value={privacySetting}
            onChange={handlePrivacySettingChange}
            sx={selectStyle}
            name="privacySetting"
          >
            <MenuItem value="private">Private</MenuItem>
            <MenuItem value="public">Public</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button
        sx={{
          backgroundColor: "#fafafa",
          color: "black",
          height: "40px",
          width: "100px",
        }}
        onClick={handleSave}
      >
        Save
      </Button>
    </Box>
  );
}
export default SaveTab;
