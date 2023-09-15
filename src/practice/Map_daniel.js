import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Dropzone from 'react-dropzone';
import toGeoJSON from 'togeojson';
import shp from 'shpjs/dist/shp';
import JSZip from 'jszip'; 

import '../App.css';

// Constants
const MAPBOX_TOKEN = 'pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ';
const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';
mapboxgl.accessToken = MAPBOX_TOKEN;

const MapComponent = () => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  
  const [coordinates, setCoordinates] = useState({
    lng:  -73.11606746441775,
    lat: 40.93046506625579,
    zoom: 10
  });

  useEffect(() => {
    if (mapInstance.current) return;

    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [coordinates.lng, coordinates.lat],
      zoom: coordinates.zoom
    });

    mapInstance.current.on('move', () => {
      setCoordinates({
        lng: parseFloat(mapInstance.current.getCenter().lng.toFixed(4)),
        lat: parseFloat(mapInstance.current.getCenter().lat.toFixed(4)),
        zoom: parseFloat(mapInstance.current.getZoom().toFixed(2))
      });
    });

    mapInstance.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }, [coordinates]);

  const readFile = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });

  const processKML = async (files) => {
    const geojson = { type: "FeatureCollection", features: [] };
    for (const file of files) {
      const text = await readFile(file);
      const parsedXml = new DOMParser().parseFromString(text, "application/xml");
      const error = parsedXml.querySelector("parsererror");
      if (error) throw new Error(error.innerText);
      geojson.features.push(...toGeoJSON.kml(parsedXml).features);
    }
    return geojson;
  };

  let combinedGeoJSON = { type: "FeatureCollection", features: [] };

const handleDroppedFile = async (acceptedFiles) => {
    for (let file of acceptedFiles) {
        const reader = new FileReader();
        const isGeoJSON = file.name.endsWith('.json') || file.name.endsWith('.geojson');
        const isShapefile = file.name.endsWith('.zip');

        if (!isGeoJSON && !isShapefile) {
            alert("Please drop a valid GeoJSON or Shapefile (zip format).");
            continue;
        }

        if (file.size > 50 * 1024 * 1024) {
            alert("File too large. Limit to under 50MB.");
            continue;
        }

        if (isGeoJSON) {
            reader.onload = () => {
                try {
                    const data = JSON.parse(reader.result);
                    combinedGeoJSON.features.push(...data.features);
                    updateMap();
                } catch (err) {
                    console.error('Error parsing JSON.', err);
                }
            };
            reader.readAsText(file);
        } else if (isShapefile) {
            reader.onload = async (event) => {
                try {
                    const buffer = event.target.result;
                    const content = await new JSZip().loadAsync(buffer, { checkCRC32: true }).catch(() => null);

                    if (content) {
                        const geoJSONFiles = Object.keys(content.files).filter(filename => filename.endsWith('.geojson') || filename.endsWith('.json'));
                        for (let path of geoJSONFiles) {
                            const fileContent = await content.file(path).async("string");
                            try {
                                const jsonData = JSON.parse(fileContent);
                                combinedGeoJSON.features.push(...jsonData.features);
                                updateMap();
                            } catch (err) {
                                console.error('Error parsing JSON from zip.', err);
                            }
                        }
                    } else {
                        console.error('Error reading the zip file.');
                    }
                } catch (err) {
                    console.error('Error processing file.', err);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    }
};

const updateMap = () => {
    const sourceKey = 'uploadedGeoSource';

    if (mapInstance.current.getSource(sourceKey)) {
        mapInstance.current.getSource(sourceKey).setData(combinedGeoJSON);
    } else {
        mapInstance.current.addSource(sourceKey, { type: 'geojson', data: combinedGeoJSON });

        // Adding a new layer to display the GeoJSON data. Assuming it's a polygon for now.
        mapInstance.current.addLayer({
            id: 'uploadedLayer',
            type: 'fill',  // Change this depending on your GeoJSON type: 'line', 'fill', 'point'
            source: sourceKey,
            paint: {
                'fill-color': '#888888',
                'fill-opacity': 0.4
            }
        });
    }
};

  return (
    <div className="container">
      <Dropzone onDrop={handleDroppedFile} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <button className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            Give me GeoJSON, Shapefile, or KML here.
          </button>
        )}
      </Dropzone>
      <div className="layout">
        <div className="sidebar">Street Map: Long: {coordinates.lng} | Lat: {coordinates.lat} | Zoom: {coordinates.zoom}</div>
        <div ref={mapContainer} className="map-box" style={{ width: '400px', height: '400px' }} />
      </div>
    </div>
  );
};

export default MapComponent;
