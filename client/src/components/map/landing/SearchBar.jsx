import React, { useState, useEffect } from "react";
import { Box, Input, IconButton } from "@mui/material";
import { FiSearch } from "react-icons/fi";

function SearchBar({ onSearchChange }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Input fullWidth placeholder="Search maps" onChange={onSearchChange} />
      <IconButton sx={{ p: "10px" }} aria-label="search">
        <FiSearch />
      </IconButton>
    </Box>
  );
}

export default SearchBar;
