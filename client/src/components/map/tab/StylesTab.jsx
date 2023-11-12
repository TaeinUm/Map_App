import React, { useContext } from "react";
import Basic from "./control/Basic";
import Point from "./control/Point";
import Heat from "./control/Heat";
import Regional from "./control/Regional";
import Flow from "./control/Flow";
import ThreeD from "./control/ThreeD";
import { MapContext } from "../../../contexts/MapContext";
import { Link } from "react-router-dom";

function StylesTab({ onChange, setGeojsonData }) {
  const { mapType } = useContext(MapContext);

  let content;
  if (mapType === "Basic Map") {
    content = <Basic onChange={onChange} setGeojsonData={setGeojsonData} />;
  } else if (mapType === "Point Map") {
    content = <Point onChange={onChange} setGeojsonData={setGeojsonData} />;
  } else if (mapType === "Heat Map") {
    content = <Heat onChange={onChange} setGeojsonData={setGeojsonData} />;
  } else if (mapType === "Regional Map") {
    content = <Regional onChange={onChange} setGeojsonData={setGeojsonData} />;
  } else if (mapType === "Flow Map") {
    content = <Flow onChange={onChange} setGeojsonData={setGeojsonData} />;
  } else if (mapType === "3D-Bar Map") {
    content = <ThreeD onChange={onChange} setGeojsonData={setGeojsonData} />;
  } else {
    content = <Link to="*" />;
  }

  return <>{content}</>;
}

export default StylesTab;
