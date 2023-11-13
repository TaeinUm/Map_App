import React from "react";
import { Box, Input, IconButton } from "@mui/material";
import { FiSearch } from "react-icons/fi";

function CommunitySearchBar({ onSearchChange }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Input fullWidth placeholder="Search..." onChange={onSearchChange} />
      <IconButton sx={{ p: "10px" }} aria-label="search">
        <FiSearch />
      </IconButton>
    </Box>
  );
}

export default CommunitySearchBar;