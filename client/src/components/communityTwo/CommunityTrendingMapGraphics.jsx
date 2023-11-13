import React, { useState, useEffect } from 'react';
import { Link, MemoryRouter, Route, Routes, useLocation, NavLink } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
//import { makeStyles } from '@mui/material';
import Stack from '@mui/material/Stack';
import {Typography, Paper, Button, Box, TextField} from '@mui/material';
import { getTop5Trending } from "../../api/graphicsAPI";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { styled, alpha } from '@mui/material/styles';
import CommunitySearchBar from './CommunitySearchBar';

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

const itemsPerPage = 3;

// const useStyles = makeStyles(theme => ({
//     root: {
//         position: "fixed",
//         bottom: 0,
//         zIndex: 200,
//         backgroundColor: "yellow",
//         padding: "10px 80px",
//         color:"white",
//         width:"100%", 
//     },
//     container:{
//         display:"flex",
//         justifyContent:"center",
//         alignItems:"center",
//         color:"white",
//     },
// })

// );

//const numPages = {Math.ceil(topGraphics.length / itemsPerPage)};

// const data = [
//   // Your data array goes here
//   // Example: { id: 1, name: 'Item 1' },
//   //          { id: 2, name: 'Item 2' },
//   //          ...
// ];

function CommunityTrendingMapGraphics(){
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };
    
//     const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const page = parseInt(query.get('page') || '1', 2);
    const [anchorEl, setAnchorEl] = React.useState(null);
        
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

  
    const [topGraphics, setTopGraphics] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    

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
        setCurrentPage(1);
      },[]);

      const handleDecrease =()=>{
        if(currentPage==1){
            return;
        }else{
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
        }
      }
      const handleIncrease =()=>{
        const numPages = Math.ceil(topGraphics.length/3);
        if(currentPage==numPages){
            return;
        }else{
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
        }
      }

    //   const handleChangePage = (event, newPage) => {
    //     setCurrentPage(newPage);
    //   };
      let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;//>topGraphics.length?(startIndex+itemsPerPage):topGraphics.length;
  console.log("What is the startIndex: "+startIndex);
  console.log("What is the endIndex: "+endIndex);
  console.log("What are the properties of a graphic: "+topGraphics[0]);
    //   if (endIndex>=topGraphics.length){
    //     endIndex=topGraphics.length;
    //   }
//   const currentData = topGraphics.slice(startIndex, endIndex);
//       const classes=useStyles();
    return(
        
    //     <div>
    //         {/* Display your paginated data here */}
    //   {currentData.map((item) => (
    //     <Typography key={item.id} variant="body1">
    //       {item.name}
    //     </Typography>
    //   ))}

    //   {/* Pagination component */}
    //   <Stack spacing={2} mt={3}>
    //     <Pagination
    //       count={Math.ceil(data.length / itemsPerPage)}
    //       page={currentPage}
    //       onChange={handleChangePage}
    //       color="primary"
    //     />
    //   </Stack>
    //     </div>
        // <div id={classes.container}>
        //     <div id={classes.root}>
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
              Trending Map Graphics
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
              <MenuItem onClick={handleClose} component={NavLink} to={"/community"} disableRipple>
              
                Community
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
          <CommunitySearchBar onSearchChange={handleSearchChange} />
            </Box>
           <Box>
                <Button id="post-map-button" variant="contained" component={NavLink}
                to={"/communityPostMapGraphic"}>Post</Button>
           </Box>
          {topGraphics.slice(startIndex, endIndex).filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((graphic, index) => (
            <Box>
            <Typography component={NavLink} to={"/communityGraphicPost/:"+index}>{graphic.title}</Typography>
            <Paper 
              key={index}
              elevation={4}
              data-cy="trending-graphic"
              sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
            //   component={NavLink}
              //to={"/communityGraphicPost/:"+index}
            >
              <img
                src={graphic.image}
                alt={graphic.title}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Paper>
            </Box>
          ))}
          <Button onClick={handleDecrease}>{"<"}</Button>
          <Button onClick={handleIncrease}>{">"}</Button>
        
        </div>
            
    );
}
export default CommunityTrendingMapGraphics;
