import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

//Juyee
//access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ";

//accesstokens & API request
//https://api.mapbox.com/directions/v5/mapbox/cycling/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson&access_token=pk.eyJ1IjoiamF5c3VkZnlyIiwiYSI6ImNsbTB3MnJscDA0N3Izcm56dGl4NGFrZzQifQ.T9P37mCX3ll44dNDvOuRGQ
const Map_nav = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.662323);
  const [lat, setLat] = useState(45.523751); // NY central park
  const [zoom, setZoom] = useState(12);
  const bounds = [
    [-123.069003, 45.395273],
    [-122.303707, 45.612333],
  ];
  useEffect(() => {
    //waypoints: array of Waypoint objects (include staring & ending points)
    //routes: array of Route objects (geometry property to display the route on a map)
    //codes: state of the response
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat], // starting position
      zoom: zoom,
      maxBounds: bounds, // Set the map's geographical boundaries.
    });

    // an arbitrary start will always be the same
    // only the end or destination will change
    const start = [-122.662323, 45.523751];

    // create a function to make a directions request
    async function getRoute(end) {
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      );
      const json = await query.json();
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };
      // if the route already exists on the map, we'll reset it using setData
      if (map.current.getSource("route")) {
        map.current.getSource("route").setData(geojson);
      }
      // otherwise, we'll make a new request
      else {
        map.current.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
      const instructions = document.getElementById("instructions");
      const steps = data.legs[0].steps;

      let tripInstructions = "";
      for (const step of steps) {
        tripInstructions += `<li>${step.maneuver.instruction}</li>`;
      }
      instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
        data.duration / 60
      )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;
    }

    map.current.on("load", () => {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute(start);

      // Add starting point to the map
      map.current.addLayer({
        id: "point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: start,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#3887be",
        },
      });
      // this is where the code from the next step will go
    });
    map.current.on("click", (event) => {
      const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
      const end = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: coords,
            },
          },
        ],
      };
      if (map.current.getLayer("end")) {
        map.current.getSource("end").setData(end);
      } else {
        map.current.addLayer({
          id: "end",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Point",
                    coordinates: coords,
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 10,
            "circle-color": "#f30",
          },
        });
      }
      getRoute(coords);
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  }, [bounds, lat, lng, zoom]);

  return (
    <div className="d-flex">
      <div
        id="map"
        ref={mapContainer}
        style={{ top: 0, bottom: 0, width: "75%", height: "400px" }}
      ></div>
      <div id="instructions"></div>
    </div>
  );
};

export default Map_nav;
