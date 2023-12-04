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
import { MapContext } from "../../../../contexts/MapContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";

import SaveTab from "../SaveTab";
import TabMenu from "../../editmap/TabMenu";
import MarkerStylePicker from "./pointcontrol/MarkerStylePicker";

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
  const [initialLayers, setInitializeLayers] = useState(null);
  const [mapLayer, setMapLayer] = useState(null);
  const [markers, setMarkers] = useState([]);
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

  const [locations, setLocations] = useState([
    { latitude: "", longitude: "", name: "" },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const generateGeoJsonFromMarkers = (markers) => {
    const features = markers.map(({ marker, name }) => {
      return {
        type: "Feature",
        properties: {
          name: name,
        },
        geometry: {
          type: "Point",
          coordinates: [marker.getLngLat().lng, marker.getLngLat().lat],
        },
      };
    });
  
    return {
      type: "FeatureCollection",
      features,
    };
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
      newMap.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        })
      );
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

        if (mapId) {
          try {
            const data = await mapServiceAPI.getMapGraphicData(userId, mapId);
            const mapLayer = JSON.parse(data.mapData);
            if (mapLayer.locations) setLocations(mapLayer.locations);
            // newMap.addLayer(mapLayer);
          } catch (error) {
            console.error("Error loading map graphics: ", error);
          } 
          finally {
            setMap(newMap)
            setIsLoading(false)
          }
        } else {
          setMap(newMap);
          setIsLoading(false);
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

  useEffect(() => {
    if (map) {
      const newMarkers = locations.map((location) => {
        if (location.latitude && location.longitude) {
          const popup = new mapboxgl.Popup().setText(location.name);
          const marker = new mapboxgl.Marker()
            .setLngLat([location.longitude, location.latitude])
            .setPopup(popup)
            .addTo(map);
  
          return { marker, name: location.name };
        }
      }).filter(Boolean); // Filter out undefined entries
  
      setMarkers(newMarkers);
      const newGeoJsonData = generateGeoJsonFromMarkers(newMarkers);
      setGeoJsonData(newGeoJsonData);
    }
  }, [map, locations]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        e.preventDefault();
        const newMarkers = [];
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const locations = XLSX.utils.sheet_to_json(worksheet);

        const map = new mapboxgl.Map({
          container: "map",
          style: mapStyle,
          center: [-74.006, 40.7128],
          zoom: 2,
        });

        locations.forEach((location) => {
          if (map && location.latitude && location.longitude) {
            const marker = new mapboxgl.Marker()
              .setLngLat([location.longitude, location.latitude])
              .setPopup(new mapboxgl.Popup().setText(location.name))
              .addTo(map);

            newMarkers.push(marker);
          }
        });
        const newMarkersCombined = [...markers, ...newMarkers];
        setMarkers(newMarkersCombined);
        const newGeoJsonData = generateGeoJsonFromMarkers(newMarkersCombined);
        setGeoJsonData(newGeoJsonData);
      };

      reader.readAsArrayBuffer(file);
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
          name="name"
          value={location.name}
          onChange={(e) => handleInputChange(index, e)}
          sx={selectStyle}
        />
      </TableCell>
    </TableRow>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    locations.forEach((location) => {
      if (map && location.latitude && location.longitude) {
        const marker = new mapboxgl.Marker()
          .setLngLat([location.longitude, location.latitude])
          .setPopup(new mapboxgl.Popup().setText(location.name))
          .addTo(map);

        setMarkers((prevMarkers) => [...prevMarkers, marker]);
      }
    });
  };

  const handleSave = async (title, version, privacy) => {
    try {
      let titleToPut = title;
      let versionToPut = version;
      if (mapId) {
        const response = await mapServiceAPI.getMapGraphicData(userId, mapId);
        titleToPut = response.mapName;
        const originalVer = response.vers;
        if (originalVer === "ver1") {
          versionToPut = "ver2";
        } else if (originalVer === "ver2") {
          versionToPut = "ver3";
        } else if (originalVer === "ver2") {
          versionToPut = "ver1";
          // Here, find the version1 having the same title & delete it from DB
        }
      }

      const mapData = {
        locations: locations,
      };

      await mapServiceAPI.addMapGraphics(
        userId,
        null, // This could be null if creating a new map
        titleToPut,
        versionToPut,
        privacy,
        "Point Map",
        JSON.stringify(mapData)
      );
      setMapId(null);
      navigate("/map");
      alert("Map saved successfully");
    } catch (error) {
      console.error("Error saving map:", error);
      alert("Error saving map");
    }
  };

  const removeAllMarkers = () => {
    markers.forEach((marker) => marker.remove());
    setMarkers([]);
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
            </Container>
          </TabPanel>
          <TabPanel value="3">
            <SaveTab
              onSave={handleSave}
              mapLayer={mapLayer}
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
