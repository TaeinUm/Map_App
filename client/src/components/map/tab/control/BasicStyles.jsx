import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as mapboxgl from "mapbox-gl";
import {
  Box,
  CircularProgress,
  Slider,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { useMediaQuery, useTheme } from "@mui/material";

import { MapContext } from "../../../../contexts/MapContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";

import SaveTab from "../SaveTab";
import TabMenu from "../../editmap/TabMenu";
import MapMobile from "../../landing/MapMobile";
import extractbasic from "./basiccontrol/extractbasic";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

const selectStyle = {
  margin: "5px",
  ".MuiInputBase-input": { color: "#fafafa" },
  ".MuiSelect-select": { color: "#fafafa" },
  ".MuiOutlinedInput-notchedOutline": { borderColor: "#fafafa" },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fafafa",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fafafa",
  },
  "& .MuiSvgIcon-root": {
    color: "#fafafa",
  },
  borderTop: "1px solid #fafafa",
};

const BasicStyles = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const { mapId, setMapId } = useContext(MapContext);
  const { userId, username } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [labelText, setLabelText] = useState("");
  const [geojsonData, setGeojsonData] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [processedgeojson, setProcessedGeojson] = useState({});

  const [styleSettings, setStyleSettings] = useState({
    visibility: {
      water: true,
      labels: true,
      background: true,
      waterway: true,
      boundary: true,
    },
    color: {
      water: "#DBE2E6",
      labels: "#78888a",
      background: "#EBF0F0",
      waterway: "#b3cde3",
      boundary: "#f03b20",
    },
    fontSize: 12, // default font size
    fontFamily: "Arial Unicode MS Bold", // default font family
    lineWidth: {
      boundary: 1,
      waterway: 1,
    },
    labels: [],
  });

  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v12"
  );
  const [tabValue, setTabValue] = useState("1");
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
      styleSettings.labels.forEach((label) => {
        if (map.getLayer(label.id)) {
          map.removeLayer(label.id);
          map.removeSource(label.id);
        }
      });
      previousState.labels.forEach(addLabelLayer);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack([...undoStack, styleSettings]);
      setRedoStack(redoStack.slice(0, -1));
      setStyleSettings(nextState);
      styleSettings.labels.forEach((label) => {
        if (map.getLayer(label.id)) {
          map.removeLayer(label.id);
          map.removeSource(label.id);
        }
      });
      nextState.labels.forEach(addLabelLayer);
    }
  };

  const layerSelector = {
    background: /land|landcover/,
    water: /water-depth|^water$/,
    labels: /label|place|poi/,
    waterway: /^waterway$/,
    boundary: /boundary/,
  };

  const categories = ["water", "labels", "background", "waterway", "boundary"];

  const colorClass = {
    fill: "fill-color",
    line: "line-color",
    symbol: "text-color",
    background: "background-color",
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const initializeMap = async () => {
      setIsLoading(true);

      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
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
            const mapLayer = data.mapData;
            setStyleSettings(JSON.parse(mapLayer));
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
    };

    if (!isMobile) {
      initializeMap();
    }
  }, [mapId, isMobile]);

  useEffect(() => {
    if (!map || !map.getStyle || isMobile) {
      return;
    }

    const layers = map.getStyle().layers;

    layers.forEach((layer) => {
      const { id, type } = layer;
      for (const category of categories) {
        if (layerSelector[category].test(id)) {
          const isVisible = styleSettings.visibility[category];
          map.setLayoutProperty(
            id,
            "visibility",
            isVisible ? "visible" : "none"
          );

          const colorProperty = colorClass[type];
          if (colorProperty) {
            map.setPaintProperty(
              id,
              colorProperty,
              styleSettings.color[category]
            );
          }
        }
      }

      // Update font and line width specific properties
      if (type === "symbol") {
        map.setLayoutProperty(id, "text-size", styleSettings.fontSize);
        map.setLayoutProperty(id, "text-font", [styleSettings.fontFamily]);
      }
      if (type === "line") {
        const lineWidthCategory = id.startsWith("road")
          ? "roads"
          : id.startsWith("admin")
          ? "boundary"
          : "waterway";
        map.setPaintProperty(
          id,
          "line-width",
          styleSettings.lineWidth[lineWidthCategory] || 1
        );
      }
    });
  }, [map, styleSettings, isMobile]);

  const addLabelOnClick = (e) => {
    const coordinates = e.lngLat;
    const labelId = `label-${Date.now()}`;
    const newLabel = {
      id: labelId,
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [coordinates.lng, coordinates.lat],
      },
      properties: {
        id: labelId,
        type: "symbol",
        source: labelId,
        title: labelText,
        layout: {
          "text-field": ["get", "title"],
          "text-size": styleSettings.fontSize,
          "text-font": [styleSettings.fontFamily],
          "text-anchor": "bottom",
        },
      },
    };

    map.addSource(labelId, {
      type: "geojson",
      data: newLabel,
    });

    map.addLayer({
      id: labelId,
      type: "symbol",
      source: labelId,
      layout: {
        "text-field": ["get", "title"],
        "text-size": styleSettings.fontSize,
        "text-font": [styleSettings.fontFamily],
        "text-anchor": "bottom",
      },
    });

    setGeojsonData((prevData) => ({
      ...prevData,
      features: [...prevData.features, newLabel],
    }));

    setStyleSettings((prev) => {
      const newState = {
        ...prev,
        labels: [...prev.labels, newLabel],
      };

      applyChange(newState);
      return newState;
    });
  };

  useEffect(() => {
    if (map) {
      map.on("click", addLabelOnClick);

      return () => map.off("click", addLabelOnClick);
    }
  }, [map, labelText]);

  useEffect(() => {
    if (styleSettings && geojsonData.features) {
      setProcessedGeojson(extractbasic(geojsonData, styleSettings));
    }
  }, [geojsonData]);

  const addLabelLayer = (label) => {
    if (!map.getLayer(label.id)) {
      map.addSource(label.id, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: label.geometry.coordinates,
          },
          properties: {
            title: label.properties.title,
          },
        },
      });

      map.addLayer({
        id: label.id,
        type: "symbol",
        source: label.id,
        layout: {
          "text-field": label.properties.title,
          "text-size": styleSettings.fontSize,
          "text-anchor": "bottom",
        },
      });
    }
  };

  useEffect(() => {
    if (mapId && map) {
      styleSettings.labels.forEach((label) => {
        addLabelLayer(label);
      });
    }
  }, [mapId, map, styleSettings.labels]);

  // Handlers for changing style settings
  const handleCategoryColor = (category, color) => {
    setStyleSettings((prevSettings) => {
      const newState = {
        ...prevSettings,
        color: { ...prevSettings.color, [category]: color },
      };

      applyChange(newState);
      return newState;
    });
  };

  const handleVisibilityChange = (category, isVisible) => {
    setStyleSettings((prev) => {
      const newState = {
        ...prev,
        visibility: { ...prev.visibility, [category]: isVisible },
      };

      applyChange(newState);
      return newState;
    });
  };

  const handleFontSizeChange = (fontSize) => {
    setStyleSettings((prev) => {
      const newState = { ...prev, fontSize };

      applyChange(newState);
      return newState;
    });
  };

  const handleFontFamilyChange = (fontFamily) => {
    setStyleSettings((prevSettings) => {
      const newState = {
        ...prevSettings,
        fontFamily: fontFamily,
      };

      applyChange(newState);
      return newState;
    });
  };

  const handleLineWidthChange = (category, width) => {
    setStyleSettings((prev) => {
      const newState = {
        ...prev,
        lineWidth: { ...prev.lineWidth, [category]: width },
      };

      applyChange(newState);
      return newState;
    });
  };

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
      await mapServiceAPI.addMapGraphics(
        userId,
        mapId, // This could be null if creating a new map
        titleToPut,
        versionToPut,
        privacy,
        "Basic Map",
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
    <>
      {isMobile ? (
        <MapMobile />
      ) : (
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
                  <Typography
                    variant="h4"
                    style={{
                      color: "#fafafa",
                      textAlign: "left",
                      marginBottom: "20px",
                    }}
                  >
                    Basic Styles
                  </Typography>
                  {categories.map((category) => (
                    <Box
                      key={category}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#fafafa",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography>{category}: </Typography>
                      <Box style={{ display: "flex", marginBottom: "10px" }}>
                        <input
                          type="color"
                          value={styleSettings.color[category]}
                          onChange={(e) =>
                            handleCategoryColor(category, e.target.value)
                          }
                          disabled={!styleSettings.visibility[category]}
                        />
                        <Typography>Visible: </Typography>
                        <input
                          type="checkbox"
                          checked={styleSettings.visibility[category]}
                          onChange={(e) =>
                            handleVisibilityChange(category, e.target.checked)
                          }
                        />
                      </Box>
                    </Box>
                  ))}
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#fafafa",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography style={{ marginBottom: "10px" }}>
                      Font Style:{" "}
                    </Typography>
                    <select
                      value={styleSettings.fontFamily}
                      onChange={(e) => handleFontFamilyChange(e.target.value)}
                    >
                      <option value="Arial Unicode MS Bold">
                        Arial Unicode MS Bold
                      </option>
                      <option value="Open Sans Bold">Open Sans Bold</option>
                      <option value="DIN Offc Pro Medium">
                        DIN Offc Pro Medium
                      </option>
                      <option value="Roboto Regular">Roboto Regular</option>
                      <option value="Roboto Bold">Roboto Bold</option>
                    </select>
                  </Box>
                  <Box>
                    <Typography sx={{ color: "#fafafa" }}>
                      {" "}
                      Type the Region Name and Click the location on the map
                    </Typography>
                    <TextField
                      variant="outlined"
                      value={labelText}
                      onChange={(e) => setLabelText(e.target.value)}
                      placeholder="Enter label text"
                      sx={selectStyle}
                    />
                  </Box>
                  <Typography sx={{ color: "#fafafa", marginBottom: "10px" }}>
                    Font size
                  </Typography>
                  <Slider
                    value={styleSettings.fontSize}
                    onChange={(e, newValue) => handleFontSizeChange(newValue)}
                    min={8}
                    max={20}
                    sx={{ marginBottom: "20px" }}
                  />

                  <Typography sx={{ color: "#fafafa", marginBottom: "10px" }}>
                    Boundary Width
                  </Typography>
                  <Slider
                    value={styleSettings.lineWidth.boundary}
                    onChange={(e, newValue) =>
                      handleLineWidthChange("boundary", newValue)
                    }
                    min={0.5}
                    max={5}
                    sx={{ marginBottom: "20px" }}
                  />

                  <Typography sx={{ color: "#fafafa", marginBottom: "10px" }}>
                    Waterway Width
                  </Typography>
                  <Slider
                    value={styleSettings.lineWidth.waterway}
                    onChange={(e, newValue) =>
                      handleLineWidthChange("waterway", newValue)
                    }
                    min={0.5}
                    max={5}
                    sx={{ marginBottom: "20px" }}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="3">
                <SaveTab
                  onSave={handleSave}
                  mapLayer={styleSettings}
                  map={map}
                  geojson={processedgeojson}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      )}
    </>
  );
};

export default BasicStyles;
