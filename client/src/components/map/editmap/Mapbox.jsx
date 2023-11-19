import React, { useRef, useEffect } from "react";
import * as mapboxgl from "mapbox-gl";

const MapBox = ({ mapStyle, onMapLoad }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [-74.006, 40.7128],
      zoom: 2,
    });

    newMap.on("load", () => {
      if (onMapLoad) {
        onMapLoad(newMap);
      }
    });

    return () => newMap.remove();
  }, [mapStyle, onMapLoad]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default MapBox;
