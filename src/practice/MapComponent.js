import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

//Juyee
// Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ";

const MapComponent = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-73.968285, 40.785091],
      zoom: 12, // initial zoom level
    });

    // add Vector Tile
    map.on("load", () => {
      map.addLayer({
        id: "vector-tile-layer",
        type: "fill",
        source: {
          type: "vector",
          url: "mapbox://mapbox.mapbox-streets-v8",
        }, //only v8 supports this (x v9~)
        "source-layer": "building",
        paint: {
          "fill-color": "red",
        },
      });
    });
    return () => map.remove(); // remove map (unmount)
  }, []);

  return <div ref={mapContainer} style={{ width: "400px", height: "500px" }} />;
};

export default MapComponent;
