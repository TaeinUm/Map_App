import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
  Typography,
} from "@mui/material";
import * as mapboxgl from "mapbox-gl";
import axios from "axios";

import { AuthContext } from "../../../contexts/AuthContext";
import { MapContext } from "../../../contexts/MapContext";

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

function SaveTab({ onSave, mapLayer, map, geojson }) {
  const { isAuthenticated } = useContext(AuthContext);
  const { mapId } = useContext(MapContext);
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
      const blob = new Blob([JSON.stringify(geojson, null, 2)], {
        type: "application/json",
      });
      const url = window.URL.createObjectURL(blob);
      triggerDownload(url, "terraCanvas.geo.json");
    } catch (error) {
      console.error("Error exporting map as JSON:", error);
      throw error;
    }
  };

  const exportMapAsImage = (export_type) => {
    if (!map) return;
    const canvas = map.getCanvas();

    // Set the default format to 'png' if not specified
    const format = export_type || "png";
    const mimeType = `image/${format}`;

    // Convert the canvas to a data URL of the specified format
    const imageUrl = canvas.toDataURL(mimeType);
    triggerDownload(imageUrl, `terraMap.${format}`);
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      alert("please log in");
      return;
    }

    if (exportFile === "jpg" || exportFile === "png" || exportFile === "jpeg") {
      exportMapAsImage(exportFile);
    } else if (exportFile === "json") {
      exportMapAsJson();
    }

    if (mapId) {
      onSave(title, "ver", privacySetting);
    } else if (!mapId) {
      onSave(title, "ver1", privacySetting);
    }
  };

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      {!mapId && (
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
      )}
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
              <MenuItem value="png">PNG</MenuItem>
              <MenuItem value="jpeg">JPG</MenuItem>
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

      <Typography sx={{ color: "#fafafa", margin: "30px" }}>
        {" "}
        You might not get the exact same geojson data as some data is protected
        by Copyright.
      </Typography>

      <Typography sx={{ color: "#fafafa", margin: "30px" }}>
        For example, If you fill color of a certain country, but you might get
        selected countries' boundary data.
      </Typography>

      <Typography sx={{ color: "#fafafa", margin: "30px" }}>
        If you want to see the beautiful design of your map, please use
        TerraCanvas.
      </Typography>

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
