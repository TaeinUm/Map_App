import React, { createContext, useState } from "react";

export const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const [mapType, setMapType] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);

  const updateMapContextAndNavigate = (type, data, navigate) => {
    setMapType(type);
    setGeojsonData(data);
    navigate("/mapedit");
  };

  return (
    <MapContext.Provider
      value={{
        mapType,
        setMapType,
        geojsonData,
        setGeojsonData,
        updateMapContextAndNavigate,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
