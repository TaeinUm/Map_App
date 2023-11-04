import React, { useState, useEffect } from "react";
import { Box, Input, IconButton } from "@mui/material";
import { FiSearch } from "react-icons/fi";

function SearchBar() {
  return (
    <Box sx={{ display: "flex" }}>
      <Input fullWidth placeholder="Search maps" />
      <IconButton sx={{ p: "10px" }} aria-label="search">
        <FiSearch />
      </IconButton>
    </Box>
  );
}

export default SearchBar;
