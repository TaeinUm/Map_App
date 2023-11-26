import React, { useState, useEffect, useRef, useContext } from "react";
import * as mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Box, CircularProgress, Slider, Typography } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { useMediaQuery, useTheme } from "@mui/material";

import { MapContext } from "../../../../contexts/MapContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";

import SaveTab from "../SaveTab";
import TabMenu from "../../editmap/TabMenu";
import MapMobile from "../../landing/MapMobile";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

const BasicStyles = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [fontStyle, setFontStyle] = useState("Arial Unicode MS Bold");
  const { mapId } = useContext(MapContext);
  const { userId, username } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLayers, setInitializeLayers] = useState(null);
  const [mapLayer, setMapLayer] = useState(null);

  const [styleSettings, setStyleSettings] = useState({
    visibility: {
      water: true,
      parks: true,
      buildings: true,
      roads: true,
      labels: true,
      background: true,
      landuse: true,
      waterway: true,
      boundary: true,
    },
    color: {
      water: "#DBE2E6",
      parks: "#E6EAE9",
      buildings: "#c0c0c8",
      roads: "#ffffff",
      labels: "#78888a",
      background: "#EBF0F0",
      landuse: "#d2f53c",
      waterway: "#b3cde3",
      boundary: "#f03b20",
    },
  });
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v12"
  );
  const [tabValue, setTabValue] = useState("1");
  const [labelFontSize, setLabelFontSize] = useState(12);
  const [roadWidth, setRoadWidth] = useState(1);
  const [boundaryWidth, setBoundaryWidth] = useState(1);
  const [waterwayWidth, setWaterwayWidth] = useState(1);

  const layerSelector = {
    background: /land|landcover/,
    water: /water-depth|^water$/,
    parks: /park/,
    buildings: /building/,
    roads: /road|bridge|tunnel/,
    labels: /label|place|poi/,
    landuse: /landuse/,
    waterway: /^waterway$/,
    boundary: /boundary/,
  };

  const categories = [
    "water",
    "parks",
    "buildings",
    "roads",
    "labels",
    "background",
    "landuse",
    "waterway",
    "boundary",
  ];

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
        const layers = newMap.getStyle().layers;
        console.log("layers", layers);
        const buildingLayer = layers.find((layer) => layer.id === "building");

        if (buildingLayer) {
          newMap.setLayerZoomRange("building", 15, 2);
        }
        if (mapId) {
          try {
            // Fetch map graphics data using mapId
            const data = await mapServiceAPI.getMapGraphicData(
              userId,
              username,
              mapId
            );
            const mapLayer = data.mapLayer;

            // Check if mapLayer is valid and add it to the map
            if (mapLayer && data.mapType) {
              newMap.addLayer(mapLayer);
            } else {
              console.error("Invalid map layer data");
            }
          } catch (error) {
            console.error("Error loading map graphics:", error);
          } finally {
            setMap(newMap);
            setIsLoading(false);
            const initialLayers = newMap
              .getStyle()
              .layers.map((layer) => layer.id);
            setInitializeLayers(initialLayers);
          }
        } else {
          setMap(newMap);
          setIsLoading(false);
          const initialLayers = newMap
            .getStyle()
            .layers.map((layer) => layer.id);
          setInitializeLayers(initialLayers);
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
      const id = layer.id;
      const type = layer.type;

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
          break;
        }
      }
    });
    if (map) {
      const currentLayers = map.getStyle().layers;
      const addedLayers = currentLayers.id;
      const addedLayersJson = JSON.stringify(addedLayers, null, 2);
      setMapLayer(addedLayersJson);
    }
  }, [map, mapStyle, styleSettings]);

  // Update Font Size
  useEffect(() => {
    if (!map || isMobile) return; // Skip if no map or mobile view

    const updateLabelFontSize = (fontSize) => {
      const layers = map.getStyle().layers;
      layers.forEach((layer) => {
        if (layer.type === "symbol") {
          map.setLayoutProperty(layer.id, "text-size", fontSize);
        }
      });
    };

    updateLabelFontSize(labelFontSize);
  }, [map, labelFontSize, isMobile]);

  // Update Road Width
  useEffect(() => {
    if (!map || isMobile) return; // Skip if no map or mobile view

    const updateRoadWidth = (width) => {
      const layers = map.getStyle().layers;
      layers.forEach((layer) => {
        if (layer.id.startsWith("road") && layer.type === "line") {
          map.setPaintProperty(layer.id, "line-width", width);
        }
      });
    };

    updateRoadWidth(roadWidth);
  }, [map, roadWidth, isMobile]);

  // Update Boundary Width
  useEffect(() => {
    if (!map || isMobile) return; // Skip if no map or mobile view

    const updateBoundaryWidth = (width) => {
      const layers = map.getStyle().layers;
      layers.forEach((layer) => {
        if (layer.id.startsWith("admin")) {
          map.setPaintProperty(layer.id, "line-width", width);
        }
      });
    };

    updateBoundaryWidth(boundaryWidth);
  }, [map, boundaryWidth, isMobile]);

  // Update Waterway Width
  useEffect(() => {
    if (!map || isMobile) return; // Skip if no map or mobile view

    const updateWaterwayWidth = (width) => {
      const layers = map.getStyle().layers;
      layers.forEach((layer) => {
        if (layer.id === "waterway" && layer.type === "line") {
          map.setPaintProperty(layer.id, "line-width", width);
        }
      });
    };

    updateWaterwayWidth(waterwayWidth);
  }, [map, waterwayWidth, isMobile]);

  const handleCategoryColor = (category, color) => {
    setStyleSettings((prevSettings) => ({
      ...prevSettings,
      color: { ...prevSettings.color, [category]: color },
    }));
  };

  const handleFontChange = (newFont) => {
    setFontStyle(newFont);
    if (!map) return;

    const layers = map.getStyle().layers;

    layers.forEach((layer) => {
      if (
        layer.type === "symbol" &&
        layer.layout &&
        layer.layout["text-field"]
      ) {
        map.setLayoutProperty(layer.id, "text-font", [newFont]);
      }
    });
  };

  const handleVisibilityChange = (category, isVisible) => {
    setStyleSettings((prevSettings) => ({
      ...prevSettings,
      visibility: {
        ...prevSettings.visibility,
        [category]: isVisible,
      },
    }));
  };

  const handleSave = async (title, version, privacy, mapLayer) => {
    try {
      await mapServiceAPI.addMapGraphics(
        userId,
        mapId, // This could be null if creating a new map
        title,
        version,
        privacy,
        "Basic Map",
        mapLayer
      );
      alert("Map saved successfully");
    } catch (error) {
      console.error("Error saving map:", error);
      alert("Error saving map");
    }
  };

  const handleLabelFontSizeChange = (event, newValue) => {
    setLabelFontSize(newValue);
    updateLabelFontSize(newValue);
  };

  const handleRoadWidthChange = (event, newValue) => {
    setRoadWidth(newValue);
    if (map) {
      const layers = map.getStyle().layers;
      layers.forEach((layer) => {
        if (layer.id.startsWith("road") && layer.type === "line") {
          updateLayerWidth(layer.id, newValue);
        }
      });
    }
  };

  const handleBoundaryWidthChange = (event, newValue) => {
    setBoundaryWidth(newValue);
    if (map) {
      const layers = map.getStyle().layers;
      layers.forEach((layer) => {
        if (layer.id.startsWith("admin")) {
          updateLayerWidth(layer.id, newValue);
        }
      });
    }
  };

  const handleWaterwayWidthChange = (event, newValue) => {
    setRoadWidth(newValue);
    if (map) {
      const layers = map.getStyle().layers;
      layers.forEach((layer) => {
        if (layer.id === "waterway" && layer.type === "line") {
          updateLayerWidth(layer.id, newValue);
        }
      });
    }
  };

  const updateLabelFontSize = (fontSize) => {
    if (map) {
      const layers = map.getStyle().layers;
      layers.forEach((layer) => {
        if (layer.type === "symbol") {
          map.setLayoutProperty(layer.id, "text-size", fontSize);
        }
      });
    }
  };

  const updateLayerWidth = (layerId, width) => {
    if (map) {
      const layers = map.getStyle().layers;
      layers.forEach((layer) => {
        if (layer.id === layerId) {
          map.setPaintProperty(layer.id, "line-width", width);
        }
      });
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
                <div>
                  <h3 style={{ color: "#fafafa", textAlign: "left" }}>
                    Basic Styles
                  </h3>
                  {categories.map((category) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#fafafa",
                        marginBottom: "10px",
                      }}
                      key={category}
                    >
                      <label>{category}: </label>
                      <div style={{ display: "flex", marginBottom: "10px" }}>
                        <input
                          type="color"
                          value={styleSettings.color[category]}
                          onChange={(e) =>
                            handleCategoryColor(category, e.target.value)
                          }
                          disabled={!styleSettings.visibility[category]}
                        />
                        <label>Visible: </label>
                        <input
                          type="checkbox"
                          checked={styleSettings.visibility[category]}
                          onChange={(e) =>
                            handleVisibilityChange(category, e.target.checked)
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#fafafa",
                      marginBottom: "20px",
                    }}
                  >
                    <label style={{ marginBottom: "10px" }}>Font Style: </label>
                    <select
                      value={fontStyle}
                      onChange={(e) => handleFontChange(e.target.value)}
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
                  </div>
                  <Typography sx={{ color: "#fafafa", marginBottom: "10px" }}>
                    Font size
                  </Typography>
                  <Slider
                    value={labelFontSize}
                    onChange={handleLabelFontSizeChange}
                    min={8}
                    max={20}
                    sx={{ marginBottom: "20px" }}
                  />
                  <Typography sx={{ color: "#fafafa", marginBottom: "10px" }}>
                    Road Width
                  </Typography>
                  <Slider
                    value={roadWidth}
                    onChange={handleRoadWidthChange}
                    min={0.5}
                    max={5}
                    sx={{ marginBottom: "20px" }}
                  />
                  <Typography sx={{ color: "#fafafa", marginBottom: "10px" }}>
                    Boundary Width
                  </Typography>
                  <Slider
                    value={boundaryWidth}
                    onChange={handleBoundaryWidthChange}
                    min={0.5}
                    max={5}
                    sx={{ marginBottom: "20px" }}
                  />
                  <Typography sx={{ color: "#fafafa", marginBottom: "10px" }}>
                    Waterway Width
                  </Typography>
                  <Slider
                    value={boundaryWidth}
                    onChange={handleWaterwayWidthChange}
                    min={0.5}
                    max={5}
                    sx={{ marginBottom: "20px" }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="3">
                <SaveTab onSave={handleSave} mapLayer={mapLayer} map={map} />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      )}
    </>
  );
};

export default BasicStyles;
