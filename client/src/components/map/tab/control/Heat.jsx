import React, { useEffect, useState, useRef, useContext } from "react";
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
  const { mapId } = useContext(MapContext);
  const { userId, username } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLayers, setInitializeLayers] = useState(null);
  const [mapLayer, setMapLayer] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const fileInputRef = useRef(null);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/dark-v11");

  const [tabValue, setTabValue] = useState("1");
  const [geoJsonData, setGeoJsonData] = useState(null);

  const [locations, setLocations] = useState([
    { latitude: "", longitude: "", name: "" },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setIsLoading(true);
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [-74.006, 40.7128],
        zoom: 2,
      });
      newMap.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        })
      );

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
            const data = await mapServiceAPI.getMapGraphicData(userId, mapId);
            const mapLayer = data.mapLayer;

            if (mapLayer && data.mapType) {
              newMap.addLayer(mapLayer);
            } else {
              console.error("Invalid map layer data");
            }
          } catch (error) {
            console.error("Error loading map graphics: ", error);
          }
        }

        setMap(newMap);
        const initialLayers = newMap.getStyle().layers.map((layer) => layer.id);
        setInitializeLayers(initialLayers);
      });
    }
    if (map) {
      const currentLayers = map.getStyle().layers;
      const addedLayers = currentLayers.filter(
        (layer) => !initialLayers.includes(layer.id)
      );
      const addedLayersJson = JSON.stringify(addedLayers, null, 2);
      setMapLayer(addedLayersJson);
    }
    setIsLoading(false);
  }, [map]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const locations = XLSX.utils.sheet_to_json(worksheet);

        const geojsonData = {
          type: "FeatureCollection",
          features: locations.map((location) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [location.longitude, location.latitude],
            },
            properties: {
              intensity: location.value,
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
      await mapServiceAPI.addMapGraphics(
        userId,
        username,
        mapId, // This could be null if creating a new map
        title,
        version,
        privacy,
        "Heat Map",
        mapLayer
      );
      alert("Map saved successfully");
    } catch (error) {
      console.error("Error saving map:", error);
      alert("Error saving map");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
          intensity: parseFloat(location.value),
        },
      })),
    };

    if (map && map.getSource("heatmap-data")) {
      map.getSource("heatmap-data").setData(geojsonData);
    }
  };

  const handleInputChange = (index, e) => {
    const newLocations = [...locations];
    newLocations[index][e.target.name] = e.target.value;
    setLocations(newLocations);
  };

  const addNewRow = () => {
    setLocations([...locations, { latitude: "", longitude: "", name: "" }]);
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
          name="value"
          value={location.value}
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
                Or Simply fill up 'latitude,' 'longitude,' and 'value' of the
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
                        Value
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{locations.map(renderRow)}</TableBody>
                </Table>
                <Button onClick={addNewRow}>+ Add Row</Button>
                <Button type="submit">Submit</Button>
              </form>
              {map && <HeatmapColorPicker map={map} />}
            </Container>
          </TabPanel>
          {/*<TabPanel value="2">
            <ShareTab />
          </TabPanel>*/}
          <TabPanel value="3">
            <SaveTab
              onSave={handleSave}
              mapLayer={mapLayer}
              geojson={geoJsonData}
            />
          </TabPanel>
          {/*{isMemoVisible && <Memo mapId={""} />}
          <Button
            sx={{
              width: "100%",
              height: "20px",
              borderRadius: "0",
              backgroundColor: "grey",
            }}
            onClick={toggleMemo}
          >
            {isMemoVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button> */}
        </TabContext>
      </Box>
    </Box>
  );
};

export default Heat;
