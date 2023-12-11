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

function SaveTab({ map }) {
  const { isAuthenticated } = useContext(AuthContext);
  const { mapId } = useContext(MapContext);
  const [exportFile, setExportFile] = useState("");

  const handleExportFileChange = (event) => {
    setExportFile(event.target.value);
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
      return;
    }
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
              <MenuItem value="png">PNG</MenuItem>
              <MenuItem value="jpeg">JPEG</MenuItem>
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
        Export
      </Button>
    </Box>
  );
}
export default SaveTab;
