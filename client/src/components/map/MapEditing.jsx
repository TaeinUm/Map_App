import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MapContext } from "../../contexts/MapContext";
import { useMediaQuery, useTheme } from "@mui/material";
import MapMobile from "./landing/MapMobile";

function MapEditing() {
  const navigate = useNavigate();
  const { mapType } = useContext(MapContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (isMobile) {
      // Redirect to the mobile map view
      navigate("/mobilemap");
    } else {
      // Redirect based on the mapType
      switch (mapType) {
        case "Basic Map":
          navigate("/mapedit/basic");
          break;
        case "Point Map":
          navigate("/mapedit/point");
          break;
        case "Heat Map":
          navigate("/mapedit/heat");
          break;
        case "Regional Map":
          navigate("/mapedit/regional");
          break;
        case "Flow Map":
          navigate("/mapedit/flow");
          break;
        case "3D-Bar Map":
          navigate("/mapedit/3d");
          break;
        case null:
          navigate("/mapedit/file");
          break;
        default:
          navigate("/");
          break;
      }
    }
  }, [mapType, isMobile, navigate]);

  return null;
}

export default MapEditing;
