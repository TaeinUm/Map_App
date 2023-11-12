import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { fromJS } from "immutable";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MAP_STYLE from "../../map-style-basic-v8.json";
import * as XLSX from "xlsx";
import mapboxgl from "mapbox-gl";
import { Typography, Divider, Box } from "@mui/material";
import { MapContext } from "../../../../contexts/MapContext";

const defaultMapStyle = fromJS(MAP_STYLE);
const defaultLayers = defaultMapStyle.get("layers");
const accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ";

const categories = [
  "labels",
  "roads",
  "buildings",
  "parks",
  "water",
  "background",
];

// Layer id patterns by category
const layerSelector = {
  background: /background/,
  water: /water/,
  parks: /park/,
  buildings: /building/,
  roads: /bridge|road|tunnel/,
  labels: /label|place|poi/,
};

// Layer color class by type
const colorClass = {
  line: "line-color",
  fill: "fill-color",
  background: "background-color",
  symbol: "text-color",
};

export function getMapStyle({ visibility, color }) {
  const layers = defaultLayers
    .filter((layer) => {
      const id = layer.get("id");
      return categories.every(
        (name) => visibility[name] || !layerSelector[name].test(id)
      );
    })
    .map((layer) => {
      const id = layer.get("id");
      const type = layer.get("type");
      const category = categories.find((name) => layerSelector[name].test(id));
      if (category && colorClass[type]) {
        return layer.setIn(["paint", colorClass[type]], color[category]);
      }
      return layer;
    });

  return defaultMapStyle.set("layers", layers);
}

function StyleControls(props) {
  const { addMarker } = useContext(MapContext);
  const mapContainer = useRef(null);

  const [fileData, setFileData] = useState([]);

  const [visibility, setVisibility] = useState({
    water: true,
    parks: true,
    buildings: true,
    roads: true,
    labels: true,
    background: true,
  });

  const [color, setColor] = useState({
    water: "#DBE2E6",
    parks: "#E6EAE9",
    buildings: "#c0c0c8",
    roads: "#ffffff",
    labels: "#78888a",
    background: "#EBF0F0",
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        geocodeAddresses(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const geocodeAddresses = async (addresses) => {
    for (const address of addresses) {
      const query = address["Address"];
      try {
        const geocoder = new MapboxGeocoder({ accessToken, query });

        geocoder.on("result", (e) => {
          const location = e.result.geometry.coordinates;
          addMarker({
            longitude: location[0],
            latitude: location[1],
            color: "#FF0000",
          });
        });

        geocoder.on("error", (e) => {
          console.error(`Geocoding error for ${query}: `, e.error);
        });

        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Failed to geocode address "${query}": `, error);
      }
    }
  };

  useEffect(() => {
    if (!props.map) return;
    props.setGeojsonData(fromJS(MAP_STYLE));
    props.onChange(getMapStyle({ visibility, color }));

    const geojson = {
      type: "FeatureCollection",
      features: props.markers.map((marker) => ({
        type: "Feature",
        properties: {
          "marker-color": marker.color,
        },
        geometry: {
          type: "Point",
          coordinates: [marker.longitude, marker.latitude],
        },
      })),
    };

    if (props.map.getSource("markers")) {
      props.map.getSource("markers").setData(geojson);
    } else {
      props.map.addSource("markers", { type: "geojson", data: geojson });
      props.map.addLayer({
        id: "markers",
        type: "symbol",
        source: "markers",
        layout: {
          "icon-image": "{icon}",
          "icon-size": 1,
        },
        paint: {},
      });
    }
  }, [props.markers, props.map]);

  const onColorChange = (name, value) => {
    setColor({ ...color, [name]: value });
  };

  const onVisibilityChange = (name, value) => {
    setVisibility({ ...visibility, [name]: value });
  };

  return (
    <Box className="control-panel">
      <Typography variant="h5" sx={{ textAlign: "left", color: "#fafafa" }}>
        Upload data file
      </Typography>
      <Divider sx={{ borderColor: "#fafafa" }} />
      <hr />
      <Box fullWidth sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ color: "#fafafa" }}>File Upload</Typography>
        <input
          type="file"
          onChange={handleFileUpload}
          style={{ color: "#fafafa" }}
        />
      </Box>
      <Typography variant="h5" sx={{ textAlign: "left", color: "#fafafa" }}>
        Color
      </Typography>
      <Divider sx={{ borderColor: "#fafafa" }} />
      <hr />
      {categories.map((name) => (
        <Box
          key={name}
          className="input"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography sx={{ color: "#fafafa" }}>{name}</Typography>
          <Typography sx={{ color: "#fafafa" }}>{color[name]}</Typography>
          <Box>
            <input
              type="checkbox"
              checked={visibility[name]}
              onChange={(evt) => onVisibilityChange(name, evt.target.checked)}
            />
            <input
              type="color"
              value={color[name]}
              disabled={!visibility[name]}
              onChange={(evt) => onColorChange(name, evt.target.value)}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default React.memo(StyleControls);
