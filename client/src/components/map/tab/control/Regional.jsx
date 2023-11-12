import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import {
  Tab,
  Tabs,
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Memo from "../../Memo";

import JSONTab from "../JSONTab";
import ShareTab from "../ShareTab";
import SaveTab from "../SaveTab";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ";

const Regional = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
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

  const toggleMemo = () => {
    setIsMemoVisible(!isMemoVisible);
  };

  const handleMemoSave = () => {
    console.log("Memo saved:", memoContent);
    // Memo save logic here...
  };

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
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
    if (!map) {
      initializeMap();
    }

    if (map) {
      setMapJson(map.getStyle());
    }
  }, [map, mapStyle, regionColor, setMap, setSelectedCountry]);

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
            <RadioGroup
              row
              value={selectionType}
              onChange={handleSelectionTypeChange}
              sx={{
                display: "felx",
                justifyContent: "space-evenly",
                color: "#fafafa",
                marginBottom: "30px",
              }}
            >
              <FormControlLabel
                value="country"
                control={<Radio />}
                label="Country"
              />
              <FormControlLabel
                value="continent"
                control={<Radio />}
                label="Continent"
              />
            </RadioGroup>

            {selectionType === "country" ? (
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Box
                  width="100%"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    fullWidth
                    sx={{ color: "#fafafa", textAlign: "left" }}
                  >
                    Select Region Color
                  </Typography>
                  <input
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                    style={{ marginBottom: "30px" }}
                  />
                </Box>
                <Box
                  width="100%"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    fullWidth
                    sx={{ color: "#fafafa", textAlign: "left" }}
                  >
                    Select Country
                  </Typography>
                  <Select
                    fullWidth
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    sx={{
                      marginBottom: "30px",
                      color: "white",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fafafa",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fafafa",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fafafa",
                      },
                      ".MuiSvgIcon-root ": {
                        fill: "white !important",
                      },
                    }}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Button
                  variant="contained"
                  onClick={updateCountryColor}
                  sx={{ backgroundColor: "#fafafa", color: "black" }}
                >
                  Update Color
                </Button>
              </FormControl>
            ) : (
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="color"
                  value={color}
                  onChange={handleColorChange}
                  style={{ marginBottom: "30px" }}
                />
                <Button
                  sx={{
                    width: "220px",
                    marginBottom: "30px",
                    backgroundColor: "#fafafa",
                    color: "black",
                  }}
                  variant="contained"
                  onClick={() => handleContinentSelect("north_america")}
                >
                  Update North America
                </Button>
                <Button
                  sx={{
                    width: "220px",
                    marginBottom: "30px",
                    backgroundColor: "#fafafa",
                    color: "black",
                  }}
                  variant="contained"
                  onClick={() => handleContinentSelect("asia")}
                >
                  Update Asia
                </Button>
                <Button
                  sx={{
                    width: "220px",
                    marginBottom: "30px",
                    backgroundColor: "#fafafa",
                    color: "black",
                  }}
                  variant="contained"
                  onClick={() => handleContinentSelect("europe")}
                >
                  Update Europe
                </Button>
                <Button
                  sx={{
                    width: "220px",
                    marginBottom: "30px",
                    backgroundColor: "#fafafa",
                    color: "black",
                  }}
                  variant="contained"
                  onClick={() => handleContinentSelect("africa")}
                >
                  Update Africa
                </Button>
                <Button
                  sx={{
                    width: "220px",
                    marginBottom: "30px",
                    backgroundColor: "#fafafa",
                    color: "black",
                  }}
                  variant="contained"
                  onClick={() => handleContinentSelect("south_america")}
                >
                  Update South America
                </Button>
                <Button
                  sx={{
                    width: "220px",
                    marginBottom: "30px",
                    backgroundColor: "#fafafa",
                    color: "black",
                  }}
                  variant="contained"
                  onClick={() => handleContinentSelect("australia_oceania")}
                >
                  Update Aus_Oceania
                </Button>
              </FormControl>
            )}
            <Box>
              {log.map((entry, index) =>
                entry.country ? (
                  <Typography
                    key={index}
                    sx={{ color: "#fafafa" }}
                  >{`${entry.country}: ${entry.color}`}</Typography>
                ) : (
                  <Typography
                    key={index}
                    sx={{ color: "#fafafa" }}
                  >{`${entry.continent}: ${entry.color}`}</Typography>
                )
              )}
            </Box>
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

export default Regional;
