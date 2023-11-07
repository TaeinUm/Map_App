import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FiShare, FiMoreVertical } from "react-icons/fi";

function MapList () {
  return (
    <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
      <Box sx={{ width: 60, height: 60, bgcolor: "grey", mr: 2 }} />
      <Typography variant="h5" sx={{ flexGrow: 1 }}>
        Ver 3. World map
      </Typography>
      <Typography variant="body2" sx={{ mx: 2 }}>
        2023.05.06
      </Typography>
      <IconButton size="small">
        <FiShare />
      </IconButton>
      <IconButton size="small">
        <FiMoreVertical />
      </IconButton>
    </Box>
  );
};

export default MapList;
