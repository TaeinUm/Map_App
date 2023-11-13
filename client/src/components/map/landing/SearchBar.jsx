import React from "react";
import { Box, Input, IconButton } from "@mui/material";
import { FiSearch } from "react-icons/fi";

function SearchBar({ onSearchChange }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Input
        placeholder="Search maps"
        onChange={onSearchChange}
        sx={{ width: "100%" }}
      />
      <IconButton sx={{ p: "10px" }} aria-label="search">
        <FiSearch />
      </IconButton>
    </Box>
  );
}

export default SearchBar;
