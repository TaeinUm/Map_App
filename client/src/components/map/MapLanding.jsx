import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
  Modal,
} from "@mui/material";

/****       Modal     ****/
import MapGraphics from "./modal/MapGraphics";
import LoadFile from "./modal/LoadFile";

/****       Components     ****/
import MapList from "./landing/MapList";
import LikedTemplates from "./landing/LikedTemplate";
import MapMobile from "./landing/MapMobile";
import SearchBar from "./landing/SearchBar";

function MapLanding() {
  /****       useState, handler for modals     ****/
  const [openGraphic, setOpenGraphic] = useState(false);
  const handleGraphicOpen = () => setOpenGraphic(true);
  const handleGraphicClose = () => setOpenGraphic(false);

  const [openFile, setOpenFile] = useState(false);
  const handleFileOpen = () => setOpenFile(true);
  const handleFileClose = () => setOpenFile(false);

  const [searchTerm, setSearchTerm] = useState("");

  /****       useTheme, useMediaQuery     ****/
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /****       return     ****/
  return (
    <div>
      {isDesktop && (
        <Container maxWidth="xl" sx={{ height: "90vh" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
            {/****       My Graphics Title     ****/}
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: "#FAFAFA", fontWeight: "bold" }}
            >
              My Graphics
            </Typography>
            <Box>
              {/****       Buttons for Modals    ****/}
              <Button
                onClick={handleGraphicOpen}
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
              <Modal open={openGraphic} onClose={handleGraphicClose}>
                <MapGraphics open={openGraphic} />
              </Modal>
              <Button
                onClick={handleFileOpen}
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
              <Modal open={openFile} onClose={handleFileClose}>
                <LoadFile open={openFile} />
              </Modal>
            </Box>
          </Box>

          {/****       My graphics components     ****/}
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: 2 }}>
                {/* Search Bar */}
                <SearchBar onSearchChange={handleSearchChange} />
                {/* Maps List */}
                <MapList searchQuery={searchTerm} />
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
                <LikedTemplates />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}

      {/****        mobile view     ****/}
      {!isDesktop && <MapMobile />}
    </div>
  );
}

export default MapLanding;
