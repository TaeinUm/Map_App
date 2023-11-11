import React, { useState, useEffect } from "react";
import { Marker, useControl, MarkerProps, ControlPosition } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

type GeocoderControlProps = {
  mapboxAccessToken: string,
  position?: string, // Assuming this should be a string corresponding to a CSS class
  onLoading?: () => void,
  onResults?: () => void,
  onResult?: (event: any) => void,
  onError?: () => void,
};

const GeocoderControl: React.FC<GeocoderControlProps> = ({
  mapboxAccessToken,
  position = "top-right", // Make sure this is a valid CSS class
  onLoading = () => {},
  onResults = () => {},
  onResult = () => {},
  onError = () => {},
}) => {
  const noop = () => {};

  GeocoderControl.defaultProps = {
    marker: true,
    onLoading: noop,
    onResults: noop,
    onResult: noop,
    onError: noop,
  };

  const [marker, setMarker] = (useState < React.ReactNode) | (null > null);

  const geocoder =
    useControl <
    MapboxGeocoder >
    (() => {
      const ctrl = new MapboxGeocoder({
        ...GeocoderControlProps,
        marker: false,
        accessToken: mapboxAccessToken,
      });
      ctrl.on("loading", onLoading);
      ctrl.on("results", onResults);
      ctrl.on("result", (evt) => {
        onResult(evt);

        const { result } = evt;
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === "Point" && result.geometry.coordinates));
        if (location && marker) {
          setMarker(
            <Marker
              {...marker}
              longitude={location[0]}
              latitude={location[1]}
            />
          );
        } else {
          setMarker(null);
        }
      });
      ctrl.on("error", onError);
      return ctrl;
    },
    {
      position: position,
    });

  return <>{marker}</>;
};

export default GeocoderControl;
