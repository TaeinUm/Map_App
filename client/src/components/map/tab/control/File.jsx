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
    geojsonData: {},
  });

  const sourceId = "uploadedGeoSource";
  const layerId = "uploaded-data-layer";

  const layerSelector = {
    background: /land|landcover/,
    water: /water-depth|^water$/,
    labels: /label|place|poi/,
    waterway: /^waterway$/,
    boundary: /boundary/,
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
        newMap.addSource("countries", {
          type: "vector",
          url: "mapbox://mapbox.country-boundaries-v1",
        });

        if (geojsonData && !mapId && geojsonData.features) {
          geojsonData.features.forEach((feature, index) => {
            const layerId = `layer-${index}`;
            if (feature.properties.source === "pointmap-data") {
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
            }
          });

          setMap(newMap);
          setIsMapLoaded(true);
        } else if (!mapId) {
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
        } else {
          setMap(newMap);
          setIsMapLoaded(true);
        }
      });
    }
  }, [map, geojsonData, mapId]);
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
