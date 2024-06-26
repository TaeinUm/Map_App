import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as mapboxgl from "mapbox-gl";
import {
  Box,
  Button,
  Typography,
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

import { MapContext } from "../../../../contexts/MapContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";

import SaveTab from "../SaveTab";
import TabMenu from "../../editmap/TabMenu";

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

const ThreeD = () => {
  const [map, setMap] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapContainer = useRef(null);
  const fileInputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/light-v11");

  const { mapId, setMapId } = useContext(MapContext);
  const { userId, username } = useContext(AuthContext);

  const [tabValue, setTabValue] = useState("1");
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const [locations, setLocations] = useState([
    { latitude: "", longitude: "", value: "" },
  ]);

  const applyChange = (newState) => {
    setUndoStack([...undoStack, locations]);
    setRedoStack([]);
    setLocations(newState);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setRedoStack([...redoStack, locations]);
      setUndoStack(undoStack.slice(0, -1));
      setLocations(previousState);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack([...undoStack, locations]);
      setRedoStack(redoStack.slice(0, -1));
      setLocations(nextState);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [-74.006, 40.7128],
        zoom: 4,
        pitch: 45,
        bearing: -17.6,
        antialias: true,
        preserveDrawingBuffer: true,
      });

      newMap.addControl(new mapboxgl.FullscreenControl());
      newMap.addControl(new mapboxgl.NavigationControl());

      newMap.on("load", async () => {
        newMap.addSource("3d-data", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        newMap.addLayer({
          id: "3d-bars",
          type: "fill-extrusion",
          source: "3d-data",
          paint: {
            "fill-extrusion-color": "blue",
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0.6,
          },
        });

        if (mapId) {
          try {
            const data = await mapServiceAPI.getMapGraphicData(userId, mapId);
            const mapLayer = JSON.parse(data.mapData);
            setLocations(mapLayer);
          } catch (error) {
            console.error("Error loading map graphics: ", error);
          }
        }

        setMap(newMap);
        setIsMapLoaded(true);
      });
    }
  }, [map, mapStyle]);

  const handleFileInputChange = (e) => {
    if (!isMapLoaded) {
      alert("Map is still loading. Please wait.");
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const locations = XLSX.utils.sheet_to_json(worksheet);
        const newLocations = XLSX.utils.sheet_to_json(worksheet).map((row) => ({
          latitude: row.latitude,
          longitude: row.longitude,
          value: row.value,
        }));

        applyChange(newLocations);

        const features = locations.map((location) => {
          const height = location.value * 50;
          const deltaLon = 0.09;
          const deltaLat = 0.09;

          // Create polygon coordinates
          const coordinates = [
            [
              parseFloat(location.longitude) - deltaLon,
              parseFloat(location.latitude) - deltaLat,
            ],
            [
              parseFloat(location.longitude) + deltaLon,
              parseFloat(location.latitude) - deltaLat,
            ],
            [
              parseFloat(location.longitude) + deltaLon,
              parseFloat(location.latitude) + deltaLat,
            ],
            [
              parseFloat(location.longitude) - deltaLon,
              parseFloat(location.latitude) + deltaLat,
            ],
            [
              parseFloat(location.longitude) - deltaLon,
              parseFloat(location.latitude) - deltaLat,
            ],
          ];
          return {
            type: "Feature",
            properties: {
              source: "3d-data",
              height: height,
            },
            geometry: {
              type: "Polygon",
              coordinates: [coordinates],
            },
          };
        });

        const geojsonData = {
          type: "FeatureCollection",
          features,
        };

        setGeoJsonData(geojsonData);

        if (map && map.getSource("3d-data")) {
          map.getSource("3d-data").setData(geojsonData);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSave = async (title, version, privacy) => {
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

      const mapImage = map.getCanvas().toDataURL();

      await mapServiceAPI.addMapGraphics(
        userId,
        mapId, // This could be null if creating a new map
        titleToPut,
        versionToPut,
        privacy,
        "3D-Bar Map",
        JSON.stringify(locations),
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

  useEffect(() => {
    if (!map) return;

    if (map && locations.length > 0) {
      const validLocations = locations.filter(
        (loc) => loc.latitude && loc.longitude
      );

      // Convert locations to GeoJSON features
      const features = validLocations.map((location) => {
        const height = location.value * 50;
        const deltaLon = 0.09;
        const deltaLat = 0.09;

        // Create polygon coordinates
        const coordinates = [
          [
            parseFloat(location.longitude) - deltaLon,
            parseFloat(location.latitude) - deltaLat,
          ],
          [
            parseFloat(location.longitude) + deltaLon,
            parseFloat(location.latitude) - deltaLat,
          ],
          [
            parseFloat(location.longitude) + deltaLon,
            parseFloat(location.latitude) + deltaLat,
          ],
          [
            parseFloat(location.longitude) - deltaLon,
            parseFloat(location.latitude) + deltaLat,
          ],
          [
            parseFloat(location.longitude) - deltaLon,
            parseFloat(location.latitude) - deltaLat,
          ],
        ];

        // Return GeoJSON feature
        return {
          type: "Feature",
          properties: {
            source: "3d-data",
            height: height,
          },
          geometry: {
            type: "Polygon",
            coordinates: [coordinates],
          },
        };
      });

      // Create GeoJSON object
      const geojsonData = {
        type: "FeatureCollection",
        features,
      };

      setGeoJsonData(geojsonData);

      // Update map source with new data
      if (map && map.getSource("3d-data")) {
        map.getSource("3d-data").setData(geojsonData);
      }
    }
  }, [map, locations]);

  const handleInputChange = (index, e) => {
    const newLocations = [...locations];
    const value = e.target.value;
    newLocations[index][e.target.name] = parseFloat(value);
    setLocations(newLocations);
  };

  const addNewRow = () => {
    const newLocations = [
      ...locations,
      { latitude: "", longitude: "", value: "" },
    ];
    applyChange(newLocations);
    setLocations(newLocations);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isMapLoaded) {
      alert("Map is still loading. Please wait.");
      return;
    }

    if (map && locations.length > 0) {
      const validLocations = locations.filter(
        (loc) => loc.latitude && loc.longitude
      );

      // Convert locations to GeoJSON features
      const features = validLocations.map((location) => {
        const height = location.value * 50;
        const deltaLon = 0.09;
        const deltaLat = 0.09;

        // Create polygon coordinates
        const coordinates = [
          [
            parseFloat(location.longitude) - deltaLon,
            parseFloat(location.latitude) - deltaLat,
          ],
          [
            parseFloat(location.longitude) + deltaLon,
            parseFloat(location.latitude) - deltaLat,
          ],
          [
            parseFloat(location.longitude) + deltaLon,
            parseFloat(location.latitude) + deltaLat,
          ],
          [
            parseFloat(location.longitude) - deltaLon,
            parseFloat(location.latitude) + deltaLat,
          ],
          [
            parseFloat(location.longitude) - deltaLon,
            parseFloat(location.latitude) - deltaLat,
          ],
        ];

        // Return GeoJSON feature
        return {
          type: "Feature",
          properties: {
            height: height,
          },
          geometry: {
            type: "Polygon",
            coordinates: [coordinates],
          },
        };
      });

      // Create GeoJSON object
      const geojsonData = {
        type: "FeatureCollection",
        features,
      };

      applyChange(validLocations);

      // Update map source with new data
      if (map && map.getSource("3d-data")) {
        map.getSource("3d-data").setData(geojsonData);
      }
    }
  };

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
      {!isMapLoaded && (
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
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}
              >
                <Button
                  onClick={undo}
                  disabled={undoStack.length === 0}
                  sx={{ background: "#fafafa" }}
                >
                  Undo
                </Button>
                <Button
                  onClick={redo}
                  disabled={redoStack.length === 0}
                  sx={{ background: "#fafafa" }}
                >
                  Redo
                </Button>
              </Box>
              <Typography sx={{ color: "#fafafa", marginBottom: "30px" }}>
                Choose an EXCEL file that contains 'latitude,' 'longitude,'
                'name,' and 'value' columns
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
            </Box>
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

export default ThreeD;
