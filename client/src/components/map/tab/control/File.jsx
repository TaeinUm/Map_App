import React, { useState, useEffect, useRef, useContext } from "react";
import * as mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Box, CircularProgress } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import { MapContext } from "../../../../contexts/MapContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";
import { AuthContext } from "../../../../contexts/AuthContext";

import ExportTab from "../ExportTab";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

function File() {
  const { geojsonData, mapId, setGeojsonData } = useContext(MapContext);
  const { userId } = useContext(AuthContext);
  const mapContainer = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [map, setMap] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [styleSettings, setStyleSettings] = useState({
    lineColor: "#000000",
    lineOpacity: 0.5,
    waterColor: "#ffffff",
    lineThickness: 2,
    geojsonData: {},
  });

  const sourceId = "uploadedGeoSource";
  const layerId = "uploaded-data-layer";

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
          newMap.addSource(sourceId, {
            type: "geojson",
            data: geojsonData,
          });
          console.log("geojsonData: ", geojsonData);

          if (geojsonData.features) {
            geojsonData.features.forEach((feature, index) => {
              const layerId = `layer-${index}`;
              const featureType = feature.properties.type || "line";
              let paint = {
                "line-color":
                  feature.properties["line-color"] || styleSettings.lineColor,
                "line-opacity":
                  feature.properties["line-opacity"] ||
                  styleSettings.lineOpacity,
                "line-width":
                  feature.properties["line-width"] ||
                  styleSettings.lineThickness,
              };

              if (
                feature.properties.type !== "line" &&
                feature.properties.paint
              ) {
                paint = feature.properties.paint;
              }

              newMap.addLayer({
                id: layerId,
                type: featureType,
                source: sourceId,
                paint: feature.properties.paint || paint,
                layout: feature.properties.layout || {},
              });
            });
          } else {
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
          }

          newMap.setPaintProperty(
            "water",
            "fill-color",
            styleSettings.waterColor
          );
          setMap(newMap);
          setIsMapLoaded(true);
        } else if (mapId) {
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
        } else {
          setMap(newMap);
          setIsMapLoaded(true);
        }
      });
    }
  }, [map, geojsonData]);

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
        <ExportTab map={map} />
      </Box>
    </Box>
  );
}

export default File;
