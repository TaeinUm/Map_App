import geojsonData from "../geojson/countries.geo.json";

const extract = (styleSettings) => {
  const filterGeoJsonData = (geojsonData, countryCodes, colorMap, opacity) => {
    const filteredFeatures = geojsonData.features
      .filter((feature) => countryCodes.includes(feature.id))
      .map((feature) => ({
        ...feature,
        properties: {
          ...feature.properties,
          type: "fill",
          paint: {
            "fill-color": colorMap[feature.id],
            "fill-opacity": opacity,
          },
        },
      }));

    return {
      type: "FeatureCollection",
      features: filteredFeatures,
    };
  };

  const selectedCountries = styleSettings.log.map((entry) => entry.region);
  const colorMap = styleSettings.log.reduce((map, entry) => {
    map[entry.region] = entry.color;
    return map;
  }, {});

  return filterGeoJsonData(
    geojsonData,
    selectedCountries,
    colorMap,
    styleSettings.opacity
  );
};

export default extract;
