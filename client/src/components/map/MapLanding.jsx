import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Container,
  Grid,
  Paper,
  Link,
  Input,
} from "@mui/material";
import { FiSearch, FiShare, FiMoreVertical } from "react-icons/fi";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiTwotoneHeart,
} from "react-icons/ai";

const MapLanding = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#FAFAFA", fontWeight: "bold" }}
        >
          My Graphics
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              mx: 1,
              backgroundColor: "#FAFAFA",
              color: "black",
              width: "170px",
              height: "40px",
              marginRight: "20px",
            }}
          >
            Create New
          </Button>
          <Button
            variant="contained"
            sx={{
              mx: 1,
              backgroundColor: "#FAFAFA",
              color: "black",
              width: "170px",
              height: "40px",
            }}
          >
            Load File
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}>
            {/* Search Bar */}
            <Box sx={{ display: "flex" }}>
              <Input fullWidth placeholder="Search maps" />
              <IconButton sx={{ p: "10px" }} aria-label="search">
                <FiSearch />
              </IconButton>
            </Box>
            {/* Maps List */}
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
            {/* Navigation Arrows */}
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <IconButton>
                <AiOutlineArrowLeft />
              </IconButton>
              <IconButton>
                <AiOutlineArrowRight />
              </IconButton>
            </Box>
          </Paper>
        </Grid>

        {/* Liked Templates */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, height: "100%", background: "none" }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "#FAFAFA",
                fontWeight: "bold",
                textAlign: "left",
                alignItems: "center",
              }}
            >
              Liked Templates
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {[...Array(4)].map((_, index) => (
                <Box
                  key={index}
                  sx={{ mb: 2, position: "relative", width: "48%" }}
                >
                  <Link href="/" underline="none">
                    <Box
                      component="img"
                      src="mapImageUrl"
                      sx={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        bgcolor: "grey",
                      }}
                    />
                  </Link>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "red",
                    }}
                    aria-label="like"
                  >
                    <AiTwotoneHeart />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MapLanding;
