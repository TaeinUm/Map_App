import React, { useContext } from "react";
import BasicStyles from "./control/BasicStyles";
import Point from "./control/Point";
import Heat from "./control/Heat";
import Regional from "./control/Regional";
import Flow from "./control/Flow";
import ThreeD from "./control/ThreeD";
import { MapContext } from "../../../contexts/MapContext";
import { Link } from "react-router-dom";

function StylesTab(children) {
  const { mapType } = useContext(MapContext);

  let content;
  if (mapType === "Basic Map") {
    content = (
      <BasicStyles
        categories={children.categories}
        styleSettings={children.styleSettings}
        handleColorChange={children.andleColorChange}
        handleVisibilityChange={children.handleVisibilityChange}
        fontStyle={children.fontStyle}
        handleFontChange={children.handleFontChange}
        regionColor={children.regionColor}
        setRegionColor={children.setRegionColor}
        selectedCountry={children.selectedCountry}
      />
    );
  } else if (mapType === "Point Map") {
    content = <Point />;
  } else if (mapType === "Heat Map") {
    content = <Heat />;
  } else if (mapType === "Regional Map") {
    content = (
      <Regional
        selectionType={children.selectionType}
        handleSelectionTypeChange={children.handleSelectionTypeChange}
        color={children.color}
        handleCategoryColor={children.handleCategoryColor}
        handleCountryChange={children.handleCountryChange}
        log={children.log}
        handleContinentSelect={children.handleContinentSelect}
        updateCountryColor={children.updateCountryColor}
        countries={children.countries}
      />
    );
  } else if (mapType === "Flow Map") {
    content = <Flow />;
  } else if (mapType === "3D-Bar Map") {
    content = <ThreeD />;
  } else {
    content = <Link to="*" />;
  }

  return <>{content}</>;
}

export default StylesTab;
