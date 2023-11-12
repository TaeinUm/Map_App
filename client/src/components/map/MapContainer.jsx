import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ";

const MapContainer = ({
  mapStyle,
  regionColor,
  setMap,
  setSelectedCountry,
}) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
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

        newMap.on("click", "country-boundaries", function (e) {
          const countryCode = e.features[0].properties.iso_3166_1_alpha_3;
          const countryName = e.features[0].properties.name;

          newMap.setFilter("country-boundaries", [
            "==",
            ["get", "iso_3166_1_alpha_3"],
            countryCode,
          ]);

          newMap.setPaintProperty(
            "country-boundaries",
            "fill-color",
            regionColor
          );

          setSelectedCountry(countryName);
        });

        setMap(newMap);
        newMap.resize();
      });
    };
    initializeMap();
  }, [mapStyle, regionColor, setMap, setSelectedCountry]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default MapContainer;
