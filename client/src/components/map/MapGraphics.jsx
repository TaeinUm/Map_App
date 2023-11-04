import React, { useState } from "react";
import {
  Fade,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

function MapGraphics(open) {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  const isSelected = (type) => {
    return selectedType === type;
  };

  return (
    <div>
      <Fade in={open}>
        <Grid
          container
          spacing={2}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: "auto",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h5"
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              Select Your Map Graphics Type
            </Typography>
          </Grid>
          {[
            "Heat Map",
            "Point Map",
            "Regional Map",
            "Flow Map",
            "3D Bar Map",
            "Basic Map",
          ].map((type, index) => (
            <Grid item xs={6} sm={4} key={type}>
              <Card>
                <CardActionArea onClick={() => handleSelect(type)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`/path-to-images/${type
                      .replace(/\s+/g, "-")
                      .toLowerCase()}.jpg`}
                    alt={type}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{
                        textAlign: "center",
                        textDecoration: isSelected(type) ? "underline" : "none", // Apply underline conditionally
                      }}
                    >
                      {type}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "5px",
                color: "#FAFAFA",
                backgroundColor: "black",
                height: "50px",
                width: "200px",
              }}
            >
              Start New
            </Button>
          </Grid>
        </Grid>
      </Fade>
    </div>
  );
}
export default MapGraphics;
