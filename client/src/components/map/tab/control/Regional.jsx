import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {
  Box,
  Button,
  Typography,
  FormControl,
  Divider,
  RadioGroup,
  Slider,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { useMediaQuery, useTheme } from "@mui/material";

import { MapContext } from "../../../../contexts/MapContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";

import SaveTab from "../SaveTab";
import CountryAutocomplete from "../../editmap/CountryAutocomplete";
import TabMenu from "../../editmap/TabMenu";
import ContinentColorUpdater from "../../editmap/ContinentColorUpdater";
import continents from "./regionalcontrol/continentsData";

import extractRegionalData from "./regionalcontrol/extract";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

const Regional = () => {
  const { mapId, setMapId } = useContext(MapContext);
  const { userId } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v11"
  );
  const [tabValue, setTabValue] = useState("1");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [styleSettings, setStyleSettings] = useState({
    color: "#FFFFFF",
    opacity: 0.5,
    log: [],
  });

  const [selectionType, setSelectionType] = useState("country");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (!map) {
      setIsLoading(true);
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.006, 40.7128],
        zoom: 2,
        preserveDrawingBuffer: true,
      });
      newMap.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        })
      );
      newMap.addControl(new mapboxgl.FullscreenControl());
      newMap.addControl(new mapboxgl.NavigationControl());

      newMap.on("load", async () => {
        newMap.addSource("countries", {
          type: "vector",
          url: "mapbox://mapbox.country-boundaries-v1",
        });

        newMap.addLayer({
          id: "countries",
          type: "fill",
          source: "countries",
          "source-layer": "country_boundaries",
          paint: {
            "fill-color": "#FFFFFF",
            "fill-opacity": 0.5,
          },
        });

        if (mapId) {
          try {
            // Fetch map graphics data using mapId
            const data = await mapServiceAPI.getMapGraphicData(userId, mapId);
            const mapLayer = JSON.parse(data.mapData);
            setStyleSettings(mapLayer);
            //drawExistingFlows(mapLayer.flows, newMap); color regions functions here?
          } catch (error) {
            console.error("Error loading map graphics:", error);
          } finally {
            setMap(newMap);
            setIsLoading(false);
          }
        } else {
          setMap(newMap);
          setIsLoading(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (map && styleSettings.log.length > 0) {
      const colorExpression = ["match", ["get", "iso_3166_1_alpha_3"]];
      const uniqueRegions = new Set();

      styleSettings.log.forEach((entry) => {
        if (!uniqueRegions.has(entry.region)) {
          colorExpression.push(entry.region, entry.color);
          uniqueRegions.add(entry.region);
        }
      });
      colorExpression.push("#FFFFFF");

      map.setPaintProperty("countries", "fill-color", colorExpression);
    }
  }, [map, styleSettings.log, continents]);

  useEffect(() => {
    if (map) {
      const countryLayer = map.getLayer("countries");
      if (countryLayer) {
        map.setPaintProperty(
          "countries",
          "fill-opacity",
          styleSettings.opacity
        );
      }
    }
  }, [map, styleSettings.opacity]);

  const handleSelectionTypeChange = (event) => {
    setSelectionType(event.target.value);
  };

  const handleColorChange = (event) => {
    setStyleSettings((prevSettings) => ({
      ...prevSettings,
      color: event.target.value,
    }));
  };

  const handleOpacityChange = (newValue) => {
    setStyleSettings((prevSettings) => ({
      ...prevSettings,
      opacity: newValue,
    }));
  };

  const handleCountrySelect = (region) => {
    setSelectedCountry(region);
  };

  const updateRegionColor = (region) => {
    let regionsToUpdate = [];

    // if a user selects continent!
    if (selectionType === "continent") {
      regionsToUpdate = continents[region];
    } else {
      regionsToUpdate = [selectedCountry];
    }

    const updatedLog = [...styleSettings.log];

    regionsToUpdate.forEach((regionCode) => {
      // update logs
      const existingIndex = updatedLog.findIndex(
        (entry) => entry.region === regionCode
      );
      if (existingIndex !== -1) {
        updatedLog[existingIndex] = {
          region: regionCode,
          color: styleSettings.color,
        };
      } else {
        updatedLog.push({ region: regionCode, color: styleSettings.color });
      }
    });

    setStyleSettings((prevSettings) => ({
      ...prevSettings,
      log: updatedLog,
    }));
    updateMapColors();
  };

  const updateMapColors = () => {
    if (map) {
      const countryLayer = map.getLayer("countries");
      if (countryLayer) {
        const colorExpression = ["match", ["get", "iso_3166_1_alpha_3"]];

        if (styleSettings.log.length === 0) {
          colorExpression.push("XXX", "#FFFFFF");
        } else {
          styleSettings.log.forEach(({ region, color }) => {
            colorExpression.push(region, color);
          });
        }

        colorExpression.push("#FFFFFF");
        map.setPaintProperty("countries", "fill-color", colorExpression);
      }
    }
  };

  const handleSave = async (title, version, privacy) => {
    try {
      await mapServiceAPI.addMapGraphics(
        userId,
        mapId, // This could be null if creating a new map
        title,
        version,
        privacy,
        "Regional Map",
        JSON.stringify(styleSettings)
      );
      setMapId(null);
      navigate("/");
      alert("Map saved successfully");
    } catch (error) {
      console.error("Error saving map:", error);
      alert("Error saving map");
    }
  };

  const makeGeoJSON = () => {
    const extractedData = extractRegionalData(styleSettings);
    return extractedData;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
      }}
    >
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: isMobile ? "50%" : "100%" }}
      />
      {isLoading && (
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <CircularProgress />
        </div>
      )}
      ;
      <Box
        sx={{
          width: isMobile ? "100%" : "40%",
          overflow: "scroll",
          height: isMobile ? "50%" : "auto",
        }}
      >
        <TabContext value={tabValue}>
          <TabMenu tabValue={tabValue} handleTabChange={handleTabChange} />

          <TabPanel value="1">
            <RadioGroup
              row
              value={selectionType}
              onChange={handleSelectionTypeChange}
              sx={{
                display: "felx",
                justifyContent: "space-evenly",
                color: "#fafafa",
                marginBottom: "30px",
              }}
            >
              <FormControlLabel
                value="country"
                control={<Radio />}
                label="Country"
              />
              <FormControlLabel
                value="continent"
                control={<Radio />}
                label="Continent"
              />
            </RadioGroup>

            {selectionType === "country" ? (
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Box
                  width="100%"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    sx={{ width: "100%", color: "#fafafa", textAlign: "left" }}
                  >
                    Select Region Color
                  </Typography>
                  <input
                    type="color"
                    value={styleSettings.color}
                    onChange={handleColorChange}
                    style={{ marginBottom: "30px" }}
                  />
                </Box>
                <Box sx={{ width: "100%", mt: 2 }}>
                  <Typography sx={{ color: "#fafafa", textAlign: "left" }}>
                    Adjust Opacity
                  </Typography>
                  <Slider
                    value={styleSettings.opacity}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={(e, newValue) => handleOpacityChange(newValue)}
                    aria-labelledby="opacity-slider"
                    sx={{ marginBottom: "30px" }}
                  />
                </Box>

                <Box
                  width="100%"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    sx={{ width: "100%", color: "#fafafa", textAlign: "left" }}
                  >
                    Select Country
                  </Typography>
                  {/* <Select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  > */}
                  <CountryAutocomplete onCountrySelect={handleCountrySelect} />
                </Box>
                <Button
                  variant="contained"
                  onClick={updateRegionColor}
                  sx={{ backgroundColor: "#fafafa", color: "black" }}
                >
                  Update Color
                </Button>
              </FormControl>
            ) : (
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <Box
                  width="100%"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    sx={{ width: "100%", color: "#fafafa", textAlign: "left" }}
                  >
                    Select Region Color
                  </Typography>
                  <input
                    type="color"
                    value={styleSettings.color}
                    onChange={handleColorChange}
                    style={{ marginBottom: "30px" }}
                  />
                </Box>
                <Box sx={{ width: "100%", mt: 2 }}>
                  <Typography sx={{ color: "#fafafa", textAlign: "left" }}>
                    Adjust Opacity
                  </Typography>
                  <Slider
                    value={styleSettings.opacity}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={(e, newValue) => handleOpacityChange(newValue)}
                    aria-labelledby="opacity-slider"
                    sx={{ marginBottom: "30px" }}
                  />
                </Box>

                <ContinentColorUpdater
                  handleContinentSelect={updateRegionColor}
                  color={styleSettings.color}
                />
              </FormControl>
            )}
            <Box>
              <Typography sx={{ color: "#fafafa", margin: "20px" }}>
                Colored Region List
              </Typography>
              <Divider></Divider>
              {styleSettings.log.map((entry, index) =>
                entry.country ? (
                  <Typography
                    key={index}
                    sx={{ color: "#fafafa" }}
                  >{`${entry.region}: ${entry.color}`}</Typography>
                ) : (
                  <Typography
                    key={index}
                    sx={{ color: "#fafafa" }}
                  >{`${entry.region}: ${entry.color}`}</Typography>
                )
              )}
            </Box>
          </TabPanel>
          {/* <TabPanel value="2">
            <ShareTab />
          </TabPanel>*/}
          <TabPanel value="3">
            <SaveTab
              onSave={handleSave}
              mapLayer={styleSettings}
              map={map}
              geojson={() => {
                makeGeoJSON();
              }}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Regional;
