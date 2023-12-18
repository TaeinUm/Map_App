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
import AddIcon from "@mui/icons-material/Add"; // Import Add icon
import FolderOpenIcon from "@mui/icons-material/FolderOpen"; // Import FolderOpen icon

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
        <Container sx={{ height: "95vh" }}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 4, mb: 2 }}
          >
            <Button
              onClick={handleGraphicOpen}
              variant="contained"
              startIcon={<AddIcon />} // Replace with your desired icon
              sx={{
                mx: 1,
                backgroundColor: "#FAFAFA",
                color: "black",
                width: "155px",
                height: "40px",
                marginRight: "20px",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "#1976D2",
                  boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
                },
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
              startIcon={<FolderOpenIcon />} // Replace with your desired icon
              sx={{
                backgroundColor: "#FAFAFA",
                color: "black",
                width: "140px",
                height: "40px",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "#1976D2",
                  boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
                },
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
