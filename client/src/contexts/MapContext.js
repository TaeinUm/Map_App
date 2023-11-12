import React, { createContext, useState } from "react";
import { fromJS } from "immutable";
import MAP_STYLE from "../components/map/map-style-basic-v8.json";

export const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const [mapType, setMapType] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const [mapStyle, setMapStyle] = useState(fromJS(MAP_STYLE));
  const [markers, setMarkers] = useState([]);

  const updateMapContextAndNavigate = (type, data, navigate) => {
    setMapType(type);
    setGeojsonData(data);
    navigate("/mapedit");
  };

  const updateMapStyle = (newStyle) => {
    setMapStyle(newStyle);
  };

  const addMarker = (newMarker) => {
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };

  return (
    <MapContext.Provider
      value={{
        mapType,
        setMapType,
        geojsonData,
        setGeojsonData,
        updateMapContextAndNavigate,
        mapStyle,
        updateMapStyle,
        markers,
        addMarker,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
