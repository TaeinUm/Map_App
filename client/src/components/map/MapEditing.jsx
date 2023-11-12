import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Tab, Tabs, Box, Button } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Memo from "./Memo";
import MapContainer from "./MapContainer";

import JSONTab from "./tab/JSONTab";
import ShareTab from "./tab/ShareTab";
import SaveTab from "./tab/SaveTab";
import StylesTab from "./tab/StylesTab";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [fontStyle, setFontStyle] = useState("Arial Unicode MS Bold");
  const [styleSettings, setStyleSettings] = useState({
    visibility: {
      water: true,
      parks: true,
      buildings: true,
      roads: true,
      labels: true,
      background: true,
      streets: true,
      transit: true,
      landuse: true,
      waterway: true,
      boundary: true,
    },
    color: {
      water: "#DBE2E6",
      parks: "#E6EAE9",
      buildings: "#c0c0c8",
      roads: "#ffffff",
      labels: "#78888a",
      background: "#EBF0F0",
      streets: "#ffeda0",
      transit: "#ff9999",
      landuse: "#d2f53c",
      waterway: "#b3cde3",
      boundary: "#f03b20",
    },
  });
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v11"
  );
  const [tabValue, setTabValue] = useState("1");
  const [mapJson, setMapJson] = useState({});
  const [isMemoVisible, setIsMemoVisible] = useState(false);
  const [memoContent, setMemoContent] = useState("");
  const [regionColor, setRegionColor] = useState("#FF5733");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [log, setLog] = useState([]);

  const [selectionType, setSelectionType] = useState("country");
  const countries = ["USA", "CAN", "MEX"];
  const [continents, setContinents] = useState({
    africa: [
      "AGO",
      "BDI",
      "BEN",
      "BFA",
      "BWA",
      "CAF",
      "CMR",
      "COD",
      "COG",
      "CIV",
      "COM",
      "DJI",
      "EGY",
      "ERI",
      "ETH",
      "GAB",
      "GMB",
      "GHA",
      "GIN",
      "GMB",
      "GNB",
      "GQE",
      "KEN",
      "LBR",
      "LSO",
      "MLI",
      "MRT",
      "MWI",
      "NAM",
      "NER",
      "NGA",
      "RWA",
      "SEN",
      "SLE",
      "SOM",
      "SSD",
      "STP",
      "SWZ",
      "TZA",
      "UGA",
      "ZAF",
      "ZMB",
      "ZWE",
    ],
    asia: [
      "AFG",
      "AZE",
      "BGD",
      "BHR",
      "BRN",
      "BTN",
      "CHN",
      "COK",
      "IND",
      "IDN",
      "IRN",
      "IRQ",
      "ISR",
      "JPN",
      "JOR",
      "KAZ",
      "KHM",
      "KIR",
      "KWT",
      "LAO",
      "LBN",
      "LKA",
      "MAC",
      "MAL",
      "MMR",
      "MNG",
      "MYS",
      "NPL",
      "OMN",
      "PAK",
      "PHL",
      "QAT",
      "RUS",
      "SAU",
      "SGP",
      "KOR",
      "SRI",
      "SYR",
      "TJK",
      "THA",
      "TLS",
      "TKM",
      "TUR",
      "UZB",
      "VNM",
      "YEM",
    ],
    europe: [
      "ALB",
      "AND",
      "AUT",
      "AZE",
      "BEL",
      "BIH",
      "BLR",
      "BGR",
      "CYP",
      "CZE",
      "DNK",
      "EST",
      "FIN",
      "FRA",
      "GEO",
      "DEU",
      "GIB",
      "GRC",
      "HRV",
      "HUN",
      "IRL",
      "ISL",
      "ITA",
      "KAZ",
      "KGZ",
      "LVA",
      "LIE",
      "LTU",
      "LUX",
      "MDA",
      "MCO",
      "MKD",
      "MLT",
      "MNE",
      "NOR",
      "NLD",
      "POL",
      "PRT",
      "ROU",
      "RUS",
      "SMR",
      "SRB",
      "SVK",
      "SVN",
      "SWE",
      "TUR",
      "UKR",
      "UZB",
    ],
    north_america: ["CAN", "MEX", "USA"],
    south_america: [
      "ARG",
      "BOL",
      "BRA",
      "CHL",
      "COL",
      "CRI",
      "CUB",
      "ECU",
      "SLV",
      "GUY",
      "GTM",
      "HND",
      "MEX",
      "NIC",
      "PAN",
      "PAR",
      "PER",
      "PRY",
      "URY",
      "VEN",
    ],
    australia_oceania: [
      "AUS",
      "FJI",
      "KIR",
      "NCL",
      "PNG",
      "NZL",
      "PLW",
      "SAM",
      "SOL",
      "TUV",
      "WLF",
    ],
  });

  const layerSelector = {
    background: /background/,
    water: /water/,
    parks: /park/,
    buildings: /building/,
    roads: /road|bridge|tunnel/,
    labels: /label|place|poi/,
    streets: /street/,
    transit: /transit/,
    landuse: /landuse/,
    waterway: /waterway/,
    boundary: /boundary/,
  };

  const categories = [
    "water",
    "parks",
    "buildings",
    "roads",
    "labels",
    "background",
    "streets",
    "transit",
    "landuse",
    "waterway",
    "boundary",
  ];

  const colorClass = {
    fill: "fill-color",
    line: "line-color",
    symbol: "text-color",
    background: "background-color",
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleJsonChange = (json) => {
    setMapJson(json.jsObject);
  };

  const saveJson = () => {
    try {
      map.setStyle(mapJson);
      alert("Successfully saved!");
    } catch (error) {
      alert("Invalid JSON!");
    }
  };

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current, // mapContainer ref를 사용하여 지도 컨테이너를 설정
        style: mapStyle,
        center: [-74.006, 40.7128],
        zoom: 2,
      });

      newMap.on("load", () => {
        newMap.addLayer({
          id: "country-boundaries",
          type: "fill",
          source: {
            type: "vector",
            url: "mapbox://mapbox.country-boundaries-v1",
          },
          "source-layer": "country_boundaries",
          paint: {
            "fill-opacity": 0,
          },
        });

        newMap.on("click", "country-boundaries", function (e) {
          const countryCode = e.features[0].properties.iso_3166_1_alpha_3;
          const countryName = e.features[0].properties.name;

          newMap.setFilter("country-boundaries", [
            "==",
            ["get", "iso_3166_1_alpha_3"],
            countryCode,
          ]);

          newMap.setPaintProperty(
            "country-boundaries",
            "fill-color",
            regionColor
          );

          setSelectedCountry(countryName);
        });

        setMap(newMap);
        newMap.resize();
      });
    };
    initializeMap();
  }, [mapStyle, regionColor, setMap, setSelectedCountry]);

  useEffect(() => {
    if (!map || !map.getStyle) {
      return;
    }

    const layers = map.getStyle().layers;

    layers.forEach((layer) => {
      const id = layer.id;
      const type = layer.type;

      for (const category of categories) {
        if (layerSelector[category].test(id)) {
          console.log(`Background layer found: ${id}, type: ${type}`);
          const isVisible = styleSettings.visibility[category];
          map.setLayoutProperty(
            id,
            "visibility",
            isVisible ? "visible" : "none"
          );
          const colorProperty = colorClass[type];
          if (colorProperty) {
            map.setPaintProperty(
              id,
              colorProperty,
              styleSettings.color[category]
            );
          }
          break;
        }
      }
    });
    if (map) {
      setMapJson(map.getStyle());
    }
  }, [map, mapStyle, styleSettings]);

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128],
      zoom: 2,
    });

    newMap.on("load", () => {
      newMap.addSource("countries", {
        type: "vector",
        url: "mapbox://mapbox.country-boundaries-v1",
      });

      newMap.addLayer({
        id: "countries",
        type: "fill",
        source: "countries",
        "source-layer": "country_boundaries",
        paint: {
          "fill-color": "#FFFFFF",
          "fill-opacity": 0.4,
        },
      });

      setMap(newMap);
    });

    return () => newMap.remove();
  }, []);

  useEffect(() => {
    if (map && log.length > 0) {
      const colorExpression = ["match", ["get", "iso_3166_1_alpha_3"]];
      const uniqueCountries = new Set();

      log.forEach((entry) => {
        if (entry.country && !uniqueCountries.has(entry.country)) {
          colorExpression.push(entry.country, entry.color);
          uniqueCountries.add(entry.country);
        } else if (entry.continent) {
          continents[entry.continent].forEach((country) => {
            if (!uniqueCountries.has(country)) {
              colorExpression.push(country, entry.color);
              uniqueCountries.add(country);
            }
          });
        }
      });
      colorExpression.push("#FFFFFF");

      map.setPaintProperty("countries", "fill-color", colorExpression);
    }
  }, [map, log]);

  const handleSelectionTypeChange = (event) => {
    setSelectionType(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const updateMapColors = () => {
    if (map) {
      const countryLayer = map.getLayer("countries");
      if (countryLayer) {
        const colorExpression = ["match", ["get", "iso_3166_1_alpha_3"]];

        if (log.length === 0) {
          colorExpression.push("XXX", "#FFFFFF");
        } else {
          log.forEach(({ country, color }) => {
            colorExpression.push(country, color);
          });
        }

        colorExpression.push("#FFFFFF");

        console.log(colorExpression);

        map.setPaintProperty("countries", "fill-color", colorExpression);
      }
    }
  };

  const updateCountryColor = () => {
    const updatedLog = log.filter((entry) => entry.country !== selectedCountry);
    updatedLog.push({ country: selectedCountry, color: color });

    setLog(updatedLog);
    updateMapColors(updatedLog);
  };

  const handleContinentSelect = (continent) => {
    const countriesInContinent = continents[continent];
    if (!countriesInContinent || countriesInContinent.length === 0) {
      console.error(`No countries found for continent: ${continent}`);
      return;
    }

    const updatedLog = log.filter((entry) => entry.continent !== continent);

    updatedLog.push({ continent, color });

    setLog(updatedLog);
    updateContColors();
  };

  const updateContColors = () => {
    if (mapContainer) {
      const colorExpression = ["match", ["get", "iso_3166_1_alpha_3"]];

      const uniqueCountries = new Set();

      if (log.length === 0) {
        colorExpression.push("XXX", "#FFFFFF");
      } else {
        log.forEach((entry) => {
          if (entry.country && !uniqueCountries.has(entry.country)) {
            colorExpression.push(entry.country, entry.color);
            uniqueCountries.add(entry.country);
          } else if (entry.continent) {
            continents[entry.continent].forEach((country) => {
              if (!uniqueCountries.has(country)) {
                colorExpression.push(country, entry.color);
                uniqueCountries.add(country);
              }
            });
          }
        });
      }

      colorExpression.push("#FFFFFF");
      map.setPaintProperty("countries", "fill-color", colorExpression);
    }
  };

  const toggleMemo = () => {
    setIsMemoVisible(!isMemoVisible);
  };

  const handleMemoSave = () => {
    console.log("Memo saved:", memoContent);
    // Memo save logic here...
  };

  const handleCategoryColor = (category, color) => {
    setStyleSettings((prevSettings) => ({
      ...prevSettings,
      color: { ...prevSettings.color, [category]: color },
    }));
  };

  const handleFontChange = (newFont) => {
    setFontStyle(newFont);
    if (!map) return;

    const layers = map.getStyle().layers;

    layers.forEach((layer) => {
      if (
        layer.type === "symbol" &&
        layer.layout &&
        layer.layout["text-field"]
      ) {
        map.setLayoutProperty(layer.id, "text-font", [newFont]);
      }
    });
  };

  const handleVisibilityChange = (category, isVisible) => {
    setStyleSettings((prevSettings) => ({
      ...prevSettings,
      visibility: {
        ...prevSettings.visibility,
        [category]: isVisible,
      },
    }));
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "100%" }}
      />
      ;
      <Box sx={{ width: "30%" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              variant="fullWidth"
              value={tabValue}
              onChange={handleTabChange}
              aria-label="map tabs"
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab
                label="Styles"
                value="1"
                sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
              />
              <Tab
                label="JSON"
                value="2"
                sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
              />
              <Tab
                label="Share"
                value="3"
                sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
              />
              <Tab
                label="Save"
                value="4"
                sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
              />
            </Tabs>
          </Box>
          <TabPanel value="1">
            <StylesTab
              categories={categories}
              styleSettings={styleSettings}
              handleColorChange={handleColorChange}
              handleVisibilityChange={handleVisibilityChange}
              fontStyle={fontStyle}
              handleFontChange={handleFontChange}
              regionColor={regionColor}
              setRegionColor={setRegionColor}
              selectedCountry={selectedCountry}
              selectionType={selectionType}
              handleSelectionTypeChange={handleSelectionTypeChange}
              color={color}
              handleCategoryColor={handleCategoryColor}
              handleCountryChange={handleCountryChange}
              log={log}
              handleContinentSelect={handleContinentSelect}
              updateCountryColor={updateCountryColor}
              countries={countries}
            />
          </TabPanel>
          <TabPanel value="2">
            <JSONTab
              mapJson={mapJson}
              handleJsonChange={handleJsonChange}
              saveJson={saveJson}
            />
          </TabPanel>
          <TabPanel value="3">
            <ShareTab />
          </TabPanel>
          <TabPanel value="4">
            <SaveTab />
          </TabPanel>
          <Button
            sx={{ width: "100%", height: "20px", backgroundColor: "grey" }}
            onClick={toggleMemo}
          >
            {isMemoVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>
          {isMemoVisible && <Memo />}
        </TabContext>
      </Box>
    </Box>
  );
};

export default MapComponent;

/*
import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import {
  Tab,
  Tabs,
  Box,
  TextField,
  Button,
  Divider,
  Typography,
  MenuItem,
} from "@mui/material";
import Memo from "./Memo";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const countryCityData = {
    USA: ["New York", "Los Angeles", "Chicago"],
    KOR: ["Seoul", "Busan", "Incheon"],
    FRA: ["Paris", "Lyon", "Marseille"],
  };

  const countryCityCoordinates = {
    USA: {
      "New York": { lat: 40.6413, lng: -73.7781 },
      "Los Angeles": { lat: 33.9416, lng: -118.4085 },
      Chicago: { lat: 41.9742, lng: -87.9073 },
    },
    KOR: {
      Seoul: { lat: 37.5591, lng: 126.7942 },
      Busan: { lat: 35.1795, lng: 128.9382 },
      Incheon: { lat: 37.4602, lng: 126.4407 },
    },
    FRA: {
      Paris: { lat: 49.0097, lng: 2.5479 },
      Lyon: { lat: 45.7219, lng: 5.081 },
      Marseille: { lat: 43.4369, lng: 5.2153 },
    },
  };

  const [regionColor, setRegionColor] = useState("#FF5733");
  const mapContainer = useRef();
  const [memo, setMemo] = useState("");
  const [flows, setFlows] = useState([]);

  const [startCountry, setStartCountry] = useState("");
  const [startCity, setStartCity] = useState("");
  const [endCountry, setEndCountry] = useState("");
  const [endCity, setEndCity] = useState("");

  const handleStartCountryChange = (event) => {
    setStartCountry(event.target.value);
    setStartCity("");
  };

  const handleStartCityChange = (event) => {
    setStartCity(event.target.value);
  };

  const handleEndCountryChange = (event) => {
    setEndCountry(event.target.value);
    setEndCity("");
  };

  const handleEndCityChange = (event) => {
    setEndCity(event.target.value);
  };

  useEffect(() => {
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.006, 40.7128],
        zoom: 2,
      });

      newMap.on("load", () => {
        newMap.addLayer({
          id: "country-boundaries",
          type: "fill",
          source: {
            type: "vector",
            url: "mapbox://mapbox.country-boundaries-v1",
          },
          "source-layer": "country_boundaries",
          paint: {
            "fill-opacity": 0,
          },
        });

        setMap(newMap);
      });
    }
  }, [map]);

  const drawFlow = () => {
    if (startCountry && startCity && endCountry && endCity) {
      const startPoint = [
        countryCityCoordinates[startCountry][startCity].lng,
        countryCityCoordinates[startCountry][startCity].lat,
      ];
      const endPoint = [
        countryCityCoordinates[endCountry][endCity].lng,
        countryCityCoordinates[endCountry][endCity].lat,
      ];

      const flowId = `flow-${Date.now()}`;

      if (!map.getLayer(flowId)) {
        map.addLayer({
          id: flowId,
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: [startPoint, endPoint],
                  },
                },
              ],
            },
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": regionColor,
            "line-width": 5,
          },
        });
      }

      const flowLog = `${startCountry}, ${startCity} -> ${endCountry}, ${endCity}`;
      setMemo((prevMemo) => (prevMemo ? `${prevMemo}\n${flowLog}` : flowLog));

      setFlows((prevFlows) => [...prevFlows, { id: flowId, log: flowLog }]);

      setStartCountry("");
      setStartCity("");
      setEndCountry("");
      setEndCity("");
    }
  };
  return (
    <div>
      <div ref={mapContainer} style={{ height: "500px" }} />
      <div>
        <TextField
          select
          label="Choose Start Country"
          value={startCountry}
          onChange={handleStartCountryChange}
          helperText="Please select the start country"
        >
          {Object.keys(countryCityData).map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Choose Start City"
          value={startCity}
          onChange={handleStartCityChange}
          helperText="Please select the start city"
          disabled={!startCountry}
        >
          {startCountry
            ? countryCityData[startCountry].map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))
            : []}
        </TextField>

        <TextField
          select
          label="Choose End Country"
          value={endCountry}
          onChange={handleEndCountryChange}
          helperText="Please select the end country"
        >
          {Object.keys(countryCityData).map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Choose End City"
          value={endCity}
          onChange={handleEndCityChange}
          helperText="Please select the end city"
          disabled={!endCountry}
        >
          {endCountry
            ? countryCityData[endCountry].map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))
            : []}
        </TextField>

        <Button onClick={drawFlow}>Draw Flow</Button>
      </div>

      <Typography>{memo}</Typography>

      <Typography variant="h6">Flows:</Typography>
      <ul>
        {flows.map((flow) => (
          <li key={flow.id}>{flow.log}</li>
        ))}
      </ul>
    </div>
  );
};

export default MapComponent;
*/
