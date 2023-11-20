import React, { useEffect, useState, useRef, useContext } from "react";
import * as mapboxgl from "mapbox-gl";
import {
  Tab,
  Tabs,
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import * as XLSX from "xlsx";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Memo from "../Memo";

import ShareTab from "../ShareTab";
import SaveTab from "../SaveTab";
import { MapContext } from "../../../../contexts/MapContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import mapServiceAPI from "../../../../api/mapServiceAPI";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

const Point = () => {
  const { mapId } = useContext(MapContext);
  const { userId, username } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLayers, setInitializeLayers] = useState(null);
  const [mapLayer, setMapLayer] = useState(null);

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const fileInputRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v11"
  );

  const [tabValue, setTabValue] = useState("1");
  const [mapJson, setMapJson] = useState({});
  const [isMemoVisible, setIsMemoVisible] = useState(false);
  const [memoContent, setMemoContent] = useState("");

  const [locations, setLocations] = useState([
    { latitude: "", longitude: "", name: "" },
  ]);

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
    setIsLoading(true);
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: "map",
        style: mapStyle,
        center: [-74.006, 40.7128],
        zoom: 2,
      });

      newMap.on("load", async () => {
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
            const data = await mapServiceAPI.getMapGraphicData(
              userId,
              username,
              mapId
            );
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
  }, [map, mapStyle]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
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
          const marker = new mapboxgl.Marker()
            .setLngLat([location.longitude, location.latitude])
            .addTo(map);
          /*
          const popup = new mapboxgl.Popup()
            .setHTML(`<h3>${location.name}</h3>`)
            .addTo(map);

          marker.setPopup(popup);*/
        });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    locations.forEach((location) => {
      if (map && location.latitude && location.longitude) {
        new mapboxgl.Marker()
          .setLngLat([location.longitude, location.latitude])
          .setPopup(new mapboxgl.Popup().setText(location.name))
          .addTo(map);
      }
    });
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
        "Point Map",
        mapLayer
      );
      alert("Map saved successfully");
    } catch (error) {
      console.error("Error saving map:", error);
      alert("Error saving map");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "100%" }}
      />
      {isLoading && (
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <CircularProgress />
        </div>
      )}
      ;
      <Box sx={{ width: "40%" }}>
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
              {/*     <Tab
                label="Share"
                value="2"
                sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
      />*/}
              <Tab
                label="Save"
                value="3"
                sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
              />
            </Tabs>
          </Box>
          <TabPanel value="1">
            <Container>
              <Typography sx={{ color: "#fafafa", marginBottom: "30px" }}>
                Choose an excel file that contains 'latitude,' 'longitude,' and
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
              <form onSubmit={handleSubmit} style={{ marginTop: "40px" }}>
                <table>
                  <thead style={{ margin: "20px" }}>
                    <tr>
                      <th style={{ color: "#fafafa" }}>Latitude</th>
                      <th style={{ color: "#fafafa" }}>Longitude</th>
                      <th style={{ color: "#fafafa" }}>Name</th>
                    </tr>
                  </thead>
                  <tbody style={{ margin: "20px" }}>
                    {locations.map((location, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            name="latitude"
                            value={location.latitude}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="longitude"
                            value={location.longitude}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="name"
                            value={location.name}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="button" onClick={addNewRow}>
                  + Add Row
                </button>
                <button type="submit">Submit</button>
              </form>
            </Container>
          </TabPanel>
          {/*<TabPanel value="2">
            <ShareTab />
          </TabPanel>*/}
          <TabPanel value="3">
            <SaveTab onSave={handleSave} mapLayer={mapLayer} />
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

export default Point;
