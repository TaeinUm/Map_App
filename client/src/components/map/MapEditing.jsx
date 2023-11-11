import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Grid,
  Tab,
  Tabs,
  Paper,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import Map from "react-map-gl";
import { TabPanel, TabContext } from "@mui/lab";

import StylesTab from "./tab/StylesTab";
import JsonTab from "./tab/JSONTab";
import ShareTab from "./tab/ShareTab";
import SaveTab from "./tab/SaveTab";

import MapMobile from "./landing/MapMobile";
import Memo from "./Memo";

import { MapContext } from "../../contexts/MapContext";

function MapEditing() {
  const { mapType, geojsonData, setGeojsonData } = useContext(MapContext);
  const [tabValue, setTabValue] = useState("styles");
  const [memoOpen, setMemoOpen] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (geojsonData) {
      // update MapContainer with new geojsonData
    }
    // adjust map styling based on mapType here
  }, [geojsonData, mapType]);

  return (
    <div>
      {isDesktop && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {/* MapBox View */}
            <Grid item xs={12} md={8}>
              <Map mapType={mapType} geojsonData={geojsonData} />
            </Grid>

            {/* Styling Side Bar */}
            <Grid item fullWidth xs={12} md={4}>
              <TabContext value={tabValue}>
                <Paper square>
                  <Tabs
                    variant="fullWidth"
                    value={tabValue}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="disabled tabs example"
                  >
                    <Tab
                      label="Styles"
                      value="styles"
                      sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
                    />
                    <Tab
                      label="JSON"
                      value="json"
                      sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
                    />
                    <Tab
                      label="Share"
                      value="share"
                      sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
                    />
                    <Tab
                      label="Save"
                      value="save"
                      sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
                    />
                  </Tabs>
                </Paper>
                <TabPanel fullWidth value="styles">
                  <StylesTab />
                </TabPanel>
                <TabPanel value="json">
                  <JsonTab />
                </TabPanel>
                <TabPanel value="share">
                  <ShareTab />
                </TabPanel>
                <TabPanel value="save">
                  <SaveTab />
                </TabPanel>
              </TabContext>
              <IconButton
                onClick={() => setMemoOpen(!memoOpen)}
                sx={{
                  fontSize: "15px",
                  textStyle: "bold",
                  width: "100%",
                  height: "20px",
                  backgroundColor: "grey",
                  borderRadius: "0",
                }}
              >
                {(memoOpen && "↓") || "↑"}
              </IconButton>
              {memoOpen && <Memo />}
            </Grid>
          </Grid>
        </Box>
      )}

      {!isDesktop && <MapMobile />}
    </div>
  );
}

export default MapEditing;
