import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, Tab, Tabs, Paper } from "@mui/material";
import Map, { MapContainer } from "react-map-gl";
import { TabPanel, TabContext } from "@mui/lab";

import StylesTab from "./tab/StylesTab";
import JsonTab from "./tab/JSONTab";
import ShareTab from "./tab/ShareTab";
import SaveTab from "./tab/SaveTab";

import { MapContext } from "../../contexts/MapContext";

function MapEditing() {
  const { mapType, geojsonData, setGeojsonData } = useContext(MapContext);
  const [tabValue, setTabValue] = useState("styles");

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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* MapBox View */}
        <Grid item xs={12} md={8}>
          <Map
            mapType={mapType} // Pass the selected map type to your MapContainer
            geojsonData={geojsonData} // Pass the GeoJSON data to your MapContainer
          />
        </Grid>

        {/* Styling Side Bar */}
        <Grid item xs={12} md={4}>
          <TabContext value={tabValue}>
            <Paper square>
              <Tabs
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
              >
                <Tab label="Styles" value="styles" />
                <Tab label="JSON" value="json" />
                <Tab label="Share" value="share" />
                <Tab label="Save" value="save" />
              </Tabs>
            </Paper>
            <TabPanel value="styles">
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
        </Grid>
      </Grid>
    </Box>
  );
}

export default MapEditing;
