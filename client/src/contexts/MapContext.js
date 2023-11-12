import React, { createContext, useState } from "react";

export const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const [mapType, setMapType] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const [markers, setMarkers] = useState([]);

  const updateMapContextAndNavigate = (type, data, navigate) => {
    setMapType(type);
    setGeojsonData(data);
    navigate("/mapedit");
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
        markers,
        addMarker,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
