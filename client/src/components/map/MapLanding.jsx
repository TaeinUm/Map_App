import React, { useState, useContext } from "react";
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

  /****       Search term handler     ****/
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /****       return     ****/
  return (
    <div>
      {isDesktop && (
        <Container maxWidth="xl" sx={{ height: "90vh" }}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mb: 4 }}
          >
            <Box>
              {/****       Buttons for Modals    ****/}
              <Button
                onClick={handleGraphicOpen}
                variant="contained"
                sx={{
                  mx: 1,
                  backgroundColor: "#FAFAFA",
                  color: "black",
                  width: "140px",
                  height: "40px",
                  marginRight: "20px",
                }}
                role="presentation"
              >
                Create New
              </Button>
              <Modal open={openGraphic} onClose={handleGraphicClose}>
                <Box>
                  <MapGraphics open={openGraphic} />
                </Box>
              </Modal>
              <Button
                onClick={handleFileOpen}
                variant="contained"
                sx={{
                  mx: 1,
                  backgroundColor: "#FAFAFA",
                  color: "black",
                  width: "140px",
                  height: "40px",
                }}
                role="presentation"
              >
                Load File
              </Button>
              <Modal open={openFile} onClose={handleFileClose}>
                <Box>
                  <LoadFile open={openFile} />
                </Box>
              </Modal>
            </Box>
          </Box>

          {/****       My graphics components     ****/}
          <Grid item xs={12} md={7}>
            {/****       My Graphics Title     ****/}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "#FAFAFA",
                fontWeight: "bold",
                textAlign: "left",
                mb: 2,
              }}
            >
              My Graphics
            </Typography>
            <Paper sx={{ p: 2 }}>
              {/* Search Bar */}
              <SearchBar onSearchChange={handleSearchChange} />
              {/* Maps List */}
              <MapList searchQuery={searchTerm} />
            </Paper>
          </Grid>
        </Container>
      )}

      {/****        mobile view     ****/}
      {!isDesktop && <MapMobile data="mobile-view" />}
    </div>
  );
}

export default MapLanding;
