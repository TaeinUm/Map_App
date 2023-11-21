import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

const TabMenu = ({ tabValue, handleTabChange }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        variant="fullWidth"
        value={tabValue}
        onChange={handleTabChange}
        aria-label="map tabs"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab
          label="Styles"
          value="1"
          sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
        />
        {/* <Tab label="Share" value="2" sx={{ backgroundColor: '#282c34', color: '#fafafa' }} /> */}
        <Tab
          label="Save"
          value="3"
          sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
        />
      </Tabs>
    </Box>
  );
};

export default TabMenu;
