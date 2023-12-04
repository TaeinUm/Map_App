import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { useMediaQuery, useTheme } from "@mui/material";

import { MapContext } from "../../../../contexts/MapContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";
import { AuthContext } from "../../../../contexts/AuthContext";

import SaveTab from "../SaveTab";
import TabMenu from "../../editmap/TabMenu";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

function File() {
  const { geojsonData, mapId, setMapId, setGeojsonData } =
    useContext(MapContext);
  const { userId } = useContext(AuthContext);
  const mapContainer = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [map, setMap] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [tabValue, setTabValue] = useState("1");

  const [styleSettings, setStyleSettings] = useState({
    lineColor: "#000000",
    lineOpacity: 0.5,
    waterColor: "#ffffff",
    lineThickness: 2,
    geojsonData: {},
  });

  const sourceId = "uploadedGeoSource";
  const layerId = "uploaded-data-layer";

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const setLineColor = (color) => {
    setStyleSettings((prevSettings) => ({
      ...prevSettings,
      lineColor: color,
    }));
  };

  const setLineOpacity = (opacity) => {
    setStyleSettings((prevSettings) => ({
      ...prevSettings,
      lineOpacity: opacity,
    }));
  };

  const setWaterColor = (color) => {
    setStyleSettings((prevSettings) => ({
      ...prevSettings,
      waterColor: color,
    }));
  };

  const setLineThickness = (thickness) => {
    setStyleSettings((prevSettings) => ({
      ...prevSettings,
      lineThickness: thickness,
    }));
  };

  const setStyleSettingsJson = (data) => {
    setStyleSettings((prevSettings) => ({
      ...prevSettings,
      geojsonData: data,
    }));
  };

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
      newMap.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        })
      );
      newMap.addControl(new mapboxgl.FullscreenControl());
      newMap.addControl(new mapboxgl.NavigationControl());

      newMap.on("load", async () => {
        if (geojsonData && !mapId) {
          setStyleSettingsJson(geojsonData);

          newMap.addSource(sourceId, {
            type: "geojson",
            data: geojsonData,
          });

          newMap.addLayer({
            id: layerId,
            type: "line",
            source: sourceId,
            paint: {
              "line-color": styleSettings.lineColor,
              "line-opacity": styleSettings.lineOpacity,
              "line-width": styleSettings.lineThickness,
            },
          });

          newMap.setPaintProperty(
            "water",
            "fill-color",
            styleSettings.waterColor
          );
          setMap(newMap);
          setIsMapLoaded(true);
        } else if (mapId) {
          try {
            // Fetch map graphics data using mapId
            const data = await mapServiceAPI.getMapGraphicData(userId, mapId);
            const mapLayer = JSON.parse(data.mapData);
            setStyleSettings(mapLayer);
            setStyleSettingsJson(data.geojsonData);
            setGeojsonData(data.geojsonData);
            //drawExistingFlows(mapLayer.flows, newMap); color regions functions here?
            newMap.addSource(sourceId, {
              type: "geojson",
              data: geojsonData,
            });

            newMap.addLayer({
              id: layerId,
              type: "line",
              source: sourceId,
              paint: {
                "line-color": styleSettings.lineColor,
                "line-opacity": styleSettings.lineOpacity,
                "line-width": styleSettings.lineThickness,
              },
            });

            newMap.setPaintProperty(
              "water",
              "fill-color",
              styleSettings.waterColor
            );
          } catch (error) {
            console.error("Error loading map graphics:", error);
          } finally {
            setMap(newMap);
            setIsMapLoaded(true);
          }
        } else {
          setMap(newMap);
          setIsMapLoaded(true);
        }
      });
    }
  }, [map, geojsonData]);

  const updateMapStyle = () => {
    if (map) {
      map.setPaintProperty(layerId, "line-color", styleSettings.lineColor);
      map.setPaintProperty(layerId, "line-opacity", styleSettings.lineOpacity);
      map.setPaintProperty(layerId, "line-width", styleSettings.lineThickness);

      map.setPaintProperty("water", "fill-color", styleSettings.waterColor);
    }
  };

  const handleSave = async (title, version, privacy) => {
    const mapImage = map.getCanvas().toDataURL();
    try {
      await mapServiceAPI.storeLoadedMapGraphic(
        userId,
        mapId, // This could be null if creating a new map
        title,
        version,
        privacy,
        null, // mapType
        JSON.stringify(styleSettings),
        mapImage,
      );
      setMapId(null);
      navigate("/map");
      alert("Map saved successfully");
    } catch (error) {
      console.error("Error saving map:", error);
      alert("Error saving map");
    }
  };

  const makeGeoJSON = () => {
    const styledGeoJsonData = {
      ...geojsonData,
      paint: {
        "line-color": styleSettings.lineColor,
        "line-opacity": styleSettings.lineOpacity,
        "line-width": styleSettings.lineThickness,
      },
    };

    return styledGeoJsonData;
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
      <Box
        sx={{
          width: isMobile ? "100%" : "40%",
          overflow: "scroll",
          height: isMobile ? "50%" : "auto",
        }}
      >
        <TabContext value={tabValue}>
          <TabMenu tabValue={tabValue} handleTabChange={handleTabChange} />

          <TabPanel value="1" sx={{ height: "100%", overflow: "scroll" }}>
            <Box
              sx={{
                display: "flex",
                color: "#fafafa",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              {/* Color Picker for Line */}
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                Select Line Color:
              </Typography>
              <input
                type="color"
                value={styleSettings.lineColor}
                onChange={(e) => {
                  setLineColor(e.target.value);
                  updateMapStyle();
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                color: "#fafafa",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              {/* Opacity Slider for Line */}
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                Adjust Line Opacity:
              </Typography>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={styleSettings.lineOpacity}
                onChange={(e) => {
                  setLineOpacity(parseFloat(e.target.value));
                  updateMapStyle();
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                color: "#fafafa",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              {/* Color Picker for Water */}
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                Select Water Color:
              </Typography>
              <input
                type="color"
                value={styleSettings.waterColor}
                onChange={(e) => {
                  setWaterColor(e.target.value);
                  updateMapStyle();
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                color: "#fafafa",
                justifyContent: "space-between",
              }}
            >
              {/* Line Thickness Slider */}
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                Adjust Line Thickness:
              </Typography>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={styleSettings.lineThickness}
                onChange={(e) => {
                  setLineThickness(parseInt(e.target.value));
                  updateMapStyle();
                }}
              />
            </Box>
          </TabPanel>

          <TabPanel value="3" sx={{ height: "100%", overflow: "scroll" }}>
            <SaveTab
              onSave={handleSave}
              mapLayer={styleSettings}
              map={map}
              geojson={makeGeoJSON()}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default File;
