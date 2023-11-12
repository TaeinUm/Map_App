import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import {
  Tab,
  Tabs,
  Box,
  TextField,
  Button,
  Divider,
  Typography,
  MenuItem,
} from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Memo from "../../Memo";
import JSONTab from "../JSONTab";
import ShareTab from "../ShareTab";
import SaveTab from "../SaveTab";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ";

const MapComponent = () => {
  const [map, setMap] = useState(null);
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

  const [startCountry, setStartCountry] = useState("");
  const [startCity, setStartCity] = useState("");
  const [endCountry, setEndCountry] = useState("");
  const [endCity, setEndCity] = useState("");

  const [tabValue, setTabValue] = useState("1");
  const [mapJson, setMapJson] = useState({});
  const [isMemoVisible, setIsMemoVisible] = useState(false);
  const [memoContent, setMemoContent] = useState("");

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
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.006, 40.7128],
        zoom: 2,
      });

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
      });
    }
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

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "100%" }}
      />
      <Box sx={{ width: "30%" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              variant="fullWidth"
              value={tabValue}
              onChange={handleTabChange}
              aria-label="map tabs"
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab
                label="Styles"
                value="1"
                sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
              />
              <Tab
                label="JSON"
                value="2"
                sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
              />
              <Tab
                label="Share"
                value="3"
                sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
              />
              <Tab
                label="Save"
                value="4"
                sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
              />
            </Tabs>
          </Box>
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
                  fullWidth
                  sx={{ color: "#fafafa", textAlign: "left" }}
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
          <TabPanel value="2">
            <JSONTab
              mapJson={mapJson}
              handleJsonChange={handleJsonChange}
              saveJson={saveJson}
            />
          </TabPanel>
          <TabPanel value="3">
            <ShareTab />
          </TabPanel>
          <TabPanel value="4">
            <SaveTab />
          </TabPanel>
          <Button
            sx={{ width: "100%", height: "20px", backgroundColor: "grey" }}
            onClick={toggleMemo}
          >
            {isMemoVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>
          {isMemoVisible && <Memo />}
        </TabContext>
      </Box>
    </Box>
  );
};

export default MapComponent;
