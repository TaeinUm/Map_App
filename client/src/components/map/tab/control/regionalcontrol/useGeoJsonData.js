import { useState, useEffect } from "react";

const useGeoJsonData = (driveFileId) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Dynamically import the GeoJSON data
    const loadData = async () => {
      try {
        const response = await fetch(
          `https://drive.google.com/uc?id=${driveFileId}`
        );
        const geojsonData = await response.json();
        setData(geojsonData);
      } catch (error) {
        console.error("Could not load GeoJSON data:", error);
      }
    };

    loadData();
  }, [driveFileId]);

  return data;
};

export default useGeoJsonData;
