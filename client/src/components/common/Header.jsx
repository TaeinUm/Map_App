import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, NavLink } from "react-router-dom";
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
  ListItemButton,
  Divider,
  useTheme,
  useMediaQuery,
  Hidden,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const { isAuthenticated, handleLogin, handleLogout } =
    useContext(AuthContext);
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

  return (
    <AppBar
      position="static"
      height="100px"
      sx={{ background: "linear-gradient(#465065, #282c34)", color: "#FAFAFA" }}
    >
      <Toolbar
        sx={{
          alignContent: "center",
          justifyContent: "space-between",
          padding: "1rem 2rem",
        }}
      >
        <Box sx={{ display: "flex", flex: 1 }}>
          <Typography
            sx={{
              display: "flex",
              cursor: "pointer",
              fontSize: "1.5rem",
              flexGrow: 1,
            }}
            onClick={() => (window.location.href = "/")}
          >
            TERRACANVAS
          </Typography>
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
          <Box sx={{ display: "flex", flex: 2, justifyContent: "center" }}>
            {navLinks.map(({ title, path }) => (
              <Button
                key={title}
                size="large"
                color="inherit"
                component={NavLink}
                to={path}
                style={({ isActive }) =>
                  isActive ? { textDecoration: "underline" } : undefined
                }
              >
                {title}
              </Button>
            ))}
          </Box>
        )}

        {isDesktop && (
          <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
            {isAuthenticated ? (
              <>
                <Button
                  size="large"
                  color="inherit"
                  component={NavLink}
                  onClick={handleLogout}
                  sx={{
                    width: 100,
                    height: 40,
                    backgroundColor: "#FAFAFA",
                    color: "#282c34",
                    border: "none",
                    marginRight: "20px",
                    borderRadius: "5px",
                    "&:hover": {
                      backgroundColor: "primary.light",
                    },
                  }}
                >
                  Logout
                </Button>
                <Button
                  size="large"
                  color="inherit"
                  to="/profile"
                  sx={{
                    width: 100,
                    height: 40,
                    backgroundColor: "#FAFAFA",
                    color: "#282c34",
                    border: "none",
                    marginRight: "20px",
                    borderRadius: "5px",
                    "&:hover": {
                      backgroundColor: "primary.light",
                    },
                  }}
                >
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
                      width: 100,
                      height: 40,
                      backgroundColor: "#FAFAFA",
                      color: "#282c34",
                      border: "none",
                      marginRight: "20px",
                      borderRadius: "5px",
                      "&:hover": {
                        backgroundColor: "primary.light",
                      },
                    }}
                  >
                    {title}
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
                  <ListItemButton primary={title} />
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
