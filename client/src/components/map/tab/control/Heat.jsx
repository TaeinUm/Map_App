import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { useMediaQuery, useTheme } from "@mui/material";

import * as XLSX from "xlsx";
import { AuthContext } from "../../../../contexts/AuthContext";
import { MapContext } from "../../../../contexts/MapContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";

import SaveTab from "../SaveTab";
import TabMenu from "../../editmap/TabMenu";
import HeatmapColorPicker from "./heatcontrol/HeatmapColorPicker";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

const selectStyle = {
  width: "80px",
  ".MuiInputBase-input": { color: "#fafafa" },
  ".MuiSelect-select": { color: "#fafafa" },
  ".MuiOutlinedInput-notchedOutline": { borderColor: "#fafafa" },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fafafa",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fafafa",
  },
  "& .MuiSvgIcon-root": {
    color: "#fafafa",
  },
  borderTop: "1px solid #fafafa",
};

const Heat = () => {
  const { mapId, setMapId } = useContext(MapContext);
  const { userId, username } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLayers, setInitializeLayers] = useState(null);
  const [mapLayer, setMapLayer] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const fileInputRef = useRef(null);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/dark-v11");

  const [tabValue, setTabValue] = useState("1");
  const [geoJsonData, setGeoJsonData] = useState(null);

  const [heatColors, setHeatColors] = useState({
    0.0: "rgba(33, 102, 172, 0)",
    0.2: "#0000FF", // Blue
    0.4: "#00FFFF", // Cyan
    0.6: "#00FF00", // Lime
    0.8: "#FFFF00", // Yellow
    1.0: "#FF0000", // Red
  });
  const [heatmapSize, setHeatmapSize] = useState(10);

  const [locations, setLocations] = useState([
    { latitude: "", longitude: "", name: "" },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleColorChange = (density, color) => {
    const numericDensity = parseFloat(density);
    setHeatColors((prevColors) => ({
      ...prevColors,
      [numericDensity]: color,
    }));
  };

  const calculateRadiusBasedOnValue = (value) => {
    return Math.min(20, Math.max(5, value));
  };

  const updateHeatmapRadius = () => {
    if (locations.length > 0) {
      const averageValue =
        locations.reduce((acc, loc) => acc + parseFloat(20 || 0), 0) /
        locations.length;
      const newRadius = calculateRadiusBasedOnValue(averageValue);

      if (map) {
        map.setPaintProperty("heatmap-layer", "heatmap-radius", newRadius);
      }
    }
  };

  useEffect(() => {
    if (!map) {
      setIsLoading(true);
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [-74.006, 40.7128],
        zoom: 2,
        preserveDrawingBuffer: true,
      });

      newMap.addControl(new mapboxgl.FullscreenControl());
      newMap.addControl(new mapboxgl.NavigationControl());

      newMap.on("load", async () => {
        newMap.addSource("heatmap-data", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });
        newMap.addLayer({
          id: "heatmap-layer",
          type: "heatmap",
          source: "heatmap-data",
          maxzoom: 20,
          paint: {
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              9,
              3,
            ],
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(0, 0, 255, 0)",
              0.1,
              "royalblue",
              0.3,
              "cyan",
              0.5,
              "lime",
              0.7,
              "yellow",
              1,
              "red",
            ],
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              9,
              20,
            ],
            "heatmap-opacity": 0.8,
          },
        });
        if (mapId) {
          try {
            // Fetch map graphics data using mapId
            const data = await mapServiceAPI.getMapGraphicData(userId, mapId);
            const mapLayer = JSON.parse(data.mapData);
            if (mapLayer.locations) setLocations(mapLayer.locations);
            if (mapLayer.heatColors) setHeatColors(mapLayer.heatColors);
            updateHeatmapColor();
            handleSubmit();
          } catch (error) {
            console.error("Error loading map graphics:", error);
          } finally {
            setMap(newMap);
            setIsLoading(false);
          }
        } else {
          setMap(newMap);
          setIsLoading(false);
        }
      });
    }
  }, [map]);

  useEffect(() => {
    updateHeatmapColor();
  }, [heatColors, map]);

  useEffect(() => {
    if (map && locations) {
      updatePoint();
      updateHeatmapRadius();
    }
  }, [locations, map]);

  useEffect(() => {
    if (geoJsonData && geoJsonData.features) {
      const updatedFeatures = geoJsonData.features.map((feature) => {
        return {
          ...feature,
          properties: {
            ...feature.properties,
            heatColors: heatColors,
          },
        };
      });

      const updatedGeoJsonData = {
        ...geoJsonData,
        features: updatedFeatures,
      };

      setGeoJsonData(updatedGeoJsonData);
    }
  }, [geoJsonData, heatColors]);

  const updatePoint = () => {
    if (!map) return;
    const geojsonData = {
      type: "FeatureCollection",
      features: locations.map((location) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(location.longitude),
            parseFloat(location.latitude),
          ],
        },
        properties: {
          title: location.name,
          source: "heatmap-data",
          heatColors: heatColors,
        },
      })),
    };

    setGeoJsonData(geojsonData);

    if (map.getSource("heatmap-data")) {
      map.getSource("heatmap-data").setData(geojsonData);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        e.preventDefault();
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const newLocations = XLSX.utils.sheet_to_json(worksheet).map((row) => ({
          latitude: row.latitude,
          longitude: row.longitude,
          name: row.name,
        }));

        setLocations(newLocations);

        const geojsonData = {
          type: "FeatureCollection",
          features: newLocations.map((location) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [location.longitude, location.latitude],
            },
            properties: {
              title: location.name,
              source: "heatmap-data",
              heatColors: heatColors,
            },
          })),
        };

        setGeoJsonData(geojsonData);

        if (map && map.getSource("heatmap-data")) {
          map.getSource("heatmap-data").setData(geojsonData);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSave = async (title, version, privacy, mapLayer) => {
    try {
      let titleToPut = title;
      let versionToPut = version;
      if (mapId) {
        const response = await mapServiceAPI.getMapGraphicData(userId, mapId);
        titleToPut = response.mapName;

        const originalVer = response.vers;
        const versionNumber = parseInt(originalVer.replace("ver", ""), 10);
        versionToPut = "ver" + (versionNumber + 1);
      }
      const mapData = {
        locations: locations,
        heatColors: heatColors,
      };

      const mapImage = map.getCanvas().toDataURL();
      await mapServiceAPI.addMapGraphics(
        userId,
        null, // This could be null if creating a new map
        titleToPut,
        versionToPut,
        privacy,
        "Heat Map",
        JSON.stringify(mapData),
        mapImage
      );
      setMapId(null);
      navigate("/map");
      alert("Map saved successfully");
    } catch (error) {
      console.error("Error saving map:", error);
      alert("Error saving map");
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    updatePoint();
  };

  const updateHeatmapColor = () => {
    const colorStops = Object.keys(heatColors)
      .sort((a, b) => parseFloat(a) - parseFloat(b))
      .map((key) => [parseFloat(key), heatColors[key]])
      .flat();

    if (map) {
      map.setPaintProperty("heatmap-layer", "heatmap-color", [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        ...colorStops,
      ]);
    }
  };

  const handleInputChange = (index, e) => {
    const newLocations = [...locations];
    newLocations[index][e.target.name] = e.target.value;
    setLocations(newLocations);
  };

  const addNewRow = () => {
    setLocations([
      ...locations,
      {
        latitude: "",
        longitude: "",
        name: "",
      },
    ]);
  };

  const renderRow = (location, index) => (
    <TableRow key={index}>
      <TableCell>
        <TextField
          type="text"
          name="latitude"
          value={location.latitude}
          onChange={(e) => handleInputChange(index, e)}
          sx={selectStyle}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="text"
          name="longitude"
          value={location.longitude}
          onChange={(e) => handleInputChange(index, e)}
          sx={selectStyle}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="text"
          name="name"
          value={location.name}
          onChange={(e) => handleInputChange(index, e)}
          sx={selectStyle}
        />
      </TableCell>
    </TableRow>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
      }}
    >
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: isMobile ? "50%" : "100%" }}
      />
      {isLoading && (
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <CircularProgress />
        </div>
      )}

      <Box
        sx={{
          width: isMobile ? "100%" : "40%",
          overflow: "scroll",
          height: isMobile ? "50%" : "auto",
        }}
      >
        <TabContext value={tabValue}>
          <TabMenu tabValue={tabValue} handleTabChange={handleTabChange} />

          <TabPanel value="1">
            <Container>
              <Typography sx={{ color: "#fafafa", marginBottom: "30px" }}>
                Choose an EXCEL file that contains 'latitude,' 'longitude,' and
                'name' columns
              </Typography>
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileInputChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => fileInputRef.current.click()}
                style={{ marginBottom: "10px" }}
                sx={{ backgroundColor: "#fafafa", color: "black" }}
              >
                Select Data File
              </Button>
              <Typography sx={{ color: "#fafafa", marginTop: "30px" }}>
                Or Simply fill up 'latitude,' 'longitude,' and 'name' of the
                location of the table below
              </Typography>
              <form onSubmit={handleSubmit} style={{ marginTop: "40px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#fafafa", fontSize: "18px" }}>
                        Latitude
                      </TableCell>
                      <TableCell sx={{ color: "#fafafa", fontSize: "18px" }}>
                        Longitude
                      </TableCell>
                      <TableCell sx={{ color: "#fafafa", fontSize: "18px" }}>
                        Name
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{locations.map(renderRow)}</TableBody>
                </Table>
                <Button onClick={addNewRow}>+ Add Row</Button>
                <Button type="submit">Submit</Button>
              </form>
              {map && (
                <HeatmapColorPicker
                  map={map}
                  heatColors={heatColors}
                  setHeatColors={handleColorChange}
                  updateHeatmapColor={updateHeatmapColor}
                />
              )}
            </Container>
          </TabPanel>
          <TabPanel value="3">
            <SaveTab
              onSave={handleSave}
              mapLayer={locations}
              map={map}
              geojson={geoJsonData}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Heat;
