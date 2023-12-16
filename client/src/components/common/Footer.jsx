import { Box, Button, Typography, CardMedia } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import TerraCanvas from "../../assets/images/TerraCanvas.png";

function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "black",
        width: "100%",
        height:"70px",
        px: 3,
        "@media (max-width: 768px)": {
          display: "none",
        },
      }}
    >
      <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
        <Link to="/">
          <CardMedia
            type="button"
            image={TerraCanvas}
            component="img"
            alt="logo"
            style={{
              objectFit: "cover",
              height: "40px",
              width: "auto",
            }}
          />
        </Link>
      </Box>
      <Box>
        <Button
          component={NavLink}
          to="/termsconditions"
          sx={{ color: "white", textTransform: "none", marginRight: "40px" }}
        >
          Terms and Conditions
        </Button>
        <Button
          component={NavLink}
          to="/privacypolicy"
          sx={{ color: "white", textTransform: "none", marginRight: "40px" }}
        >
          Privacy Policy
        </Button>
        <Button
          component={NavLink}
          to="/contact"
          sx={{ color: "white", textTransform: "none", marginRight: "40px" }}
        >
          Contact
        </Button>
      </Box>
    </Box>
  );
}

export default Footer;
