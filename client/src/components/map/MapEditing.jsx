import React, { useContext } from "react";
import BasicStyles from "./tab/control/BasicStyles";
import Point from "./tab/control/Point";
import Heat from "./tab/control/Heat";
import Regional from "./tab/control/Regional";
import Flow from "./tab/control/Flow";
import ThreeD from "./tab/control/ThreeD";
import File from "./tab/control/File";
import { MapContext } from "../../contexts/MapContext";
import { Link } from "react-router-dom";

function MapEditing(children) {
  const { mapType } = useContext(MapContext);

  let content;
  if (mapType === "Basic Map") {
    content = <BasicStyles />;
  } else if (mapType === "Point Map") {
    content = <Point />;
  } else if (mapType === "Heat Map") {
    content = <Heat />;
  } else if (mapType === "Regional Map") {
    content = <Regional />;
  } else if (mapType === "Flow Map") {
    content = <Flow />;
  } else if (mapType === "3D-Bar Map") {
    content = <ThreeD />;
  } else if (mapType === null) {
    content = <File />;
  } else {
    content = <Link to="*" />;
  }

  return <>{content}</>;
}

export default MapEditing;
