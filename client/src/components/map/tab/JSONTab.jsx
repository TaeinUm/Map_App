import React from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { Button } from "@mui/material";

const JSONTab = ({ mapJson, handleJsonChange, saveJson }) => {
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <JSONInput
        id="json-editor"
        size="xs"
        placeholder={mapJson}
        locale={locale}
        height="395px"
        width="280px"
        onChange={handleJsonChange}
        validationError="Invalid JSON"
        style={{ maxWidth: "300px", margin: "20px", paddingLeft: "50px" }}
      />
      <Button
        variant="contained"
        onClick={saveJson}
        sx={{ marginTop: "20px", background: "#fafafa", color: "black" }}
      >
        Save JSON
      </Button>
    </div>
  );
};

export default JSONTab;
