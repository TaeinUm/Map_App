import React, { useState, useEffect, useRef, useContext } from "react";
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
import { MapContext } from "../../../../contexts/MapContext";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Memo from "../Memo";

import ShareTab from "../ShareTab";
import SaveTab from "../SaveTab";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

function File() {
  const { geojsonData } = useContext(MapContext);
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [tabValue, setTabValue] = useState("1");
  const [mapJson, setMapJson] = useState({});
  const [isMemoVisible, setIsMemoVisible] = useState(false);
  const [memoContent, setMemoContent] = useState("");

  const [lineColor, setLineColor] = useState("#088");
  const [lineOpacity, setLineOpacity] = useState(0.8);
  const [waterColor, setWaterColor] = useState("#0000FF");
  const [lineThickness, setLineThickness] = useState(2);

  const sourceId = "uploadedGeoSource";
  const layerId = "uploaded-data-layer";

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
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.006, 40.7128],
        zoom: 2,
      });

      newMap.on("load", () => {
        if (geojsonData) {
          newMap.addSource(sourceId, {
            type: "geojson",
            data: geojsonData,
          });

          newMap.addLayer({
            id: layerId,
            type: "line",
            source: sourceId,
            paint: {
              "line-color": lineColor,
              "line-opacity": lineOpacity,
              "line-width": lineThickness,
            },
          });

          newMap.setPaintProperty("waterd", "fill-color", waterColor);
        }

        setMap(newMap);
        setIsMapLoaded(true);
        setMapJson(newMap.getStyle());
      });
    }
  }, [map, geojsonData]);

  const updateMapStyle = () => {
    if (map) {
      map.setPaintProperty(layerId, "line-color", lineColor);
      map.setPaintProperty(layerId, "line-opacity", lineOpacity);
      map.setPaintProperty(layerId, "line-width", lineThickness);

      map.setPaintProperty("water", "fill-color", waterColor);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "100%" }}
      />
      {!isMapLoaded && (
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <CircularProgress />
        </div>
      )}
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
            <Box
              sx={{
                display: "flex",
                color: "#fafafa",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              {/* Color Picker for Line */}
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                Select Line Color:
              </Typography>
              <input
                type="color"
                value={lineColor}
                onChange={(e) => {
                  setLineColor(e.target.value);
                  updateMapStyle();
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                color: "#fafafa",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              {/* Opacity Slider for Line */}
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                Adjust Line Opacity:
              </Typography>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={lineOpacity}
                onChange={(e) => {
                  setLineOpacity(parseFloat(e.target.value));
                  updateMapStyle();
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                color: "#fafafa",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              {/* Color Picker for Water */}
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                Select Water Color:
              </Typography>
              <input
                type="color"
                value={waterColor}
                onChange={(e) => {
                  setWaterColor(e.target.value);
                  updateMapStyle();
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                color: "#fafafa",
                justifyContent: "space-between",
              }}
            >
              {/* Line Thickness Slider */}
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                Adjust Line Thickness:
              </Typography>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={lineThickness}
                onChange={(e) => {
                  setLineThickness(parseInt(e.target.value));
                  updateMapStyle();
                }}
              />
            </Box>
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
          {isMemoVisible && <Memo mapId={""} />}
        </TabContext>
      </Box>
    </Box>
  );
}

export default File;
// import React, { useState, useEffect, useRef, useContext } from "react";
// import mapboxgl from 'mapbox-gl';
// import {
//   Tab,
//   Tabs,
//   Box,
//   Button,
//   Typography,
//   Container,
//   CircularProgress,
// } from "@mui/material";
// import { TabPanel, TabContext } from "@mui/lab";
// import { MapContext } from "../../../../contexts/MapContext";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import Memo from "../../Memo";

// import ShareTab from "../ShareTab";
// import SaveTab from "../SaveTab";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dxa2hiZjAyb2Mya3Fmb3Znd2k4b3EifQ.36cU7lvMqTDdgy--bqDV-A";

// function File() {
//   const { geojsonData } = useContext(MapContext);
//   const mapContainer = useRef(null);
//   const [map, setMap] = useState(null);
//   const [isMapLoaded, setIsMapLoaded] = useState(false);
//   const [tabValue, setTabValue] = useState("1");
//   const [mapJson, setMapJson] = useState({});
//   const [isMemoVisible, setIsMemoVisible] = useState(false);
//   const [memoContent, setMemoContent] = useState("");

//   const [lineColor, setLineColor] = useState("#088");
//   const [lineOpacity, setLineOpacity] = useState(0.8);
//   const [waterColor, setWaterColor] = useState("#0000FF");
//   const [lineThickness, setLineThickness] = useState(2);

//   const sourceId = "uploadedGeoSource";
//   const layerId = "uploaded-data-layer";

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleJsonChange = (json) => {
//     setMapJson(json.jsObject);
//   };

//   const saveJson = () => {
//     try {
//       map.setStyle(mapJson);
//       alert("Successfully saved!");
//     } catch (error) {
//       alert("Invalid JSON!");
//     }
//   };

//   const toggleMemo = () => {
//     setIsMemoVisible(!isMemoVisible);
//   };

//   const handleMemoSave = () => {
//     console.log("Memo saved:", memoContent);
//     // Memo save logic here...
//   };

//   useEffect(() => {
//     if (!map) {
//       const newMap = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: [-74.006, 40.7128],
//         zoom: 2,
//       });

//       newMap.on("load", () => {
//         if (geojsonData) {
//           newMap.addSource(sourceId, {
//             type: "geojson",
//             data: geojsonData,
//           });

//           newMap.addLayer({
//             id: layerId,
//             type: "line",
//             source: sourceId,
//             paint: {
//               "line-color": lineColor,
//               "line-opacity": lineOpacity,
//               "line-width": lineThickness,
//             },
//           });

//           newMap.setPaintProperty("waterd", "fill-color", waterColor);
//         }

//         setMap(newMap);
//         setIsMapLoaded(true);
//         setMapJson(newMap.getStyle());
//       });
//     }
//   }, [map, geojsonData]);

//   const updateMapStyle = () => {
//     if (map) {
//       map.setPaintProperty(layerId, "line-color", lineColor);
//       map.setPaintProperty(layerId, "line-opacity", lineOpacity);
//       map.setPaintProperty(layerId, "line-width", lineThickness);

//       map.setPaintProperty("water", "fill-color", waterColor);
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       <div
//         id="map"
//         ref={mapContainer}
//         style={{ width: "100%", height: "100%" }}
//       />
//       {!isMapLoaded && (
//         <div style={{ position: "absolute", top: "50%", left: "50%" }}>
//           <CircularProgress />
//         </div>
//       )}
//       <Box sx={{ width: "30%" }}>
//         <TabContext value={tabValue}>
//           <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//             <Tabs
//               variant="fullWidth"
//               value={tabValue}
//               onChange={handleTabChange}
//               aria-label="map tabs"
//               indicatorColor="secondary"
//               textColor="secondary"
//             >
//               <Tab
//                 label="Styles"
//                 value="1"
//                 sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
//               />
//               <Tab
//                 label="Share"
//                 value="3"
//                 sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
//               />
//               <Tab
//                 label="Save"
//                 value="4"
//                 sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
//               />
//             </Tabs>
//           </Box>
//           <TabPanel value="1">
//             <Box
//               sx={{
//                 display: "flex",
//                 color: "#fafafa",
//                 justifyContent: "space-between",
//                 marginBottom: "30px",
//               }}
//             >
//               {/* Color Picker for Line */}
//               <Typography variant="body1" sx={{ textAlign: "left" }}>
//                 Select Line Color:
//               </Typography>
//               <input
//                 type="color"
//                 value={lineColor}
//                 onChange={(e) => {
//                   setLineColor(e.target.value);
//                   updateMapStyle();
//                 }}
//               />
//             </Box>

//             <Box
//               sx={{
//                 display: "flex",
//                 color: "#fafafa",
//                 justifyContent: "space-between",
//                 marginBottom: "30px",
//               }}
//             >
//               {/* Opacity Slider for Line */}
//               <Typography variant="body1" sx={{ textAlign: "left" }}>
//                 Adjust Line Opacity:
//               </Typography>
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.1"
//                 value={lineOpacity}
//                 onChange={(e) => {
//                   setLineOpacity(parseFloat(e.target.value));
//                   updateMapStyle();
//                 }}
//               />
//             </Box>

//             <Box
//               sx={{
//                 display: "flex",
//                 color: "#fafafa",
//                 justifyContent: "space-between",
//                 marginBottom: "30px",
//               }}
//             >
//               {/* Color Picker for Water */}
//               <Typography variant="body1" sx={{ textAlign: "left" }}>
//                 Select Water Color:
//               </Typography>
//               <input
//                 type="color"
//                 value={waterColor}
//                 onChange={(e) => {
//                   setWaterColor(e.target.value);
//                   updateMapStyle();
//                 }}
//               />
//             </Box>

//             <Box
//               sx={{
//                 display: "flex",
//                 color: "#fafafa",
//                 justifyContent: "space-between",
//               }}
//             >
//               {/* Line Thickness Slider */}
//               <Typography variant="body1" sx={{ textAlign: "left" }}>
//                 Adjust Line Thickness:
//               </Typography>
//               <input
//                 type="range"
//                 min="1"
//                 max="10"
//                 step="1"
//                 value={lineThickness}
//                 onChange={(e) => {
//                   setLineThickness(parseInt(e.target.value));
//                   updateMapStyle();
//                 }}
//               />
//             </Box>
//           </TabPanel>
//           <TabPanel value="3">
//             <ShareTab />
//           </TabPanel>
//           <TabPanel value="4">
//             <SaveTab />
//           </TabPanel>
//           <Button
//             sx={{ width: "100%", height: "20px", backgroundColor: "grey" }}
//             onClick={toggleMemo}
//           >
//             {isMemoVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
//           </Button>
//           {isMemoVisible && <Memo />}
//         </TabContext>
//       </Box>
//     </Box>
//   );
// }

// export default File;
