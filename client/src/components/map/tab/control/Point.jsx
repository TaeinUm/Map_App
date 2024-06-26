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

const Point = () => {
  const { mapId, setMapId } = useContext(MapContext);
  const { userId, username } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pointColor, setPointColor] = useState("#FF5733");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const fileInputRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v11"
  );

  const [tabValue, setTabValue] = useState("1");
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const [locations, setLocations] = useState([
    { latitude: "", longitude: "", name: "" },
  ]);

  const applyChange = (newLocations, newPointColor) => {
    setUndoStack([
      ...undoStack,
      { locations: locations, pointColor: pointColor },
    ]);
    setRedoStack([]);
    setLocations(newLocations);
    setPointColor(newPointColor);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setRedoStack([
        ...redoStack,
        { locations: locations, pointColor: pointColor },
      ]);
      setUndoStack(undoStack.slice(0, -1));
      setLocations(previousState.locations);
      colorChange(previousState.pointColor);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack([
        ...undoStack,
        { locations: locations, pointColor: pointColor },
      ]);
      setRedoStack(redoStack.slice(0, -1));
      setLocations(nextState.locations);
      colorChange(nextState.pointColor);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleColorChange = (newColor) => {
    applyChange(locations, newColor);
    if (map.getLayer("point-layer")) {
      map.setPaintProperty("point-layer", "circle-color", newColor);
    }
  };

  const colorChange = (newColor) => {
    setPointColor(newColor);
    if (map.getLayer("point-layer")) {
      map.setPaintProperty("point-layer", "circle-color", newColor);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (!map) {
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
        newMap.addSource("pointmap-data", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        // Add a new layer for the points
        newMap.addLayer({
          id: "point-layer",
          type: "circle",
          source: "pointmap-data",
          maxzoom: 20,
          paint: {
            "circle-radius": {
              base: 10,
              stops: [
                [12, 2],
                [22, 180],
              ],
            },
            "circle-color": pointColor,
          },
        });

        if (mapId) {
          try {
            const data = await mapServiceAPI.getMapGraphicData(userId, mapId);
            const mapLayer = JSON.parse(data.mapData);
            if (mapLayer.locations) setLocations(mapLayer.locations);
            if (mapLayer.color) setPointColor(mapLayer.color);
            addPointsToMap(mapLayer.locations);
            newMap.setPaintProperty(
              "point-layer",
              "circle-color",
              mapLayer.color
            );
          } catch (error) {
            console.error("Error loading map graphics: ", error);
          } finally {
            setMap(newMap);
            setIsLoading(false);
          }
        } else {
          setMap(newMap);
          setIsLoading(false);
        }

        setMap(newMap);
      });
    }

    setIsLoading(false);
  }, [map]);

  useEffect(() => {
    if (map && locations.length > 0) {
      const validLocations = locations.filter(
        (loc) => loc.latitude && loc.longitude
      );

      addPointsToMap(validLocations);
    }
  }, [locations]);

  const addPointsToMap = (location) => {
    // Check if the map has already been loaded
    if (!map) return;

    // Convert location data into GeoJSON features
    const geoJson = {
      type: "FeatureCollection",
      features: location.map((loc) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [parseFloat(loc.longitude), parseFloat(loc.latitude)],
        },
        properties: {
          title: loc.name,
          source: "pointmap-data",
          paint: {
            "circle-radius": {
              base: 10,
              stops: [
                [12, 2],
                [22, 180],
              ],
            },
            "circle-color": pointColor,
          },
        },
      })),
    };

    if (map.getSource("pointmap-data")) {
      map.getSource("pointmap-data").setData(geoJson);
    }

    setGeoJsonData(geoJson);
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

        const fileLcations = XLSX.utils.sheet_to_json(worksheet);

        fileLcations.forEach((location) => {
          if (map && location.latitude && location.longitude) {
            const newLocations = XLSX.utils
              .sheet_to_json(worksheet)
              .map((row) => ({
                latitude: row.latitude,
                longitude: row.longitude,
                name: row.name,
              }));

            applyChange(newLocations, pointColor);
          }
        });
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleInputChange = (index, e) => {
    const newLocations = [...locations];
    const value = e.target.value;
    newLocations[index][e.target.name] =
      e.target.name === "Latitude" || e.target.name === "Longitude"
        ? parseFloat(value)
        : value;
    setLocations(newLocations);
  };

  const addNewRow = () => {
    const newLocations = [
      ...locations,
      { latitude: "", longitude: "", name: "" },
    ];
    applyChange(newLocations, pointColor);
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

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const validLocations = locations.filter(
      (loc) => loc.latitude && loc.longitude
    );

    applyChange(validLocations, pointColor);
    addPointsToMap(validLocations);
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

      const mapData = {
        locations: locations,
        color: pointColor,
      };

      const mapImage = map.getCanvas().toDataURL();
      await mapServiceAPI.addMapGraphics(
        userId,
        mapId,
        titleToPut,
        versionToPut,
        privacy,
        "Point Map",
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
      ;
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
              <Box
                sx={{
                  display: "flex",
                  color: "#fafafa",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Typography>Select Point Color: </Typography>
                <input
                  type="color"
                  value={pointColor}
                  onChange={(e) => {
                    handleColorChange(e.target.value);
                  }}
                />
              </Box>
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

export default Point;
