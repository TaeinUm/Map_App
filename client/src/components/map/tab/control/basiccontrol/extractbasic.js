import groundData from "../geojson/earth-lands.geo.json";
import waterwayData from "../geojson/earth-rivers.geo.json";
import waterData from "../geojson/earth-waterbodies.geo.json";

const convertGeometryToFeatures = (geometryData) => {
  return geometryData.geometries.map((geometry) => {
    return {
      type: "Feature",
      geometry: geometry,
    };
  });
};

const processGeoJsonData = (geojsonData, settings, category) => {
  if (!geojsonData) {
    return { type: "FeatureCollection", features: [] };
  }

  let features =
    geojsonData.type === "GeometryCollection"
      ? convertGeometryToFeatures(geojsonData)
      : geojsonData.features;

  return {
    type: "FeatureCollection",
    features: features.map((feature) => {
      const type = feature.properties?.type || "fill";
      const color = settings.color[category] || "#FFFFFF";

      return {
        ...feature,
        properties: {
          ...feature.properties,
          type,
          source: category,
          paint: {
            "fill-color": color,
            "fill-opacity": 0.1,
          },
        },
      };
    }),
  };
};

const extractbasic = (geojsonData, styleSettings) => {
  if (!styleSettings || !geojsonData) {
    return {};
  }

  const data = {
    water: waterData,
    background: groundData,
    waterway: waterwayData,
  };

  let mergedFeatures = [...geojsonData.features];

  // visibility
  Object.keys(styleSettings.visibility).forEach((category) => {
    if (styleSettings.visibility[category]) {
      const categoryData = category === "labels" ? geojsonData : data[category];
      const processedData = processGeoJsonData(
        categoryData,
        styleSettings,
        category
      );
      mergedFeatures = mergedFeatures.concat(processedData.features);
    }
  });

  return {
    type: "FeatureCollection",
    features: mergedFeatures,
  };
};

export default extractbasic;
