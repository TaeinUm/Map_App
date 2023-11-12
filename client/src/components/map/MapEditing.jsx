import React, { useContext, useState, useEffect, useRef } from "react";
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
import Map, {
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
  ScaleControl,
  Source,
  Layer,
} from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { TabPanel, TabContext } from "@mui/lab";

import StylesTab from "./tab/StylesTab";
import JsonTab from "./tab/JSONTab";
import ShareTab from "./tab/ShareTab";
import SaveTab from "./tab/SaveTab";

import MapMobile from "./landing/MapMobile";
import Memo from "./Memo";

import { MapContext } from "../../contexts/MapContext";

const accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ";

function MapEditing() {
  const { mapType, geojsonData, setGeojsonData } = useContext(MapContext);
  const [tabValue, setTabValue] = useState("styles");
  const [memoOpen, setMemoOpen] = useState(true);
  const [mapStyle, setMapStyle] = useState(null);

  const [viewport, setViewport] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 10,
  });

  const satelliteStyle = "mapbox://styles/mapbox/satellite-v9";
  const defaultStyle = mapType || "mapbox://styles/mapbox/streets-v11";

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const mapRef = useRef();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const params = {
    country: "ca",
  };

  useEffect(() => {
    if (geojsonData) {
      // update MapContainer with new geojsonData
    }
    // adjust map styling based on mapType here
  }, [geojsonData, mapType]);

  const handleGeocoderViewportChange = (newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return setViewport({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  };

  const handleOnResult = (event) => {
    setViewport({
      longitude: event.result.center[0],
      latitude: event.result.center[1],
      zoom: 10,
      transitionDuration: 1000,
    });
  };

  return (
    <div>
      {isDesktop && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {/* MapBox View */}
            <Grid item sx={{ height: "800px" }} xs={12} md={8}>
              <Map
                initialViewState={{
                  latitude: 37.805,
                  longitude: -122.447,
                  zoom: 15.5,
                }}
                mapStyle={mapStyle && mapStyle.toJS()}
                styleDiffing
                mapboxAccessToken={accessToken}
              >
                <NavigationControl onViewportChange={setViewport} />
                <FullscreenControl />
                <GeolocateControl />
                <ScaleControl />

                {geojsonData && (
                  <Source type="geojson" data={geojsonData}>
                    <Layer />
                  </Source>
                )}

                {/* Toggle button for satellite view */}
                <button
                  onClick={() =>
                    setViewport({ ...viewport, mapStyle: satelliteStyle })
                  }
                >
                  Satellite View
                </button>
              </Map>
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
                  <StylesTab
                    onChange={setMapStyle}
                    setGeojsonData={setGeojsonData}
                  />
                </TabPanel>
                <TabPanel value="json">
                  <JsonTab
                    geojsonData={geojsonData}
                    setGeojsonData={setGeojsonData}
                  />
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
