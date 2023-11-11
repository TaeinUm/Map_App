import React from "react";
import { Grid, TextField, Button } from "@mui/material";

function JSONTab({ geojsonData }) {
  return (
    <>
      <Grid fullWdith>
        <TextField
          multiline
          rows={19}
          value={geojsonData}
          sx={{
            width: "100%",
            height: "80%",
            margin: "5px",
            marginBottom: "20px",
            borderColor: "grey",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "grey !important",
              },
              "&:hover fieldset": {
                borderColor: "grey !important",
              },
              "&.Mui-focused fieldset": {
                borderColor: "grey !important",
              },
            },
            "& .MuiInputBase-input": {
              color: "#fafafa",
            },
          }}
        ></TextField>
        <Button
          sx={{ backgroundColor: "#fafafa", width: "100px", color: "black" }}
        >
          Save
        </Button>
      </Grid>
    </>
  );
}

export default JSONTab;
