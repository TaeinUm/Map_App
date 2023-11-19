import React, { useState, useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import { MapContext } from "../../../contexts/MapContext";

/*****      map graphics example images    *****/
import heatMapImage from "../../../assets/images/heat-map.png";
import pointMapImage from "../../../assets/images/point-map.png";
import regionalMapImage from "../../../assets/images/regional-map.png";
import flowMapImage from "../../../assets/images/flow-map.png";
import threeDMapImage from "../../../assets/images/3d-bar-map.png";
import basicMapImage from "../../../assets/images/basic-map.png";

const images = {
  "Heat Map": heatMapImage,
  "Point Map": pointMapImage,
  "Regional Map": regionalMapImage,
  "Flow Map": flowMapImage,
  "3D-Bar Map": threeDMapImage,
  "Basic Map": basicMapImage,
};

function MapGraphics({ open }) {
  const [selectedType, setSelectedType] = useState(null);
  const { updateMapContextAndNavigate } = useContext(MapContext);
  const navigate = useNavigate();

  const handleSelect = (type) => {
    setSelectedType(selectedType);
    updateMapContextAndNavigate(null, selectedType, null, navigate);
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
            "3D-Bar Map",
            "Basic Map",
          ].map((type, index) => (
            <Grid item xs={6} sm={4} key={type}>
              <Card>
                <CardActionArea onClick={() => setSelectedType(type)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={images[type]}
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
              onClick={handleSelect}
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
