// import React, { useState, useEffect } from "react";
// import { getTop5Trending } from "../../api/graphicsAPI";
// import {Box, Typography, Paper, TextField} from "@mui/material";
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Divider from '@mui/material/Divider';
// import { styled, alpha } from '@mui/material/styles';
// import { Link, NavLink } from "react-router-dom";
// import CommunityTwoMapIdeaPostings from "./CommunityTwoMapIdeasPostingsPage";

// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import CommunitySearchBar from "./CommunitySearchBar";


// let newQuestions = ["What should I write in the memo?", "Where can I find the map graphics templates that I liked?", "what is JSON files?"];
// let newIdeas = ["Fantasy Map", "Deer Pop", "Road Trip"];

// const StyledMenu = styled((props) => (
//     <Menu
//       elevation={0}
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'right',
//       }}
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       {...props}
//     />
//   ))(({ theme }) => ({
//     '& .MuiPaper-root': {
//       borderRadius: 6,
//       marginTop: theme.spacing(1),
//       minWidth: 180,
//       color:
//         theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
//       boxShadow:
//         'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//       '& .MuiMenu-list': {
//         padding: '4px 0',
//       },
//       '& .MuiMenuItem-root': {
//         '& .MuiSvgIcon-root': {
//           fontSize: 18,
//           color: theme.palette.text.secondary,
//           marginRight: theme.spacing(1.5),
//         },
//         '&:active': {
//           backgroundColor: alpha(
//             theme.palette.primary.main,
//             theme.palette.action.selectedOpacity,
//           ),
//         },
//       },
//     },
//   }));
  

// function CommunityTwo(){
//     const [topGraphics, setTopGraphics] = useState([]);
//     const [anchorEl, setAnchorEl] = React.useState(null);
    
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
  
//     useEffect(() => {
//         const fetchGraphics = async () => {
//           try {
//             const data = await getTop5Trending();
            
//             console.log("Hello");
//             console.log(data);
//             setTopGraphics(data);
            
//           } catch (error) {
//             console.error("Error fetching top graphics:", error);
//           }
//         };
    
//         fetchGraphics();
//       },[]);

    

//     return(
//     <div>
//         <Box>
            
//             <Button
//               id="demo-customized-button"
//               aria-controls={open ? 'demo-customized-menu' : undefined}
//               aria-haspopup="true"
//               aria-expanded={open ? 'true' : undefined}
//               variant="contained"
//               disableElevation
//               onClick={handleClick}
//               //endIcon={}
//             >
//               Community
//             </Button>
//             <StyledMenu
//               id="demo-customized-menu"
//               MenuListProps={{
//                 'aria-labelledby': 'demo-customized-button',
//               }}
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//             >
//               <MenuItem onClick={handleClose} component={NavLink} to={"/communityTrendingMaps"} disableRipple>
              
//                 Trending Map Graphics
//               </MenuItem>
//               <MenuItem onClick={handleClose} component={NavLink} to={"/communityMapIdeas"} disableRipple>
                
//                 Map Graphics Idea
//               </MenuItem>
//               <Divider sx={{ my: 0.5 }} />
//               <MenuItem onClick={handleClose} component={NavLink} to={"/communityQuestions"} disableRipple>
                
//                 Questions
//               </MenuItem>
//               <MenuItem onClick={handleClose} component={NavLink} to={"/communityUserName"} disableRipple>
                
//                 User Name
//               </MenuItem>
              
//             </StyledMenu>
//           </Box>
//           <Box>
//           <CommunitySearchBar disabled />
//             </Box>
//            <Box>
//                 <Button id="post-map-button" variant="contained" component={NavLink}
//                 to={"/communityPostMapGraphic"}>Post</Button>
//            </Box>
//            <Typography color="white" variant="h4">Trending Map Graphics</Typography>
//         <Box
//           data-cy="new-map-graphics-community-homecontainer"
//           sx={{
//             display: "flex-row",
//             width: "3250px",
//             gap: "10px",
//             ml: 5,
//             transition: "transform 0.5s",
//             //transform: `translateX(${scrollAmount}px)`,
//           }}>
            
//             {/* <Grid container spacing="2"> */}
//             {topGraphics.slice(0, 3).map((graphic, index) => (
//             <Paper
//               key={index}
//               elevation={4}
//               data-cy="trending-graphic"
//               sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
//             //   component={NavLink}
//             //   to={"/communityGraphicPost/:"+index}
//             >
//               <img
//                 src={graphic.image}
//                 alt={graphic.title}
//                 style={{ objectFit: "cover", width: "100%", height: "100%" }}
//               />
//             </Paper>
//           ))}
//           {/* </Grid> */}
          
//           </Box>
//           <Typography color="white" variant="h4">Questions</Typography>
//         <Box 
//           sx={{
//             display: "flex-column",
//             width: "3250px",
//             gap: "10px",
//             mt: 5,
//             transition: "transform 0.5s",
//             //transform: `translateX(${scrollAmount}px)`,
//           }}
//           >
            
//             {newQuestions.map((text, index) => (
//               <Typography
//                 variant="h2"
                
//                 sx={{
//                   fontSize: "20px",
//                   color: "#FAFAFA",
//                   mb: 2,
//                   ml: 5,
//                   display: "flex",
//                   flexGrow: "1",
//                   fontWeight: "bold",
//                 }}
//                 component={NavLink}
//                 to={"/communityQuestionPost/:"+index}
//               >
//                 {text}
//               </Typography>
//             ))}
//           </Box>
//           <Typography color="white" variant="h4">Map Ideas</Typography>
//           <Box 
//           sx={{
//             display: "flex-column",
//             width: "3250px",
//             gap: "10px",
//             mt: 5,
//             transition: "transform 0.5s",
//             //transform: `translateX(${scrollAmount}px)`,
//           }}
//           >
            
//             {newIdeas.map((text, index) => (
//               <Typography
//                 variant="h2"
                
//                 sx={{
//                   fontSize: "20px",
//                   color: "#FAFAFA",
//                   mb: 2,
//                   ml: 5,
//                   display: "flex",
//                   flexGrow: "1",
//                   fontWeight: "bold",
//                 }}
//                 component={NavLink}
//                 to={"/communityMapIdeaPost/:index"}
//               >
//                 {text}
//               </Typography>
//             ))}
//           </Box>

//     </div>);
// }
// export default CommunityTwo;


import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Container,
  Paper,
  InputBase,
  Pagination,
  Select, 
  MenuItem 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import { getTop5Trending } from "../../api/graphicsAPI";

// Styled components
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#333', // Customize app bar color
  '& .MuiToolbar-root': {
    justifyContent: 'space-between',
  },
});

const StyledCard = styled(Card)({
  width: '100%',
  boxShadow: '0px 8px 24px rgba(0,0,0,0.1)', // Customize card shadow
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
});

function CommunityTwo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [topGraphics, setTopGraphics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [category, setCategory] = useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    const fetchGraphics = async () => {
      try {
        const data = await getTop5Trending();
        setTopGraphics(data);
      } catch (error) {
        console.error("Error fetching top graphics:", error);
      }
    };

    fetchGraphics();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <Container maxWidth="lg" sx={{ paddingBottom: 4 }}>
      <AppBar position="static" color="default" elevation={0}>
      <StyledToolbar sx={{ color:"black" }}>
        {/* Left side - Title */}
        <Typography variant="h6" noWrap sx={{ display: { xs: 'none', sm: 'block' } }}>
          Trending Map Graphics
        </Typography>

        {/* Center - Search input */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'center' }}>
        <Select
            value={category}
            onChange={handleCategoryChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Select category' }}
            sx={{ mr: 2 }}
          >
            <MenuItem value="">
              Trending Map Graphics
            </MenuItem>
            <MenuItem value={'category1'}>Category 1</MenuItem>
            <MenuItem value={'category2'}>Category 2</MenuItem>
            <MenuItem value={'category2'}>Category 2</MenuItem>
            
            {/* ... other categories */}
          </Select>
          
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>

        {/* Right side - Post button */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Button
  component={Link}
  to={`/communityPostMapGraphic/`}
  variant="contained"
  startIcon={<AddIcon />}
  sx={{ mr: 2 }}
>
  Post
</Button>
        </Box>
      </StyledToolbar>
    </AppBar>
      <Typography variant="h4" align="left" sx={{ my: 4, color: 'white' }}>
        Trending Map Graphics
      </Typography>


      <Grid container spacing={4}>
        {topGraphics
          .filter((graphic) => graphic.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(startIndex, endIndex)
          .map((graphic, index) => (
            <Grid item xs={12} sm={6} md={4} key={graphic.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="140"
                  image={graphic.image}
                  alt={graphic.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {graphic.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <Button size="small" color="primary">
                    More
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Pagination
          count={Math.ceil(topGraphics.length / itemsPerPage)}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Container>
  );
}

export default CommunityTwo;
