import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  Divider,
  useTheme,
  useMediaQuery,
  Hidden,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout"; // Import logout icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import profile icon
import LoginIcon from '@mui/icons-material/Login'; // Icon for Sign In
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Icon for Sign Up

import TerraCanvas from "../../assets/images/TerraCanvas.png";

function Header() {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Map", path: "/map" },
    { title: "Community", path: "/community" },
  ];

  const sideLinks = [
    { title: "Home", path: "/" },
    { title: "Map", path: "/map" },
    { title: "Community", path: "/community" },
    { title: "Terms and Conditions", path: "termsConditions" },
    { title: "Privacy Policy", path: "privacyPolicy" },
    { title: "Contact", path: "contact" },
  ];

  const authLinks = [
    { title: "Sign In", path: "/signin" },
    { title: "Sign Up", path: "/signup" },
  ];

  const location = useLocation();

  // Function to check if the current path matches or starts with a given path
  const isActiveRoute = (path) => {
    if (path === "/") {
      // For the "Home" link, check if the path is exactly "/"
      return location.pathname === path || location.pathname.startsWith("/sign")
      || location.pathname.startsWith("/termsconditions") || location.pathname.startsWith("/privacypolicy")
      || location.pathname.startsWith("/contact");;
    } else if (path === "/community") {
      // For the "Community" link, check if the path starts with "/community" or "/posts"
      return location.pathname.startsWith(path) || location.pathname.startsWith("/posts");
    } else {
      // For other links, check if the current path starts with the given path
      return location.pathname.startsWith(path);
    }
  };  

  return (
    <AppBar
      position="static"
      sx={{ background: "linear-gradient(#465065, #282c34)", color: "grey", p: 0 }}
    >
      <Toolbar
        sx={{
          alignContent: "center",
          justifyContent: "space-between",
          height: "auto",
          p: 0
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

        <Hidden mdUp>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>

        {isDesktop && (
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            {navLinks.map(({ title, path }) => (
              <Button
                sx={{ fontFamily: "Arial", fontSize: "17px", justifyContent: "space-between", ml: "10px", mr: "10px", pb: 0 }}
                key={title}
                size="large"
                color="inherit"
                component={NavLink}
                to={path}
                style={({ isActive }) =>
                isActive || isActiveRoute(path) ? { fontWeight: "bold", color: "white" } : undefined
                }
              >
                {title}
              </Button>
            ))}
          </Box>
        )}

        {isDesktop && (
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {isAuthenticated ? (
              <>
                <Button
                  size="large"
                  color="inherit"
                  onClick={handleLogout}
                  to="/"
                  sx={{
                    minWidth: "auto",
                    padding: "10px",
                    backgroundColor: "transparent",
                    color: "#282c34",
                    marginRight: "20px",
                    "&:hover": {
                      color: "white",
                      fontWeight: "bold"
                    },
                    color: "grey",
                  }}
                >
                  <LogoutIcon sx={{ mr: "2px" }}/> {/* Logout icon */}
                  logout
                </Button>
                <Button
                  size="large"
                  component={NavLink}
                  color="inherit"
                  to="/profile"
                  sx={{
                    minWidth: "auto",
                    padding: "10px",
                    backgroundColor: "transparent",
                    color: "#282c34",
                    "&:hover": {
                      color: "white",
                      fontWeight: "bold"
                    },
                    color: "grey",
                  }}
                >
                  <AccountCircleIcon sx={{ mr: "3px" }}/> {/* Profile icon */}
                  Profile
                </Button>
              </>
            ) : (
              <>
                {authLinks.map(({ title, path }) => (
                  <Button
                  key={title}
                  size="large"
                  color="inherit"
                  component={NavLink}
                  to={path}
                  sx={{
                    minWidth: 'auto',
                    padding: '10px',
                    backgroundColor: 'transparent',
                    color: '#282c34',
                    marginRight: '20px',
                    "&:hover": {
                      color: "white",
                      fontWeight: "bold"
                    },
                    color: "grey",
                  }}
                >
                    {title === "Sign In"
                      ? <><LoginIcon sx={{ mr: 1 }}/> Sign In</>
                      : title === "Sign Up"
                      ? <><PersonAddIcon sx={{ mr: 1 }}/> Sign Up</>
                      : title}
                  </Button>
                ))}
              </>
            )}
          </Box>
        )}

        {!isDesktop && (
          <Drawer
            width="200px"
            anchor="right"
            open={isOpen}
            onClose={handleMenuClick}
          >
            <List
              sw={{
                "@media (max-width: 768px)": {
                  display: "none",
                },
              }}
            >
              {sideLinks.map(({ title, path }) => (
                <ListItem button key={title} component={Link} to={path}>
                  <ListItemText primary={title} />
                </ListItem>
              ))}
              <Divider />
              {authLinks.map(({ title, path }) => (
                <ListItem button key={title} component={Link} to={path}>
                  <ListItemText primary={title} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
