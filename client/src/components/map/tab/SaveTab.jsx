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

function SaveTab() {
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

  return (
    <Box fullWidth sx={{ padding: 3 }}>
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
        <FormControl fullWidth margin="normal">
          <Select
            size="small"
            value={versionSetting}
            onChange={handleVersionSettingChange}
            sx={selectStyle}
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
        <FormControl fullWidth margin="normal">
          <Select
            size="small"
            value={exportFile}
            onChange={handleExportFileChange}
            sx={selectStyle}
          >
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
        <FormControl fullWidth margin="normal">
          <Select
            size="small"
            value={privacySetting}
            onChange={handlePrivacySettingChange}
            sx={selectStyle}
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
      >
        Save
      </Button>
    </Box>
  );
}
export default SaveTab;
