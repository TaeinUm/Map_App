import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Constants
const MAPBOX_TOKEN = 'pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ';
const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';

// Set Mapbox access token
mapboxgl.accessToken = MAPBOX_TOKEN;

const MapComponent = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    // Initialize map with given style, center coordinates, and zoom level
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [-73.11607737097725, 40.93048003516985],
      zoom: 10 // initial zoom level
    });

    // Add vector tile layer on map load
    mapInstance.on('load', () => {
      mapInstance.addLayer({
        id: 'vector-tile-layer',
        type: 'fill',
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-streets-v8' // use only with v8
        },
        'source-layer': 'building',
        paint: {
          'fill-color': 'red'
        }
      });
    });

    // Cleanup function to remove the map on component unmount
    return () => mapInstance.remove();
  }, []);

  return (
    <div 
      ref={mapContainer} 
      style={{ width: '400px', height: '500px' }}
    />
  );
};

export default MapComponent;
