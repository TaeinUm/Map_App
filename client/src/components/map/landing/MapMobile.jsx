import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function MapMobile() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: "40px" }}
      >
        Head to your nearest desktop computer
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2, marginBottom: "30px" }}>
        Sorry, TerraCanvas's style interface isn't quite ready for mobile
        devices like yours.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Home
      </Button>
    </Box>
  );
}

export default MapMobile;
