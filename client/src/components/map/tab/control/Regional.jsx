import React, { useState, useEffect, useRef, useContext } from "react";
import * as mapboxgl from "mapbox-gl";
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
import { MapContext } from "../../../../contexts/MapContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";

import SaveTab from "../SaveTab";
import CountryAutocomplete from "../../editmap/CountryAutocomplete";
import TabMenu from "../../editmap/TabMenu";
import ContinentColorUpdater from "../../editmap/ContinentColorUpdater";
import continents from "./continentsData";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

const Regional = () => {
  const { mapId } = useContext(MapContext);
  const { userId, username } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLayers, setInitializeLayers] = useState(null);
  const [mapLayer, setMapLayer] = useState(null);

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v11"
  );
  const [tabValue, setTabValue] = useState("1");
  const [mapJson, setMapJson] = useState({});
  const [isMemoVisible, setIsMemoVisible] = useState(false);
  const [memoContent, setMemoContent] = useState("");
  const [regionColor, setRegionColor] = useState("#FF5733");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [opacity, setOpacity] = useState(0.5);
  const [log, setLog] = useState([]);

  const [selectionType, setSelectionType] = useState("country");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleJsonChange = (json) => {
    setMapJson(json.jsObject);
  };

  const saveJson = () => {
    try {
      map.setStyle(mapJson);
      alert("Successfully saved!");
    } catch (error) {
      alert("Invalid JSON!");
    }
  };

  const toggleMemo = () => {
    setIsMemoVisible(!isMemoVisible);
  };

  const handleMemoSave = () => {
    console.log("Memo saved:", memoContent);
    // Memo save logic here...
  };

  useEffect(() => {
    setIsLoading(true);
    const newMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128],
      zoom: 2,
    });
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
          "fill-opacity": 0.4,
        },
      });

      if (mapId) {
        try {
          const data = await mapServiceAPI.getMapGraphicData(
            userId,
            username,
            mapId
          );
          const mapLayer = data.mapLayer;

          if (mapLayer && data.mapType) {
            newMap.addLayer(mapLayer);
          } else {
            console.error("Invalid map layer data");
          }
        } catch (error) {
          console.error("Error loading map graphics: ", error);
        }
      }

      setMap(newMap);
      const initialLayers = newMap.getStyle().layers.map((layer) => layer.id);
      setInitializeLayers(initialLayers);
      setIsLoading(false);
    });

    return () => newMap.remove();
  }, []);

  useEffect(() => {
    if (map && log.length > 0) {
      const colorExpression = ["match", ["get", "iso_3166_1_alpha_3"]];
      const uniqueCountries = new Set();

      log.forEach((entry) => {
        if (entry.country && !uniqueCountries.has(entry.country)) {
          colorExpression.push(entry.country, entry.color);
          uniqueCountries.add(entry.country);
        } else if (entry.continent) {
          continents[entry.continent].forEach((country) => {
            if (!uniqueCountries.has(country)) {
              colorExpression.push(country, entry.color);
              uniqueCountries.add(country);
            }
          });
        }
      });
      colorExpression.push("#FFFFFF");

      map.setPaintProperty("countries", "fill-color", colorExpression);
    }
    if (map) {
      const currentLayers = map.getStyle().layers;
      const addedLayers = currentLayers.filter(
        (layer) => !initialLayers.includes(layer.id)
      );
      const addedLayersJson = JSON.stringify(addedLayers, null, 2);
      setMapLayer(addedLayersJson);
    }
  }, [map, log, continents]);

  useEffect(() => {
    if (map) {
      const countryLayer = map.getLayer("countries");
      if (countryLayer) {
        map.setPaintProperty("countries", "fill-opacity", opacity);
      }
    }
  }, [map, opacity]);

  const handleSelectionTypeChange = (event) => {
    setSelectionType(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  const updateMapColors = () => {
    if (map) {
      const countryLayer = map.getLayer("countries");
      if (countryLayer) {
        const colorExpression = ["match", ["get", "iso_3166_1_alpha_3"]];

        if (log.length === 0) {
          colorExpression.push("XXX", "#FFFFFF");
        } else {
          log.forEach(({ country, color }) => {
            colorExpression.push(country, color);
          });
        }

        colorExpression.push("#FFFFFF");
        map.setPaintProperty("countries", "fill-color", colorExpression);
      }
    }
  };

  const updateCountryColor = () => {
    const updatedLog = log.filter((entry) => entry.country !== selectedCountry);
    updatedLog.push({ country: selectedCountry, color: color });

    setLog(updatedLog);
    updateMapColors();
  };

  const handleContinentSelect = (continent) => {
    const countriesInContinent = continents[continent];
    if (!countriesInContinent || countriesInContinent.length === 0) {
      console.error(`No countries found for continent: ${continent}`);
      return;
    }

    const updatedLog = log.filter((entry) => entry.continent !== continent);

    updatedLog.push({ continent, color });

    setLog(updatedLog);
    updateContColors();
  };

  const updateContColors = () => {
    if (mapContainer) {
      const colorExpression = ["match", ["get", "iso_3166_1_alpha_3"]];

      const uniqueCountries = new Set();

      if (log.length === 0) {
        colorExpression.push("XXX", "#FFFFFF");
      } else {
        log.forEach((entry) => {
          if (entry.country && !uniqueCountries.has(entry.country)) {
            colorExpression.push(entry.country, entry.color);
            uniqueCountries.add(entry.country);
          } else if (entry.continent) {
            continents[entry.continent].forEach((country) => {
              if (!uniqueCountries.has(country)) {
                colorExpression.push(country, entry.color);
                uniqueCountries.add(country);
              }
            });
          }
        });
      }

      colorExpression.push("#FFFFFF");
      map.setPaintProperty("countries", "fill-color", colorExpression);
    }
  };

  const handleSave = async (title, version, privacy, mapLayer) => {
    try {
      await mapServiceAPI.addMapGraphics(
        userId,
        username,
        mapId, // This could be null if creating a new map
        title,
        version,
        privacy,
        "Regional Map",
        mapLayer
      );
      alert("Map saved successfully");
    } catch (error) {
      console.error("Error saving map:", error);
      alert("Error saving map");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "100%" }}
      />
      {isLoading && (
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <CircularProgress />
        </div>
      )}
      ;
      <Box sx={{ width: "40%", overflow: "scroll" }}>
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
                    value={color}
                    onChange={handleColorChange}
                    style={{ marginBottom: "30px" }}
                  />
                </Box>
                <Box sx={{ width: "100%", mt: 2 }}>
                  <Typography sx={{ color: "#fafafa", textAlign: "left" }}>
                    Adjust Opacity
                  </Typography>
                  <Slider
                    value={opacity}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={(e, newValue) => setOpacity(newValue)}
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
                  onClick={updateCountryColor}
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
                    value={color}
                    onChange={handleColorChange}
                    style={{ marginBottom: "30px" }}
                  />
                </Box>
                <Box sx={{ width: "100%", mt: 2 }}>
                  <Typography sx={{ color: "#fafafa", textAlign: "left" }}>
                    Adjust Opacity
                  </Typography>
                  <Slider
                    value={opacity}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={(e, newValue) => setOpacity(newValue)}
                    aria-labelledby="opacity-slider"
                    sx={{ marginBottom: "30px" }}
                  />
                </Box>

                <ContinentColorUpdater
                  handleContinentSelect={handleContinentSelect}
                  color={color}
                />
              </FormControl>
            )}
            <Box>
              <Typography sx={{ color: "#fafafa", margin: "20px" }}>
                Colored Region List
              </Typography>
              <Divider></Divider>
              {log.map((entry, index) =>
                entry.country ? (
                  <Typography
                    key={index}
                    sx={{ color: "#fafafa" }}
                  >{`${entry.country}: ${entry.color}`}</Typography>
                ) : (
                  <Typography
                    key={index}
                    sx={{ color: "#fafafa" }}
                  >{`${entry.continent}: ${entry.color}`}</Typography>
                )
              )}
            </Box>
          </TabPanel>
          {/* <TabPanel value="2">
            <ShareTab />
          </TabPanel>*/}
          <TabPanel value="3">
            <SaveTab onSave={handleSave} mapLayer={mapLayer} map={map} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Regional;
