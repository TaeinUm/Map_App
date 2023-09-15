import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Dropzone from "react-dropzone";
import toGeoJSON from "togeojson";
import shp from "shpjs/dist/shp";

import "../App.css";

import MapTraffic from "./MapTraffic";

// Mapbox access token (public default)
mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ";

//https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
const Map = () => {
  /**  ------------------- useRef / useState   -------------------   **/
  //initialize map, lng, lat, zoom lvl
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.968285);
  const [lat, setLat] = useState(40.785091); // NY central park
  const [zoom, setZoom] = useState(4);

  /** ------------------- useEffect  -------------------  **/
  useEffect(() => {
    if (map.current) return; // initialize map only once

    //set map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12", //latest style URL
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  }, [lat, lng, zoom]);

  /** ------------------- functions for processing kml file format  ------------------- **/
  const read = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const readKML = async (kmlFiles) => {
    //read kml file and convert into geojson format
    let gj = { type: "FeatureCollection", features: [] };

    for (let file of kmlFiles) {
      let text = await read(file);
      let dom = new DOMParser().parseFromString(text, "application/xml");
      let error = dom.querySelector("parsererror");
      if (error) throw new Error(error.innerText);
      gj.features.push(...toGeoJSON.kml(dom).features);
    }
    return gj;
  };

  /**  ------------------- helper functions -------------------  **/
  //check if the file type is valid
  const validFileType = (file) => {
    if (
      !file.name.endsWith(".json") &&
      !file.name.endsWith(".geojson") &&
      !file.name.endsWith(".zip") &&
      !file.name.endsWith(".kml")
    ) {
      alert(
        "Invalid file type. Please drop GeoJSON, Shapefile (.zip), or KML file."
      );
      return false;
    }
    return;
  };

  //file size check for json
  const parseJsonData = (readerResult) => {
    try {
      const geojsonData = JSON.parse(readerResult);
      if (JSON.stringify(geojsonData).size > 5 * 1024 * 1024) {
        alert("file size exceeds limit. Use a file less than 5MB.");
        return;
      }
      return geojsonData;
    } catch (e) {
      console.error("Error parsing JSON data.", e);
      return null;
    }
  };

  //handle json & geojson files
  const handleJsonFile = (file, reader) => {
    reader.onload = async () => {
      const geojsonData = parseJsonData(reader.result);
      if (geojsonData) {
        updateMapWithData(geojsonData);
      }
    };
    reader.onerror = () => console.error("Error reading the JSON file.");
    reader.readAsText(file);
  };

  //handle shapefile (.zip) and kml files
  const handleShpKml = (file, reader) => {
    reader.onload = async () => {
      let geojsonData;
      const result = reader.result;

      if (file.name.endsWith(".zip")) {
        //shapefile
        try {
          // functionality to handle error from zip files (no shapefile than error msg)
          const files = await shp.parseZip(result); //get all files in zip
          if (!Array.isArray(files)) {
            // 1 shp & dbf file?
            geojsonData = files;
          } else {
            geojsonData = {
              type: "FeatureCollection",
              features: [],
            };
            for (const shpDbf of files) {
              if (shpDbf.features && Array.isArray(shpDbf.features)) {
                geojsonData.features.push(...shpDbf.features);
              } else {
                alert("Too many shapefiles in your zip file.");
                console.error(
                  "cannot get features from your zip files: ",
                  shpDbf
                );
                return;
              }
            }
          }
        } catch (e) {
          alert(
            "Your shapefile (.zip) has to contain both .shp & one .dbf files."
          );
          console.error("Invalid Shapefile ", e);
          return;
        }
      } else if (file.name.endsWith(".kml")) {
        //kml file
        geojsonData = await readKML([file]);
      }

      if (geojsonData) {
        //before updating the map, check if the size valid for mapbox
        if (JSON.stringify(geojsonData).size > 5 * 1024 * 1024) {
          alert("file size exceeds limit.");
        }
        updateMapWithData(geojsonData);
      } else {
        console.error("Could not parse geojsonData.");
      }
    };
    reader.onerror = () => console.error("Error reading the file.");
    reader.readAsArrayBuffer(file);
  };

  /**  ------------------- functions for updating the map using files (json, geojson, zip, kml) -------------------  **/
  const handleFileDrop = async (files) => {
    const file = files[0];
    const reader = new FileReader();

    //Start Loading
    document.getElementById("mapLoadingOverlay").style.display = "block";
    //if it's not a valid file type, just return
    if (validFileType(file)) return;

    //handle json file (.json or .geojson file format)
    if (file.name.endsWith(".json") || file.name.endsWith(".geojson")) {
      handleJsonFile(file, reader);

      //handle zip or kml file
    } else if (file.name.endsWith(".zip") || file.name.endsWith(".kml")) {
      handleShpKml(file, reader);
    }
  };

  //update map
  const updateMapWithData = (geojsonData) => {
    const sourceId = "uploadedGeoSource";
    const layerId = "uploaded-data-layer";

    if (map.current.getSource(sourceId)) {
      map.current.getSource(sourceId).setData(geojsonData);
    } else {
      map.current.addSource(sourceId, {
        type: "geojson",
        data: geojsonData,
      });

      map.current.addLayer({
        id: layerId,
        type: "line",
        source: sourceId,
        paint: {
          "line-color": "#088",
          "line-opacity": 0.8,
        },
      });
    }
    map.current.once("idle", () => {
      //Finish Loading!
      document.getElementById("mapLoadingOverlay").style.display = "none";
    });
  };

  /**  -----------------------------------------------------------  **/

  return (
    <div id="dropzone" className="container">
      <Dropzone className="dropzone" onDrop={handleFileDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <button className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            Drop GeoJSON, Shapefile (in .zip format), or KML file here. (Click)
            <p>Your layer will show up on the Street Map</p>
            <p>KML files or large size files can take a long time to process</p>
          </button>
        )}
      </Dropzone>
      <div className="d-flex">
        <div className="d-flex flex-column">
          <div className="sidebar">
            Street Map: Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div
            id="map"
            ref={mapContainer}
            className="map-container"
            style={{ top: 0, bottom: 0, width: "400px", height: "400px" }}
          />
          <div className="map-loading" id="mapLoadingOverlay">
            Loading...
          </div>
        </div>
        <MapTraffic />
      </div>
    </div>
  );
};

export default Map;
