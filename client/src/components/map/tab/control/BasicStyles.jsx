import React, { useState, useEffect, useRef } from "react";
import * as mapboxgl from "mapbox-gl";
import { Tab, Tabs, Box, Button, Typography } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Memo from "../../Memo";

import JSONTab from "../JSONTab";
import ShareTab from "../ShareTab";
import SaveTab from "../SaveTab";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

const BasicStyles = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [fontStyle, setFontStyle] = useState("Arial Unicode MS Bold");
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
    const newMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128],
      zoom: 2,
    });

    newMap.on("load", () => {
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

      setMap(newMap);
    });

    return () => newMap.remove();
  }, []);

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
      setMapJson(map.getStyle());
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
        </TabContext>
        <Button
          sx={{ width: "100%", height: "20px", backgroundColor: "grey" }}
          onClick={toggleMemo}
        >
          {isMemoVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Button>
        {isMemoVisible && <Memo />}
      </Box>
    </Box>
  );
};

export default BasicStyles;
