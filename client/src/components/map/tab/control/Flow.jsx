import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as mapboxgl from "mapbox-gl";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { useMediaQuery, useTheme } from "@mui/material";

import { AuthContext } from "../../../../contexts/AuthContext";
import { MapContext } from "../../../../contexts/MapContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";

import SaveTab from "../SaveTab";
import TabMenu from "../../editmap/TabMenu";

import CurveSlider from "./flowcontrol/CurveSlider";
import OpacitySlider from "./flowcontrol/OpacitySlider";
import LineWidthSlider from "./flowcontrol/LineWidthSlider";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

const textFieldStyles = {
  width: "150px",
  "& .MuiInputLabel-root": { color: "#fafafa !important" },
  "& .MuiFormHelperText-root": { color: "#fafafa !important" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fafafa !important" },
  "& select": {
    borderColor: "#fafafa",
    color: "#fafafa",
    "&:focus": { borderColor: "#fafafa" },
  },
  "& .MuiSelect-icon": { color: "#fafafa" },
  "& .MuiInputBase-input": { color: "#fafafa" },
};

const Flow = () => {
  const [map, setMap] = useState(null);
  const { mapId, setMapId } = useContext(MapContext);
  const { userId } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const mapContainer = useRef();
  const [isLoading, setIsLoading] = useState(true);

  const [regionColor, setRegionColor] = useState("#FF5733");
  const [startCountry, setStartCountry] = useState("");
  const [startCity, setStartCity] = useState("");
  const [endCountry, setEndCountry] = useState("");
  const [endCity, setEndCity] = useState("");
  const [tabValue, setTabValue] = useState("1");

  const [styleSettings, setStyleSettings] = useState({
    lineCurvature: 0.5,
    lineOpacity: 1,
    lineWidth: 5,
    flows: [],
  });

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

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const applyChange = (newState) => {
    setUndoStack([...undoStack, styleSettings]);
    setRedoStack([]);
    setStyleSettings(newState);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setRedoStack([...redoStack, styleSettings]);
      setUndoStack(undoStack.slice(0, -1));
      setStyleSettings(previousState);
      drawExistingFlows(previousState.flows, map);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack([...undoStack, styleSettings]);
      setRedoStack(redoStack.slice(0, -1));
      setStyleSettings(nextState);
      drawExistingFlows(nextState.flows, map);
    }
  };

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
    if (!map) {
      setIsLoading(true);
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.006, 40.7128],
        zoom: 2,
        preserveDrawingBuffer: true,
      });

      newMap.addControl(new mapboxgl.FullscreenControl());
      newMap.addControl(new mapboxgl.NavigationControl());

      newMap.on("load", async () => {
        if (mapId) {
          try {
            // Fetch map graphics data using mapId
            const data = await mapServiceAPI.getMapGraphicData(userId, mapId);
            const mapLayer = JSON.parse(data.mapData);
            setStyleSettings(mapLayer);
            drawExistingFlows(mapLayer.flows, newMap);
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
  }, [map]);

  useEffect(() => {
    if (map) {
      styleSettings.flows.forEach((flow) => {
        if (map.getLayer(flow.id)) {
          map.setPaintProperty(
            flow.id,
            "line-opacity",
            styleSettings.lineOpacity
          );
        }
      });
    }
  }, [styleSettings, map]);

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

      const flowId = `flow-${startCountry}-${startCity}-${endCountry}-${endCity}-${Date.now()}`;

      if (map) {
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
                    coordinates: getCurvedLineCoordinates(
                      startPoint,
                      endPoint,
                      styleSettings.lineCurvature
                    ),
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
            "line-width": styleSettings.lineWidth,
            "line-opacity": styleSettings.lineOpacity,
          },
        });
      }

      const flowLog = `${startCountry}, ${startCity} -> ${endCountry}, ${endCity}`;

      const newFlow = {
        id: flowId,
        log: flowLog,
        start: startPoint,
        end: endPoint,
        color: regionColor,
        curvature: styleSettings.lineCurvature,
        lineWidth: styleSettings.lineWidth,
      };

      applyChange({
        ...styleSettings,
        flows: [...styleSettings.flows, newFlow],
      });

      setStartCountry("");
      setStartCity("");
      setEndCountry("");
      setEndCity("");
    }
  };

  const drawExistingFlows = (flows, mapInstance) => {
    styleSettings.flows.forEach((existingFlow) => {
      if (mapInstance.getLayer(existingFlow.id)) {
        mapInstance.removeLayer(existingFlow.id);
        mapInstance.removeSource(existingFlow.id);
      }
    });

    flows.forEach((flow) => {
      if (!mapInstance.getLayer(flow.id)) {
        // Add the layer for each flow
        mapInstance.addLayer({
          id: flow.id,
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
                    coordinates: getCurvedLineCoordinates(
                      flow.start,
                      flow.end,
                      flow.curvature
                    ),
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
            "line-color": flow.color,
            "line-width": flow.lineWidth,
          },
        });
      }
    });
  };

  const flowColorChange = (event) => {
    setRegionColor(event.target.value);
  };

  const handleSave = async (title, version, privacy) => {
    try {
      let titleToPut = title;
      let versionToPut = version;
      if (mapId) {
        const response = await mapServiceAPI.getMapGraphicData(userId, mapId);
        titleToPut = response.mapName;

        const originalVer = response.vers;
        const versionNumber = parseInt(originalVer.replace("ver", ""), 10);
        versionToPut = "ver" + (versionNumber + 1);
      }

      const mapImage = map.getCanvas().toDataURL();
      await mapServiceAPI.addMapGraphics(
        userId,
        null, // This could be null if creating a new map
        titleToPut,
        versionToPut,
        privacy,
        "Flow Map",
        JSON.stringify(styleSettings),
        mapImage
      );
      setMapId(null);
      navigate("/map");
      alert("Map saved successfully");
    } catch (error) {
      console.error("Error saving map:", error);
      alert("Error saving map");
    }
  };

  const getCurvedLineCoordinates = (start, end, curvature) => {
    const midLng = (start[0] + end[0]) / 2;
    const midLat = (start[1] + end[1]) / 2;

    const controlLat = midLat + curvature;

    const controlPoint = [midLng, controlLat];
    const curveCoordinates = [];
    const steps = 100;

    for (let t = 0; t <= 1; t += 1 / steps) {
      const x =
        (1 - t) * (1 - t) * start[0] +
        2 * (1 - t) * t * controlPoint[0] +
        t * t * end[0];
      const y =
        (1 - t) * (1 - t) * start[1] +
        2 * (1 - t) * t * controlPoint[1] +
        t * t * end[1];
      curveCoordinates.push([x, y]);
    }
    return curveCoordinates;
  };

  const exportToGeoJSON = () => {
    const geojson = {
      type: "FeatureCollection",
      features: styleSettings.flows.map((flow) => ({
        type: "Feature",
        properties: {
          id: flow.id,
          source: "flow",
          paint: {
            "line-color": flow.color,
            "line-width": flow.lineWidth,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
        },
        geometry: {
          type: "LineString",
          coordinates: getCurvedLineCoordinates(
            flow.start,
            flow.end,
            flow.curvature
          ),
        },
      })),
    };
    return geojson;
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
            <div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}
              >
                <Button
                  onClick={undo}
                  disabled={undoStack.length === 0}
                  sx={{ background: "#fafafa" }}
                >
                  Undo
                </Button>
                <Button
                  onClick={redo}
                  disabled={redoStack.length === 0}
                  sx={{ background: "#fafafa" }}
                >
                  Redo
                </Button>
              </Box>
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
                />
              </Box>
              <CurveSlider
                value={styleSettings.lineCurvature}
                onChange={(e, newVal) =>
                  setStyleSettings((prev) => ({
                    ...prev,
                    lineCurvature: newVal,
                  }))
                }
              />
              <LineWidthSlider
                value={styleSettings.lineWidth}
                onChange={(e, newVal) =>
                  setStyleSettings((prev) => ({ ...prev, lineWidth: newVal }))
                }
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}
              >
                <TextField
                  select
                  data-testid="start-country-select"
                  label="Choose Start Country"
                  value={startCountry}
                  onChange={handleStartCountryChange}
                  helperText="Please select the start country"
                  sx={textFieldStyles}
                >
                  {Object.keys(countryCityData).map((country) => (
                    <MenuItem
                      key={country}
                      value={country}
                      data-value="country"
                    >
                      {country}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Choose Start City"
                  data-testid="start-city-select"
                  value={startCity}
                  onChange={handleStartCityChange}
                  helperText="Please select the start city"
                  disabled={!startCountry}
                  sx={textFieldStyles}
                >
                  {startCountry
                    ? countryCityData[startCountry].map((city) => (
                        <MenuItem key={city} value={city} data-value="city">
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
                  data-testid="end-country-select"
                  value={endCountry}
                  onChange={handleEndCountryChange}
                  helperText="Please select the end country"
                  sx={textFieldStyles}
                >
                  {Object.keys(countryCityData).map((country) => (
                    <MenuItem
                      key={country}
                      value={country}
                      data-value="country"
                    >
                      {country}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Choose End City"
                  data-testid="end-city-select"
                  value={endCity}
                  onChange={handleEndCityChange}
                  helperText="Please select the end city"
                  disabled={!endCountry}
                  sx={textFieldStyles}
                >
                  {endCountry
                    ? countryCityData[endCountry].map((city) => (
                        <MenuItem key={city} value={city} data-value="city">
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
              Create Flow
            </Button>

            <Typography
              variant="h6"
              sx={{ color: "#fafafa", marginTop: "30px" }}
            >
              Flows:
            </Typography>
            <ul>
              {styleSettings.flows.map((flow) => (
                <li
                  style={{ listStyle: "none", color: "#fafafa" }}
                  key={flow.id}
                >
                  {flow.log} {flow.color}
                </li>
              ))}
            </ul>

            <OpacitySlider
              value={styleSettings.lineOpacity}
              onChange={(e, newVal) =>
                setStyleSettings((prev) => ({
                  ...prev,
                  lineOpacity: newVal,
                }))
              }
            />
          </TabPanel>

          <TabPanel value="3">
            <SaveTab
              onSave={handleSave}
              mapLayer={styleSettings}
              map={map}
              geojson={exportToGeoJSON()}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Flow;
