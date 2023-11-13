import React, { useState, useEffect } from "react";
import { getTop5Trending } from "../../api/graphicsAPI";
import {Box, Typography, Paper, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { styled, alpha } from '@mui/material/styles';
import { Link, NavLink } from "react-router-dom";
import CommunityTwoMapIdeaPostings from "./CommunityTwoMapIdeasPostingsPage";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


let newQuestions = ["What should I write in the memo?", "Where can I find the map graphics templates that I liked?", "what is JSON files?"];
let newIdeas = ["Fantasy Map", "Deer Pop", "Road Trip"];

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));
  

function CommunityTwo(){
    const [topGraphics, setTopGraphics] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
    useEffect(() => {
        const fetchGraphics = async () => {
          try {
            const data = await getTop5Trending();
            
            console.log("Hello");
            console.log(data);
            setTopGraphics(data);
            
          } catch (error) {
            console.error("Error fetching top graphics:", error);
          }
        };
    
        fetchGraphics();
      },[]);

    

    return(
    <div>
        <Box>
            
            <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              //endIcon={}
            >
              Options
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={NavLink} to={"/communityTrendingMaps"} disableRipple>
              
                Trending Map Graphics
              </MenuItem>
              <MenuItem onClick={handleClose} component={NavLink} to={"/communityMapIdeas"} disableRipple>
                
                Map Graphics Idea
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleClose} component={NavLink} to={"/communityQuestions"} disableRipple>
                
                Questions
              </MenuItem>
              <MenuItem onClick={handleClose} component={NavLink} to={"/communityUserName"} disableRipple>
                
                User Name
              </MenuItem>
              
            </StyledMenu>
          </Box>
          <Box>
              <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </Box>
           <Box>
                <Button id="post-map-button" variant="contained" component={NavLink}
                to={"/communityPostMapGraphic"}>Post</Button>
           </Box>
        <Box
          data-cy="new-map-graphics-community-homecontainer"
          sx={{
            display: "flex-row",
            width: "3250px",
            gap: "10px",
            ml: 5,
            transition: "transform 0.5s",
            //transform: `translateX(${scrollAmount}px)`,
          }}>
            {/* <Grid container spacing="2"> */}
            {topGraphics.slice(0, 3).map((graphic, index) => (
            <Paper
              key={index}
              elevation={4}
              data-cy="trending-graphic"
              sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
            >
              <img
                src={graphic.image}
                alt={graphic.title}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Paper>
          ))}
          {/* </Grid> */}
          
          </Box>
        <Box 
          sx={{
            display: "flex-column",
            width: "3250px",
            gap: "10px",
            mt: 5,
            transition: "transform 0.5s",
            //transform: `translateX(${scrollAmount}px)`,
          }}
          >
            {newQuestions.map((text, index) => (
              <Typography
                variant="h2"
                
                sx={{
                  fontSize: "20px",
                  color: "#FAFAFA",
                  mb: 2,
                  ml: 5,
                  display: "flex",
                  flexGrow: "1",
                  fontWeight: "bold",
                }}
                // component={NavLink}
                // to={"/community"}
              >
                {text}
              </Typography>
            ))}
          </Box>
          <Box 
          sx={{
            display: "flex-column",
            width: "3250px",
            gap: "10px",
            mt: 5,
            transition: "transform 0.5s",
            //transform: `translateX(${scrollAmount}px)`,
          }}
          >
            {newIdeas.map((text, index) => (
              <Typography
                variant="h2"
                
                sx={{
                  fontSize: "20px",
                  color: "#FAFAFA",
                  mb: 2,
                  ml: 5,
                  display: "flex",
                  flexGrow: "1",
                  fontWeight: "bold",
                }}
                component={NavLink}
                to={"/communityMapIdeasPostings"}
              >
                {text}
              </Typography>
            ))}
          </Box>

    </div>);
}
export default CommunityTwo;