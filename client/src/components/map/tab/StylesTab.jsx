import React, { useContext } from "react";
import Basic from "./control/Basic";
import Point from "./control/Point";
import { MapContext } from "../../../contexts/MapContext";
import { Link } from "react-router-dom";

function StylesTab() {
  const { mapType } = useContext(MapContext);

  let content;
  if (mapType === "Basic Map") {
    content = <Basic />;
  } else if (mapType === "Point Map") {
    content = <Point />;
  } /*else if (mapType === "Heat Map") {
    content = <Heat />;
  } else if (mapType === "Regional Map") {
    content = <Regional />;
  } else if (mapType === "Flow Map") {
    content = <Flow />;
  } else if (mapType === "3D-Bar Map") {
    content = <ThreeD />;
  } */ else {
    content = <Link to="*" />;
  }

  return <>{content}</>;
}

export default StylesTab;
