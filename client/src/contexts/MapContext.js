import React, { createContext, useState } from "react";

export const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const [mapLink, setMapLink] = useState(""); // the URL of the current working map graphics edit
  const [mapType, setMapType] = useState(null); // 
  const [mapLayer, setMapLayer] = useState(null);
  const [memoContent, setMemoContent] = useState("");
  const [geojsonData, setGeojsonData] = useState(null);

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
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
