import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

//access token
// mapboxgl.accessToken = 'sk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3OHNjdzBlNjgza253bGZhMGxub3MifQ.d6s6zC37DI-Mc-osExr2sg';
mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsb3dvdnNlaTA3dTMyam83Yzhua2JtcmIifQ.DnTWaj1jNwPud158t1GHtQ";

function MapTraffic() {
  /**  ------------------- useRef / useState   -------------------   **/
  //initialize map, lng, lat, zoom lvl
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.968285);
  const [lat, setLat] = useState(40.785091);
  const [zoom, setZoom] = useState(10);

  /** ------------------- useEffect  -------------------  **/

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    //button for zoom-in & zoom-out
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right"); // top-left, bottom-right

    map.current.on("load", () => {
      // Add traffic source from mapbox - updated every 8 min
      map.current.addSource("mapbox-traffic", {
        url: "mapbox://mapbox.mapbox-traffic-v1",
        type: "vector",
      });

      // traffic layers
      map.current.addLayer(
        {
          id: "traffic",
          source: "mapbox-traffic",
          "source-layer": "traffic",
          type: "line",
          paint: {
            "line-width": 1.5,
            "line-color": [
              "case",
              ["==", "low", ["get", "congestion"]],
              "#aab7ef",
              ["==", "moderate", ["get", "congestion"]],
              "#4264fb",
              ["==", "heavy", ["get", "congestion"]],
              "#ee4e8b",
              ["==", "severe", ["get", "congestion"]],
              "#b43b71",
              "#000000",
            ],
          },
        },
        "road-label"
      ); // this places the traffic layer below the road labels

      map.current.addLayer(
        {
          id: "traffic-circle",
          type: "circle",
          source: "mapbox-traffic",
          "source-layer": "traffic",
          filter: ["in", "congestion", "heavy", "severe"],
          paint: {
            "circle-radius": 6,
            "circle-color": [
              "case",
              ["==", "heavy", ["get", "congestion"]],
              "#ee4e8b",
              "#b43b71",
            ],
            "circle-opacity": 0.8,
          },
        },
        "road-label"
      );
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
    });

    map.current.addControl(geocoder, "top-left");
    geocoder.on("result", (e) => {
      const [lng, lat] = e.result.geometry.coordinates;
      setLng(lng);
      setLat(lat);

      // map.current.setStyle('mapbox://styles/mapbox/satellite-v9'); //satellite style applied (error - not an exact location!)
      // map.current.setZoom(15);
      // setZoom(15);
    });

    //https://docs.mapbox.com/help/tutorials/getting-started-directions-api/
    //How to make a demo-version of navigation
  }, [lat, lng, zoom]);

  /**  -----------------------------------------------------------  **/

  return (
    <div className="d-flex flex-column">
      <div className="sidebar">
        Real-time traffic: Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        id="map"
        ref={mapContainer}
        className="map-container"
        style={{ top: 0, bottom: 0, width: "400px", height: "400px" }}
      />
    </div>
  );
}

export default MapTraffic;
