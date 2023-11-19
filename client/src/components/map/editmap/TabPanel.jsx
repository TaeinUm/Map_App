import React from "react";
import { Tab, Tabs, Box } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";

const TabPanelLayout = ({ tabValue, handleTabChange, children }) => {
  return (
    <Box sx={{ width: "30%" }}>
      <TabContext value={tabValue}>
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
            <Tab
              label="Share"
              value="2"
              sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
            />
            <Tab
              label="Save"
              value="3"
              sx={{ backgroundColor: "#282c34", color: "#fafafa" }}
            />
          </Tabs>
        </Box>
        {children.map((child, index) => (
          <TabPanel value={String(index + 1)} key={index}>
            {child}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default TabPanelLayout;
