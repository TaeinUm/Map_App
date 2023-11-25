import React, { useState, useEffect, useRef, useContext } from "react";
import * as mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { AuthContext } from "../../../../contexts/AuthContext";
import { MapContext } from "../../../../contexts/MapContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";

import SaveTab from "../SaveTab";
import TabMenu from "../../editmap/TabMenu";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

const Flow = () => {
  const [map, setMap] = useState(null);
  const { mapId } = useContext(MapContext);
  const { userId, username } = useContext(AuthContext);
  const [initialLayers, setInitializeLayers] = useState(null);
  const [mapLayer, setMapLayer] = useState(null);

  const countryCityData = {
    USA: ["New York", "Los Angeles", "Chicago"],
    KOR: ["Seoul", "Busan", "Incheon"],
    FRA: ["Paris", "Lyon", "Marseille"],
  };

  const countryCityCoordinates = {
    USA: {
      "New York": { lat: 40.6413, lng: -73.7781 },
      "Los Angeles": { lat: 33.9416, lng: -118.4085 },
      Chicago: { lat: 41.9742, lng: -87.9073 },
    },
    KOR: {
      Seoul: { lat: 37.5591, lng: 126.7942 },
      Busan: { lat: 35.1795, lng: 128.9382 },
      Incheon: { lat: 37.4602, lng: 126.4407 },
    },
    FRA: {
      Paris: { lat: 49.0097, lng: 2.5479 },
      Lyon: { lat: 45.7219, lng: 5.081 },
      Marseille: { lat: 43.4369, lng: 5.2153 },
    },
  };

  const [regionColor, setRegionColor] = useState("#FF5733");
  const mapContainer = useRef();
  const [memo, setMemo] = useState("");
  const [flows, setFlows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [startCountry, setStartCountry] = useState("");
  const [startCity, setStartCity] = useState("");
  const [endCountry, setEndCountry] = useState("");
  const [endCity, setEndCity] = useState("");

  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStartCountryChange = (event) => {
    setStartCountry(event.target.value);
    setStartCity("");
  };

  const handleStartCityChange = (event) => {
    setStartCity(event.target.value);
  };

  const handleEndCountryChange = (event) => {
    setEndCountry(event.target.value);
    setEndCity("");
  };

  const handleEndCityChange = (event) => {
    setEndCity(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.006, 40.7128],
        zoom: 2,
      });
      newMap.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        })
      );
      newMap.addControl(new mapboxgl.FullscreenControl());
      newMap.addControl(new mapboxgl.NavigationControl());

      newMap.on("load", () => {
        newMap.addLayer({
          id: "country-boundaries",
          type: "fill",
          source: {
            type: "vector",
            url: "mapbox://mapbox.country-boundaries-v1",
          },
          "source-layer": "country_boundaries",
          paint: {
            "fill-opacity": 0,
          },
        });

        setMap(newMap);
        const initialLayers = newMap.getStyle().layers.map((layer) => layer.id);
        setInitializeLayers(initialLayers);
      });
    }
    if (map) {
      const currentLayers = map.getStyle().layers;
      const addedLayers = currentLayers.filter(
        (layer) => !initialLayers.includes(layer.id)
      );
      const addedLayersJson = JSON.stringify(addedLayers, null, 2);
      setMapLayer(addedLayersJson);
    }

    setIsLoading(false);
  }, [map]);

  const drawFlow = () => {
    if (startCountry && startCity && endCountry && endCity) {
      const startPoint = [
        countryCityCoordinates[startCountry][startCity].lng,
        countryCityCoordinates[startCountry][startCity].lat,
      ];
      const endPoint = [
        countryCityCoordinates[endCountry][endCity].lng,
        countryCityCoordinates[endCountry][endCity].lat,
      ];

      const flowId = `flow-${Date.now()}`;

      if (!map.getLayer(flowId)) {
        map.addLayer({
          id: flowId,
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: [startPoint, endPoint],
                  },
                },
              ],
            },
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": regionColor,
            "line-width": 5,
          },
        });
      }

      const flowLog = `${startCountry}, ${startCity} -> ${endCountry}, ${endCity}`;
      setMemo((prevMemo) => (prevMemo ? `${prevMemo}\n${flowLog}` : flowLog));

      setFlows((prevFlows) => [
        ...prevFlows,
        { id: flowId, log: flowLog, color: regionColor },
      ]);

      setStartCountry("");
      setStartCity("");
      setEndCountry("");
      setEndCity("");
    }
  };

  const flowColorChange = (event) => {
    setRegionColor(event.target.value);
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
        "Flow Map",
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

      <Box sx={{ width: "40%", overflow: "scroll" }}>
        <TabContext value={tabValue}>
          <TabMenu tabValue={tabValue} handleTabChange={handleTabChange} />

          <TabPanel value="1">
            <div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}
              >
                <Typography
                  sx={{ width: "100%", color: "#fafafa", textAlign: "left" }}
                >
                  Select Flow Color
                </Typography>
                <input
                  type="color"
                  value={regionColor}
                  onChange={flowColorChange}
                  style={{ marginBottom: "30px" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}
              >
                <TextField
                  select
                  label="Choose Start Country"
                  value={startCountry}
                  onChange={handleStartCountryChange}
                  helperText="Please select the start country"
                  sx={{
                    width: "150px",
                    "& .MuiInputLabel-root": {
                      color: "#fafafa !important",
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#fafafa !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fafafa !important",
                    },
                    "& select": {
                      borderColor: "#fafafa",
                      color: "#fafafa",
                      "&:focus": {
                        borderColor: "#fafafa",
                      },
                    },
                    "& .MuiSelect-icon": {
                      color: "#fafafa",
                    },
                    "& .MuiInputBase-input": {
                      color: "#fafafa",
                    },
                  }}
                >
                  {Object.keys(countryCityData).map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Choose Start City"
                  value={startCity}
                  onChange={handleStartCityChange}
                  helperText="Please select the start city"
                  disabled={!startCountry}
                  sx={{
                    width: "150px",
                    "& .MuiInputLabel-root": {
                      color: "#fafafa !important",
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#fafafa !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fafafa !important",
                    },
                    "& select": {
                      borderColor: "#fafafa",
                      color: "#fafafa",
                      "&:focus": {
                        borderColor: "#fafafa",
                      },
                    },
                    "& .MuiSelect-icon": {
                      color: "#fafafa",
                    },
                    "& .MuiInputBase-input": {
                      color: "#fafafa",
                    },
                  }}
                >
                  {startCountry
                    ? countryCityData[startCountry].map((city) => (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      ))
                    : []}
                </TextField>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}
              >
                <TextField
                  select
                  label="Choose End Country"
                  value={endCountry}
                  onChange={handleEndCountryChange}
                  helperText="Please select the end country"
                  sx={{
                    width: "150px",
                    "& .MuiInputLabel-root": {
                      color: "#fafafa !important",
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#fafafa !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fafafa !important",
                    },
                    "& select": {
                      borderColor: "#fafafa",
                      color: "#fafafa",
                      "&:focus": {
                        borderColor: "#fafafa",
                      },
                    },
                    "& .MuiSelect-icon": {
                      color: "#fafafa",
                    },
                    "& .MuiInputBase-input": {
                      color: "#fafafa",
                    },
                  }}
                >
                  {Object.keys(countryCityData).map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Choose End City"
                  value={endCity}
                  onChange={handleEndCityChange}
                  helperText="Please select the end city"
                  disabled={!endCountry}
                  sx={{
                    width: "150px",
                    "& .MuiInputLabel-root": {
                      color: "#fafafa !important",
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#fafafa !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fafafa !important",
                    },
                    "& select": {
                      borderColor: "#fafafa",
                      color: "#fafafa",
                      "&:focus": {
                        borderColor: "#fafafa",
                      },
                    },
                    "& .MuiSelect-icon": {
                      color: "#fafafa",
                    },
                    "& .MuiInputBase-input": {
                      color: "#fafafa",
                    },
                  }}
                >
                  {endCountry
                    ? countryCityData[endCountry].map((city) => (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      ))
                    : []}
                </TextField>
              </Box>
            </div>
            <Button
              onClick={drawFlow}
              sx={{
                backgroundColor: "#fafafa",
                color: "black",
              }}
            >
              Draw Flow
            </Button>

            <Typography
              variant="h6"
              sx={{ color: "#fafafa", marginTop: "30px" }}
            >
              Flows:
            </Typography>
            <ul>
              {flows.map((flow) => (
                <li
                  style={{ listStyle: "none", color: "#fafafa" }}
                  key={flow.id}
                >
                  {flow.log} {flow.color}
                </li>
              ))}
            </ul>
          </TabPanel>
          {/*<TabPanel value="2">
            <ShareTab />
              </TabPanel>*/}
          <TabPanel value="3">
            <SaveTab onSave={handleSave} mapLayer={mapLayer} />
          </TabPanel>
          {/*{isMemoVisible && <Memo mapId={""} />}
          <Button
            sx={{
              width: "100%",
              height: "20px",
              borderRadius: "0",
              backgroundColor: "grey",
            }}
            onClick={toggleMemo}
          >
            {isMemoVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button> */}
        </TabContext>
      </Box>
    </Box>
  );
};

export default Flow;
