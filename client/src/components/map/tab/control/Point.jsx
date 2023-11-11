import React, { useState, useContext } from "react";
import * as XLSX from "xlsx";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { MapContext } from "../../../../contexts/MapContext";

const Point = () => {
  const { setGeojsonData } = useContext(MapContext);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const newGeojsonData = {
      type: "FeatureCollection",
      features: [],
    };

    for (const address of jsonData) {
      const query = address["Address Column Name"]; // replace 'Address Column Name' with the actual column name from your Excel file
      const geocoder = new MapboxGeocoder({
        accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN, // make sure to use your Mapbox access token
        query,
      });

      geocoder.on("result", (e) => {
        const { result } = e;
        const location = result.geometry.coordinates;
        const feature = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: location,
          },
        };
        newGeojsonData.features.push(feature);
      });
    }

    setGeojsonData(newGeojsonData); // Update the geojson data in context
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload and Generate Map</button>
    </div>
  );
};

export default Point;
