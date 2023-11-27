import React, { useState, useContext } from "react";
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

import { AuthContext } from "../../../contexts/AuthContext";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

const selectStyle = {
  width: "200px",
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

function SaveTab({ onSave, mapLayer, map }) {
  const { isAuthenticated } = useContext(AuthContext);
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

  const triggerDownload = (url, filename) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  const exportMapAsJson = () => {
    if (!isAuthenticated) {
      alert("please log in");
      return;
    }
    try {
      const mapJson = map.getStyle();
      //return JSON.stringify(mapJson, null, 2); // Converts JSON object to string
      const blob = new Blob([JSON.stringify(mapJson, null, 2)], {
        type: "application/json",
      });
      const url = window.URL.createObjectURL(blob);
      triggerDownload(url, "map.json");
    } catch (error) {
      console.error("Error exporting map as JSON:", error);
      throw error;
    }
  };

  const exportMapAsImage = async (format) => {
    if (!isAuthenticated) {
      alert("please log in");
      return;
    }
    // Replace these with the actual values from your map
    const longitude = map.getCenter().lng;
    const latitude = map.getCenter().lat;
    const zoom = map.getZoom();

    // Construct the URL for the Static Images API
    const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},${zoom}/1024x768?access_token=${mapboxgl.accessToken}&format=${format}`;

    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const blob = new Blob([response.data], { type: `image/${format}` });
      const downloadUrl = window.URL.createObjectURL(blob);
      triggerDownload(downloadUrl, `map.${format}`);
    } catch (error) {
      console.error("Error exporting map as image:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      alert("please log in");
      return;
    }

    if (exportFile === "jpg" || exportFile === "png" || exportFile === "pdf") {
      await exportMapAsImage(exportFile);
    } else if (exportFile === "json") {
      exportMapAsJson();
    }
    console.log("mapLayer to DB: ", mapLayer);
    console.log("mapLayer type: ", typeof JSON.stringify(mapLayer));
    console.log("title type: ", typeof title);
    console.log("version type: ", typeof versionSetting);
    console.log("privacy type: ", typeof privacySetting);

    onSave(title, versionSetting, privacySetting);
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
        <Box>
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
        <Box>
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
        <Box>
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
