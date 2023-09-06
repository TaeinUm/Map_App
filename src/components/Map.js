import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Dropzone from 'react-dropzone';
import toGeoJSON from 'togeojson';
import shp from 'shpjs/dist/shp';

import '../App.css';

import MapTraffic from './MapTraffic';

// Mapbox access token (public default)
mapboxgl.accessToken = 'pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ';

const Map = () => {
/**  ------------------- useRef / useState   -------------------   **/
  //initialize map, lng, lat, zoom lvl
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.968285);
  const [lat, setLat] = useState(40.785091);
  const [zoom, setZoom] = useState(10);

/** ------------------- useEffect  -------------------  **/
  useEffect(() => {
    if (map.current) return; // initialize map only once

    //set map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
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
  
  const processKMLFiles = async (kmlFiles) => {
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
  
/**  ------------------- functions for updating the map using files (json, geojson, zip, kml) -------------------  **/
  const handleFileDrop = async (files) => {
    const file = files[0];
    const reader = new FileReader();

    if (!file.name.endsWith('.json') && !file.name.endsWith('.geojson') && !file.name.endsWith('.zip') && !file.name.endsWith('.kml')) {
      alert("Invalid file type. Please drop GeoJSON, Shapefile, or KML file.");
      return;
    }
  
    if (file.name.endsWith('.json') || file.name.endsWith('.geojson')) {
      reader.onload = async () => {
        try {
          const geojsonData = JSON.parse(reader.result);
          if (JSON.stringify(geojsonData).size > 5 * 1024 * 1024) {
            alert("file size exceeds limit. Use a file less than 5MB.");
          }
          updateMapWithData(geojsonData);
        } catch (e) {
          console.error('Error parsing JSON data.', e);
        }
      };
      reader.onerror = () => {
        console.error('Error reading the JSON file.');
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.zip') || file.name.endsWith('.kml')) {
      reader.onload = async () => {
        let geojsonData;
        const result = reader.result;
  
        if (file.name.endsWith('.zip')) {
          geojsonData = await shp(result);
        } else if (file.name.endsWith('.kml')) {
          geojsonData = await processKMLFiles([file]); 
          console.log(geojsonData);
        }
        if (geojsonData) {
          if (JSON.stringify(geojsonData).size > 5 * 1024 * 1024) {
            alert("file size exceeds limit. Use a file less than 5MB.");
          }
          updateMapWithData(geojsonData);
        } else {
          console.error('Could not parse geojsonData.');
        }
      };
      reader.onerror = () => {
        console.error('Error reading the file.');
      };
      reader.readAsArrayBuffer(file); 
    }
  };
  
  const updateMapWithData = (geojsonData) => {
    const sourceId = 'uploadedGeoSource';
    const layerId = 'uploaded-data-layer';
  
    if (map.current.getSource(sourceId)) {
      map.current.getSource(sourceId).setData(geojsonData);
    } else {
      map.current.addSource(sourceId, {
        type: 'geojson',
        data: geojsonData
      });
  
      map.current.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        paint: {
          'line-color': '#088',
          'line-opacity': 0.8
        }
      }, 'custom-marker-layer');
    }
  };
  
/**  -----------------------------------------------------------  **/

  return (
    <div id="dropzone" className="container">
      <Dropzone className="dropzone" onDrop={handleFileDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <button className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            Drop GeoJSON, Shapefile, or KML file here. (Click)
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
            style={{ top: 0, bottom: 0, width: '400px', height: '400px' }}
          />
        </div>
        <MapTraffic />
      </div>
    </div>
  );
};

export default Map;
