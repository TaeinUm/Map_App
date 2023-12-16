import React, { useState, useEffect, useRef, useContext } from "react";
import * as mapboxgl from "mapbox-gl";
import {
  Box,
  CircularProgress,
  Slider,
  Typography,
  Button,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";

import { MapContext } from "../../../../contexts/MapContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import ExportTab from "../ExportTab";
import TabMenu from "../../editmap/TabMenu";
import SaveTab from "../SaveTab";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

function File() {
  const { geojsonData, mapId, setGeojsonData, setMapId } =
    useContext(MapContext);
  const { userId } = useContext(AuthContext);
  const mapContainer = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [map, setMap] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isLine, setIsLine] = useState(true);
  const [tabValue, setTabValue] = useState("1");

  const [styleSettings, setStyleSettings] = useState({
    geojsonData: geojsonData,
    lineColor: "#000000",
    lineWidth: 2,
    lineOpacity: 1.0,
  });

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const applyChange = (newState) => {
    setUndoStack([...undoStack, styleSettings]);
    setRedoStack([]);
    setStyleSettings(newState);
    updateMapWithNewSettings(newState);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setRedoStack([...redoStack, styleSettings]);
      setUndoStack(undoStack.slice(0, -1));
      setStyleSettings(previousState);
      updateMapWithNewSettings(previousState);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack([...undoStack, styleSettings]);
      setRedoStack(redoStack.slice(0, -1));
      setStyleSettings(nextState);
      updateMapWithNewSettings(nextState);
    }
  };

  const sourceId = "uploadedGeoSource";
  const layerId = "uploaded-data-layer";

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLineColorChange = (color) => {
    const newColor = color.hex || color;
    const newSettings = { ...styleSettings, lineColor: newColor };
    applyChange(newSettings);
  };

  const handleLineWidthChange = (event, newValue) => {
    const newSettings = { ...styleSettings, lineWidth: newValue };
    applyChange(newSettings);
  };

  const handleLineOpacityChange = (event, newValue) => {
    const newSettings = { ...styleSettings, lineOpacity: newValue };
    applyChange(newSettings);
  };

  // Function to update map based on style settings
  const updateMapWithNewSettings = (newSettings) => {
    if (!map) return;
    if (isLine && map.getLayer(layerId)) {
      map.setPaintProperty(layerId, "line-color", newSettings.lineColor);
      map.setPaintProperty(layerId, "line-width", newSettings.lineWidth);
      map.setPaintProperty(layerId, "line-opacity", newSettings.lineOpacity);
    }
  };

  const updateGeojsonWithLineStyle = (geojsonData, styleSettings) => {
    // Check if geojsonData has features, if not, initialize it
    const features =
      geojsonData && geojsonData.features ? geojsonData.features : [];

    const newFeatures =
      features.length === 0
        ? [
            {
              type: "Feature",
              properties: {
                source: "line-data",
                paint: {
                  "line-color": styleSettings.lineColor,
                  "line-width": styleSettings.lineWidth,
                  "line-opacity": styleSettings.lineOpacity,
                },
              },
            },
          ]
        : features.map((feature) => {
            return {
              ...feature,
              properties: {
                ...feature.properties,
                source: "line-data",
                paint: {
                  "line-color": styleSettings.lineColor,
                  "line-width": styleSettings.lineWidth,
                  "line-opacity": styleSettings.lineOpacity,
                },
              },
            };
          });

    return {
      ...geojsonData,
      features: newFeatures,
    };
  };

  const layerSelector = {
    background: /land|landcover/,
    water: /water-depth|^water$/,
    labels: /label|place|poi/,
    waterway: /^waterway$/,
    boundary: /boundary/,
  };

  useEffect(() => {
    if (mapId) {
      const fetchJsonData = async () => {
        try {
          const userdata = await mapServiceAPI.getMapGraphicData(userId, mapId);

          const response = await fetch(userdata.mapData);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setStyleSettings((prevSettings) => ({
            ...prevSettings,
            geojsonData: data.geojsonData,
            lineColor: data.lineColor,
            lineWidth: data.lineWidth,
            lineOpacity: data.lineOpacity,
          }));
          setGeojsonData(data.geojsonData);
        } catch (error) {
          console.error("Could not fetch JSON data: ", error);
        }
      };

      fetchJsonData();
    }
  }, []);

  useEffect(() => {
    if (!map) {
      setIsMapLoaded(false);
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
        newMap.addSource("countries", {
          type: "vector",
          url: "mapbox://mapbox.country-boundaries-v1",
        });

        if (geojsonData && geojsonData.features) {
          geojsonData.features.forEach((feature, index) => {
            const layerId = `layer-${index}`;
            if (feature.properties.source === "pointmap-data") {
              setIsLine(false);
              newMap.addLayer({
                id: `pointmap-data-layer-${index}`,
                type: "circle",
                source: {
                  type: "geojson",
                  data: geojsonData,
                },
                paint: feature.properties.paint,
              });
            } else if (feature.properties.source === "3d-data") {
              setIsLine(false);
              newMap.addLayer({
                id: `3d-data-layer-${index}`,
                type: "fill-extrusion",
                source: {
                  type: "geojson",
                  data: geojsonData,
                },
                paint: {
                  "fill-extrusion-height": feature.properties.height,
                  "fill-extrusion-base": 0,
                  "fill-extrusion-color": "blue",
                  "fill-extrusion-opacity": 0.6,
                },
              });
            } else if (feature.properties.source === "heatmap-data") {
              setIsLine(false);
              let heatColorArray = Object.entries(feature.properties.heatColors)
                .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
                .flatMap((entry) => [parseFloat(entry[0]), entry[1]]);

              newMap.addLayer({
                id: `heatmap-data-layer-${index}`,
                type: "heatmap",
                source: {
                  type: "geojson",
                  data: geojsonData,
                },
                maxzoom: 20,
                paint: {
                  "heatmap-color": [
                    "interpolate",
                    ["linear"],
                    ["heatmap-density"],
                    ...heatColorArray,
                  ],
                },
              });
            } else if (
              feature.properties.source === "water" ||
              feature.properties.source === "background" ||
              feature.properties.source === "waterway"
            ) {
              setIsLine(false);
              newMap.getStyle().layers.forEach((layer) => {
                const { id, type } = layer;
                if (layerSelector[feature.properties.source].test(id)) {
                  if (type === "line" || type === "fill") {
                    newMap.setPaintProperty(
                      id,
                      type === "line" ? "line-color" : "fill-color",
                      feature.properties.paint[
                        type === "line" ? "line-color" : "fill-color"
                      ]
                    );
                    newMap.setPaintProperty(
                      id,
                      type === "line" ? "line-opacity" : "fill-opacity",
                      feature.properties.paint[
                        type === "line" ? "line-opacity" : "fill-opacity"
                      ]
                    );
                  }

                  if (type === "line") {
                    newMap.setPaintProperty(
                      id,
                      "line-width",
                      feature.properties.paint["line-width"]
                    );
                  }
                }
              });
            } else if (feature.properties.source === "flow") {
              setIsLine(false);
              const flowLayerId = `flow-layer-${index}`;
              newMap.addLayer({
                id: flowLayerId,
                type: "line",
                source: {
                  type: "geojson",
                  data: geojsonData,
                },
                paint: {
                  "line-color": feature.properties.paint["line-color"],
                  "line-width": feature.properties.paint["line-width"],
                },
                layout: {
                  "line-join": feature.properties.layout["line-join"],
                  "line-cap": feature.properties.layout["line-cap"],
                },
              });
            } else if (feature.properties.source === "countries") {
              setIsLine(false);
              const layerId = `country-${feature.id}`;
              const countryId = feature.id;

              newMap.addLayer({
                id: layerId,
                type: "fill",
                source: "countries",
                "source-layer": "country_boundaries",
                filter: ["==", ["get", "iso_3166_1_alpha_3"], countryId],
                paint: feature.properties.paint,
              });
            } else if (feature.properties.source === "line-data") {
              setIsLine(false);
              newMap.addLayer({
                id: `line-${feature.id}`,
                type: "line",
                source: { type: "geojson", data: geojsonData },
                paint: feature.properties.paint,
              });
            } else {
              setIsLine(true);
              newMap.addSource(sourceId, {
                type: "geojson",
                data: geojsonData,
              });

              newMap.addLayer({
                id: layerId,
                type: "line",
                source: sourceId,
                paint: {
                  "line-color": "#000000",
                  "line-width": 2,
                },
              });
            }
          });

          setMap(newMap);
          setIsMapLoaded(true);
        } else if (styleSettings.geojsonData) {
          setIsLine(true);
          newMap.addSource(sourceId, {
            type: "geojson",
            data: geojsonData,
          });

          newMap.addLayer({
            id: layerId,
            type: "line",
            source: sourceId,
            paint: {
              "line-color": "#000000",
              "line-width": 2,
            },
          });
          setIsMapLoaded(true);
          setMap(newMap);
        } else {
          setIsLine(false);
          setMap(newMap);
          setIsMapLoaded(true);
        }
      });
    }
  }, [map, geojsonData, mapId]);

  useEffect(() => {
    const updateMapLayer = () => {
      if (map && map.getLayer(layerId)) {
        if (styleSettings.lineColor) {
          map.setPaintProperty(layerId, "line-color", styleSettings.lineColor);
        }
        if (styleSettings.lineWidth) {
          map.setPaintProperty(layerId, "line-width", styleSettings.lineWidth);
        }
        if (styleSettings.lineOpacity) {
          map.setPaintProperty(
            layerId,
            "line-opacity",
            styleSettings.lineOpacity
          );
        }
      }
    };

    if (isLine && map) {
      updateMapLayer();
    }
  }, [styleSettings, map]);

  // useEffect hook to update geojsonData when styleSettings change
  useEffect(() => {
    const updatedGeojsonData = updateGeojsonWithLineStyle(
      geojsonData,
      styleSettings
    );
    if (isLine && map) {
      setGeojsonData(updatedGeojsonData);
    }
  }, [styleSettings]);

  const handleSave = async (title, version, privacy) => {
    const mapImage = map.getCanvas().toDataURL();
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
      await mapServiceAPI.storeLoadedMapGraphic(
        userId,
        mapId, // This could be null if creating a new map
        titleToPut,
        versionToPut,
        privacy,
        null,
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
      {!isMapLoaded && (
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <CircularProgress />
        </div>
      )}

      {isLine ? (
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
              <Box>
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
                  width="100%"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    sx={{
                      width: "100%",
                      color: "#fafafa",
                      textAlign: "left",
                    }}
                  >
                    Select Line Color
                  </Typography>
                  <input
                    type="color"
                    value={styleSettings.lineColor || "#000000"}
                    onChange={(event) =>
                      handleLineColorChange(event.target.value)
                    }
                    style={{ marginBottom: "30px" }}
                  />
                </Box>

                <Box
                  width="100%"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "20px 0",
                  }}
                >
                  <Typography
                    sx={{
                      width: "100%",
                      color: "#fafafa",
                      textAlign: "left",
                    }}
                  >
                    Select Line Width
                  </Typography>
                  <Slider
                    value={styleSettings.lineWidth || 2}
                    min={1}
                    max={10}
                    step={0.1}
                    onChange={handleLineWidthChange}
                  />
                </Box>

                <Box
                  width="100%"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "20px 0",
                  }}
                >
                  <Typography
                    sx={{
                      width: "100%",
                      color: "#fafafa",
                      textAlign: "left",
                    }}
                  >
                    Select Line Opacity
                  </Typography>
                  <Slider
                    value={styleSettings.lineOpacity || 1.0}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={handleLineOpacityChange}
                  />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="3">
              <SaveTab
                onSave={handleSave}
                mapLayer={styleSettings}
                map={map}
                geojson={geojsonData}
              />
            </TabPanel>
          </TabContext>
        </Box>
      ) : (
        <Box
          sx={{
            width: isMobile ? "100%" : "40%",
            overflow: "scroll",
            height: isMobile ? "50%" : "auto",
          }}
        >
          <ExportTab map={map} />
        </Box>
      )}
    </Box>
  );
}

export default File;
