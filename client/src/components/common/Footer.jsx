import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "black",
        width: "100%",
        px: 3,
        "@media (max-width: 768px)": {
          display: "none",
        },
      }}
    >
      <Button
        sx={{
          color: "white",
          fontSize: "40px",
        }}
        onClick={() => (window.location.href = "/")}
      >
        TERRACANVAS
      </Button>
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
