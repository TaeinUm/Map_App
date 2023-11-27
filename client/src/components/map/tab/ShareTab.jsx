import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  TextField,
  FormControl,
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

function ShareTab() {
  const [linkAccess, setLinkAccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleLinkAccessChange = (event) => {
    setLinkAccess(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginY: 3,
          }}
        >
          <Typography sx={{ color: "#fafafa" }}>Link</Typography>
          <Button
            sx={{
              fontSize: "12px",
              color: "black",
              width: "100px",
              backgroundColor: "#fafafa",
            }}
          >
            Copy Link
          </Button>
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
            Link Access
          </Typography>
          <FormControl sx={{ width: "100%" }}>
            <Select
              size="small"
              value={linkAccess}
              onChange={handleLinkAccessChange}
              sx={selectStyle}
              name="linkAccess"
            >
              <MenuItem value="anyone">Anyone with the link</MenuItem>
              <MenuItem value="only">Only shared user</MenuItem>
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
            Search by Username
          </Typography>
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            variant="outlined"
            placeholder="Search..."
            sx={selectStyle}
            name="searchByUsername"
          />
        </Box>
        <Button
          sx={{
            backgroundColor: "#fafafa",
            color: "black",
            height: "40px",
            width: "100px",
          }}
        >
          Share
        </Button>
      </Box>
    </>
  );
}

export default ShareTab;
