import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Dropzone from 'react-dropzone';
import toGeoJSON from 'togeojson';
import shp from 'shpjs/dist/shp';


mapboxgl.accessToken = 'pk.eyJ1IjoidGFlaW51bSIsImEiOiJjbG0ydG1iZ2cyOXM4M2ptbmhiZ3Zhd3J2In0.Fh3nqHdcxQEsDf0XZAwt7g';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) {
        return;
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-73.1116, 40.9426],
      zoom: 13,
    });
  });




  // Handle file drop
  const handleFileDrop = async (files) => {
    const file = files[0];
    const reader = new FileReader();

    if (!file.name.endsWith('.json') && !file.name.endsWith('.geojson') && !file.name.endsWith('.zip') && !file.name.endsWith('.kml')) {
      alert("Invalid file type. Please drop GeoJSON, Shapefile, or KML file.");
      return;
    }

    if (file.name.endsWith('.json') || file.name.endsWith('.geojson')) {
      reader.onload = async () => {
        const geojsonData = JSON.parse(reader.result);
        updateMap(geojsonData);
      };
      reader.readAsText(file);
    }
    else if (file.name.endsWith('.zip') || file.name.endsWith('.kml')) {
      reader.onload = async () => {
        let geojsonData;
        const result = reader.result;

        if (file.name.endsWith('.zip')) {
          geojsonData = await shp(result);
        }
        else if (file.name.endsWith('.kml')) {
          geojsonData = await readKML([file]);
          console.log(geojsonData);
        }
        updateMap(geojsonData);
      };

      reader.onerror = () => {
        console.error('Error reading the file.');
      };

      reader.readAsArrayBuffer(file);
    }
  };

  // KML
  const read = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const readKML = async (kmlFiles) => {
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

  // Update map
  const updateMap = (geojson) => {
    const source = 'geojson';
    if (map.current.getSource(source)) {
      map.current.getSource(source).setData(geojson);
    } else {
      map.current.addSource(source, {
        type: 'geojson',
        data: geojson
      });
      map.current.addLayer({
        id: 'my-geojson-layer',
        type: 'line',
        source: source,
        paint: {
          'line-color': 'red',
          'line-width': 2,
        }
      });
    }
  };

  return (
    <div id="dropzone" className="container">
      <Dropzone className="dropzone" onDrop={handleFileDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <button className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            Select File
          </button>
        )}
      </Dropzone>
      <div ref={mapContainer} style={{ width: '800px', height: '500px' }} />
    </div>
  );
};

export default Map;
