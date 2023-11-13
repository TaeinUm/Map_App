import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import {Button, Box, Typography, TextField} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import CommunityTwoMapIdeaPostings from "./CommunityTwoMapIdeasPostingsPage";
import CommunitySearchBar from "./CommunitySearchBar";

let itemsPerPage=3;
let newIdeas = ["Fantasy Map", "Deer Pop", "Road Trip", "City Congestion", "Wildfire report"];

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

function CommunityTwoMapIdeas() {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    // const [postMode, setPostMode] = useState(null);
    // const [postData, setPostData] = useState({title: ""})
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDecrease =()=>{
    if(currentPage==1){
        return;
    }else{
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
    }
  }
  const handleIncrease =()=>{
    const numPages = Math.ceil(newIdeas.length/3);
    if(currentPage==numPages){
        return;
    }else{
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
    }
  }
//   function changeToPost(text){
//     setPostMode(true);
//     setPostData({text});

//   }

  useEffect(() => {
    //setPostMode(false);
    setCurrentPage(1);
  },[]);
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;//>topGraphics.length?(startIndex+itemsPerPage):topGraphics.length;
  console.log("What is the startIndex: "+startIndex);
  console.log("What is the endIndex: "+endIndex);

//   let content = "";
//   if (postMode){
//     content = <CommunityTwoMapIdeaPostings title={postData.title}/>

//   }else{
    // content=<Box 
    // sx={{
    //   display: "flex-column",
    //   width: "3250px",
    //   gap: "10px",
    //   mt: 5,
    //   transition: "transform 0.5s",
    //   //transform: `translateX(${scrollAmount}px)`,
    // }}
    // >
    //   {newIdeas.slice(startIndex, endIndex).map((text, index) => (
    //     <Typography
    //       variant="h2"
          
    //       sx={{
    //         fontSize: "20px",
    //         color: "#FAFAFA",
    //         mb: 2,
    //         ml: 5,
    //         display: "flex",
    //         flexGrow: "1",
    //         fontWeight: "bold",
    //       }}
    //       onClick={changeToPost(text)}
    //       // component={NavLink}
    //       // to={"/community"}
    //     >
    //       {text}
    //     </Typography>
    //   ))}
    // </Box>
  //}

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
              Map Graphics Ideas
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
              <MenuItem onClick={handleClose} component={NavLink} to={"/community"} disableRipple>
                
                Community
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
                <CommunitySearchBar onSearchChange={handleSearchChange} />
            </Box>
           <Box>
                <Button id="post-map-button" variant="contained" component={NavLink}
                to={"/communityPostMapGraphic"}>Post</Button>
           </Box>
            <Typography>Map Ideas</Typography>
            <Box 
    sx={{
      display: "flex-column",
      width: "3250px",
      height: "400px",
      gap: "10px",
      mt: 5,
      transition: "transform 0.5s",
      //transform: `translateX(${scrollAmount}px)`,
    }}
    >
      {newIdeas.slice(startIndex, endIndex).filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((text, index) => (
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
          to={"/communityMapIdeaPost/:"+index}
        >
          {text}
        </Typography>
      ))}
    </Box>         
          <Button onClick={handleDecrease}>{"<"}</Button>
          <Button onClick={handleIncrease}>{">"}</Button>

        </div>
    );
}

export default CommunityTwoMapIdeas;