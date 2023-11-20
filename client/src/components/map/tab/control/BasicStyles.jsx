import React, { useState, useEffect, useRef, useContext } from "react";
import * as mapboxgl from "mapbox-gl";
import {
  Tab,
  Tabs,
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Memo from "../Memo";
import { MapContext } from "../../../../contexts/MapContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";

import ShareTab from "../ShareTab";
import SaveTab from "../SaveTab";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

const BasicStyles = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
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
      streets: true,
      transit: true,
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
      streets: "#ffeda0",
      transit: "#ff9999",
      landuse: "#d2f53c",
      waterway: "#b3cde3",
      boundary: "#f03b20",
    },
  });
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v11"
  );
  const [tabValue, setTabValue] = useState("1");
  const [mapJson, setMapJson] = useState({});
  const [isMemoVisible, setIsMemoVisible] = useState(false);
  const [memoContent, setMemoContent] = useState("");
  const [regionColor, setRegionColor] = useState("#FF5733");
  const [selectedCountry, setSelectedCountry] = useState("");

  const layerSelector = {
    background: /background/,
    water: /water/,
    parks: /park/,
    buildings: /building/,
    roads: /road|bridge|tunnel/,
    labels: /label|place|poi/,
    streets: /street/,
    transit: /transit/,
    landuse: /landuse/,
    waterway: /waterway/,
    boundary: /boundary/,
  };

  const categories = [
    "water",
    "parks",
    "buildings",
    "roads",
    "labels",
    "background",
    "streets",
    "transit",
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
    const initializeMap = async () => {
      setIsLoading(true);

      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.006, 40.7128],
        zoom: 2,
      });

      newMap.on("load", async () => {
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

    initializeMap();
  }, [mapId]);

  useEffect(() => {
    if (!map || !map.getStyle) {
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
      const addedLayers = currentLayers.filter(
        (layer) => !initialLayers.includes(layer.id)
      );
      const addedLayersJson = JSON.stringify(addedLayers, null, 2);
      setMapLayer(addedLayersJson);
    }
  }, [map, mapStyle, styleSettings]);

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
        username,
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

      <Box sx={{ width: "40%" }}>
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
              {/*      <Tab
                label="Share"
                value="2"
                sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
      />*/}
              <Tab
                label="Save"
                value="3"
                sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
              />
            </Tabs>
          </Box>
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
            </div>
          </TabPanel>
          {/* <TabPanel value="2">
            <ShareTab />
              </TabPanel>*/}
          <TabPanel value="3">
            <SaveTab onSave={handleSave} mapLayer={mapLayer} />
          </TabPanel>
        </TabContext>
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
      </Box>
    </Box>
  );
};

export default BasicStyles;
