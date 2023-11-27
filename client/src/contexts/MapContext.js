import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import mapServiceAPI from "../api/mapServiceAPI";

export const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const [mapLink, setMapLink] = useState(""); // the URL of the current working map graphics edit
  const [mapType, setMapType] = useState(null); //
  const [memoContent, setMemoContent] = useState("");
  const [mapId, setMapId] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const { userId, username } = useContext(AuthContext);

  const updateMapContextAndNavigate = (id, type, data, navigate) => {
    setMapId(id);
    setMapType(type);
    setGeojsonData(data); // this should be mapLayer
    if (id === null) {
      mapServiceAPI.updateUserMapGraphics(userId, username, type, data, id);
    }
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
        mapId,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
