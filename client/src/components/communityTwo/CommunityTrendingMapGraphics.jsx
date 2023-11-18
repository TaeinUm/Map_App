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

function CommunityTrendingMapGraphics() {
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
    <Container maxWidth="lg" sx={{ paddingBottom: 4, height: "100vh" }}>
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

export default CommunityTrendingMapGraphics;

// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Grid,
//   Container,
//   Paper,
//   InputBase,
//   Pagination,
//   Select, 
//   MenuItem 
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { alpha } from '@mui/material/styles';
// import AddIcon from '@mui/icons-material/Add';
// import ShareIcon from '@mui/icons-material/Share';
// import { Link } from 'react-router-dom';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { styled } from '@mui/material/styles';
// import { getTop5Trending } from "../../api/graphicsAPI";

// // Styled components
// const StyledAppBar = styled(AppBar)({
//   backgroundColor: '#333', // Customize app bar color
//   '& .MuiToolbar-root': {
//     justifyContent: 'space-between',
//   },
// });

// const StyledCard = styled(Card)({
//   width: '100%',
//   boxShadow: '0px 8px 24px rgba(0,0,0,0.1)', // Customize card shadow
// });

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// const StyledToolbar = styled(Toolbar)({
//   justifyContent: 'space-between',
// });

// function CommunityTrendingMapGraphics() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [topGraphics, setTopGraphics] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3;
//   const [category, setCategory] = useState('');

//   const handleCategoryChange = (event) => {
//     setCategory(event.target.value);
//   };

//   useEffect(() => {
//     const fetchGraphics = async () => {
//       try {
//         const data = await getTop5Trending();
//         setTopGraphics(data);
//       } catch (error) {
//         console.error("Error fetching top graphics:", error);
//       }
//     };

//     fetchGraphics();
//   }, []);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   return (
//     <Container maxWidth="lg" sx={{ paddingBottom: 4, height: "100vh" }}>
//       <AppBar position="static" color="default" elevation={0}>
//       <StyledToolbar sx={{ color:"black" }}>
//         {/* Left side - Title */}
//         <Typography variant="h6" noWrap sx={{ display: { xs: 'none', sm: 'block' } }}>
//           Trending Map Graphics
//         </Typography>

//         {/* Center - Search input */}
//         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'center' }}>
//         <Select
//             value={category}
//             onChange={handleCategoryChange}
//             displayEmpty
//             inputProps={{ 'aria-label': 'Select category' }}
//             sx={{ mr: 2 }}
//           >
//             <MenuItem value="">
//               Trending Map Graphics
//             </MenuItem>
//             <MenuItem value={'category1'}>Category 1</MenuItem>
//             <MenuItem value={'category2'}>Category 2</MenuItem>
//             <MenuItem value={'category2'}>Category 2</MenuItem>
            
//             {/* ... other categories */}
//           </Select>
          
          
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </Search>
//         </Box>

//         {/* Right side - Post button */}
//         <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//         <Button
//   component={Link}
//   to={`/communityPostMapGraphic/`}
//   variant="contained"
//   startIcon={<AddIcon />}
//   sx={{ mr: 2 }}
// >
//   Post
// </Button>
//         </Box>
//       </StyledToolbar>
//     </AppBar>
//       <Typography variant="h4" align="left" sx={{ my: 4, color: 'white' }}>
//         Trending Map Graphics
//       </Typography>


//       <Grid container spacing={4}>
//         {topGraphics
//           .filter((graphic) => graphic.title.toLowerCase().includes(searchTerm.toLowerCase()))
//           .slice(startIndex, endIndex)
//           .map((graphic, index) => (
//             <Grid item xs={12} sm={6} md={4} key={graphic.id}>
//               <StyledCard>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={graphic.image}
//                   alt={graphic.title}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h6">
//                     {graphic.title}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <IconButton aria-label="add to favorites">
//                     <FavoriteBorderIcon />
//                   </IconButton>
//                   <IconButton aria-label="share">
//                     <ShareIcon />
//                   </IconButton>
//                   <Button size="small" color="primary">
//                     More
//                   </Button>
//                 </CardActions>
//               </StyledCard>
//             </Grid>
//         ))}
//       </Grid>

//       <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//         <Pagination
//           count={Math.ceil(topGraphics.length / itemsPerPage)}
//           page={currentPage}
//           onChange={(_, page) => setCurrentPage(page)}
//           color="primary"
//           showFirstButton
//           showLastButton
//         />
//       </Box>
//     </Container>
//   );
// }

// export default CommunityTrendingMapGraphics;

// // import React, { useState, useEffect } from 'react';
// // import { NavLink } from 'react-router-dom';
// // import {
// //   AppBar,
// //   Toolbar,
// //   Box,
// //   Typography,
// //   Button,
// //   IconButton,
// //   Card,
// //   CardMedia,
// //   CardContent,
// //   CardActions,
// //   Grid,
// //   Container,
// //   Paper,
// //   InputBase,
// //   Pagination,
// //   Select, 
// //   MenuItem 
// // } from '@mui/material';
// // import SearchIcon from '@mui/icons-material/Search';
// // import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// // import FavoriteIcon from '@mui/icons-material/Favorite';
// // import { alpha } from '@mui/material/styles';
// // import AddIcon from '@mui/icons-material/Add';
// // import ShareIcon from '@mui/icons-material/Share';
// // import { Link } from 'react-router-dom';
// // import LogoutIcon from '@mui/icons-material/Logout';
// // import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// // import { styled } from '@mui/material/styles';
// // import { getTop5Trending } from "../../api/graphicsAPI";

// // // Styled components
// // const StyledAppBar = styled(AppBar)({
// //   backgroundColor: '#333', // Customize app bar color
// //   '& .MuiToolbar-root': {
// //     justifyContent: 'space-between',
// //   },
// // });

// // const StyledCard = styled(Card)({
// //   width: '100%',
// //   boxShadow: '0px 8px 24px rgba(0,0,0,0.1)', // Customize card shadow
// // });

// // const Search = styled('div')(({ theme }) => ({
// //   position: 'relative',
// //   borderRadius: theme.shape.borderRadius,
// //   backgroundColor: alpha(theme.palette.common.white, 0.15),
// //   '&:hover': {
// //     backgroundColor: alpha(theme.palette.common.white, 0.25),
// //   },
// //   marginRight: theme.spacing(2),
// //   marginLeft: 0,
// //   width: '100%',
// //   [theme.breakpoints.up('sm')]: {
// //     marginLeft: theme.spacing(3),
// //     width: 'auto',
// //   },
// // }));

// // const SearchIconWrapper = styled('div')(({ theme }) => ({
// //   padding: theme.spacing(0, 2),
// //   height: '100%',
// //   position: 'absolute',
// //   pointerEvents: 'none',
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'center',
// // }));

// // const StyledInputBase = styled(InputBase)(({ theme }) => ({
// //   color: 'inherit',
// //   '& .MuiInputBase-input': {
// //     padding: theme.spacing(1, 1, 1, 0),
// //     // vertical padding + font size from searchIcon
// //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
// //     transition: theme.transitions.create('width'),
// //     width: '100%',
// //     [theme.breakpoints.up('md')]: {
// //       width: '20ch',
// //     },
// //   },
// // }));

// // const StyledToolbar = styled(Toolbar)({
// //   justifyContent: 'space-between',
// // });

// // function CommunityTrendingMapGraphics() {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [topGraphics, setTopGraphics] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 3;
// //   const [category, setCategory] = useState('');

// //   const handleCategoryChange = (event) => {
// //     setCategory(event.target.value);
// //   };

// //   useEffect(() => {
// //     const fetchGraphics = async () => {
// //       try {
// //         const data = await getTop5Trending();
// //         setTopGraphics(data);
// //       } catch (error) {
// //         console.error("Error fetching top graphics:", error);
// //       }
// //     };

// //     fetchGraphics();
// //   }, []);

// //   const startIndex = (currentPage - 1) * itemsPerPage;
// //   const endIndex = startIndex + itemsPerPage;

// //   return (
// //     <Container maxWidth="lg" sx={{ paddingBottom: 4, height: "100vh" }}>
// //       <AppBar position="static" color="default" elevation={0}>
// //       <StyledToolbar sx={{ color:"black" }}>
// //         {/* Left side - Title */}
// //         <Typography variant="h6" noWrap sx={{ display: { xs: 'none', sm: 'block' } }}>
// //           Trending Map Graphics
// //         </Typography>

// //         {/* Center - Search input */}
// //         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'center' }}>
// //         <Select
// //             value={category}
// //             onChange={handleCategoryChange}
// //             displayEmpty
// //             inputProps={{ 'aria-label': 'Select category' }}
// //             sx={{ mr: 2 }}
// //           >
// //             <MenuItem value="">
// //               Trending Map Graphics
// //             </MenuItem>
// //             <MenuItem value={'category1'}>Category 1</MenuItem>
// //             <MenuItem value={'category2'}>Category 2</MenuItem>
// //             <MenuItem value={'category2'}>Category 2</MenuItem>
            
// //             {/* ... other categories */}
// //           </Select>
          
          
// //           <Search>
// //             <SearchIconWrapper>
// //               <SearchIcon />
// //             </SearchIconWrapper>
// //             <StyledInputBase
// //               placeholder="Search…"
// //               inputProps={{ 'aria-label': 'search' }}
// //             />
// //           </Search>
// //         </Box>

// //         {/* Right side - Post button */}
// //         <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
// //         <Button
// //   component={Link}
// //   to={`/communityPostMapGraphic/`}
// //   variant="contained"
// //   startIcon={<AddIcon />}
// //   sx={{ mr: 2 }}
// // >
// //   Post
// // </Button>
// //         </Box>
// //       </StyledToolbar>
// //     </AppBar>
// //       <Typography variant="h4" align="left" sx={{ my: 4, color: 'white' }}>
// //         Trending Map Graphics
// //       </Typography>


// //       <Grid container spacing={4}>
// //         {topGraphics
// //           .filter((graphic) => graphic.title.toLowerCase().includes(searchTerm.toLowerCase()))
// //           .slice(startIndex, endIndex)
// //           .map((graphic, index) => (
// //             <Grid item xs={12} sm={6} md={4} key={graphic.id}>
// //               <StyledCard>
// //                 <CardMedia
// //                   component="img"
// //                   height="140"
// //                   image={graphic.image}
// //                   alt={graphic.title}
// //                 />
// //                 <CardContent>
// //                   <Typography gutterBottom variant="h6">
// //                     {graphic.title}
// //                   </Typography>
// //                 </CardContent>
// //                 <CardActions>
// //                   <IconButton aria-label="add to favorites">
// //                     <FavoriteBorderIcon />
// //                   </IconButton>
// //                   <IconButton aria-label="share">
// //                     <ShareIcon />
// //                   </IconButton>
// //                   <Button size="small" color="primary">
// //                     More
// //                   </Button>
// //                 </CardActions>
// //               </StyledCard>
// //             </Grid>
// //         ))}
// //       </Grid>

// //       <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
// //         <Pagination
// //           count={Math.ceil(topGraphics.length / itemsPerPage)}
// //           page={currentPage}
// //           onChange={(_, page) => setCurrentPage(page)}
// //           color="primary"
// //           showFirstButton
// //           showLastButton
// //         />
// //       </Box>
// //     </Container>
// //   );
// // }

// // export default CommunityTrendingMapGraphics;

// // import React, { useState, useEffect } from 'react';
// // import { NavLink } from 'react-router-dom';
// // import {
// //   AppBar,
// //   Toolbar,
// //   Box,
// //   Typography,
// //   Button,
// //   IconButton,
// //   Card,
// //   CardMedia,
// //   CardContent,
// //   CardActions,
// //   Grid,
// //   Container,
// //   Paper,
// //   InputBase,
// //   Pagination,
// //   Select, 
// //   MenuItem 
// // } from '@mui/material';
// // import SearchIcon from '@mui/icons-material/Search';
// // import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// // import FavoriteIcon from '@mui/icons-material/Favorite';
// // import { alpha } from '@mui/material/styles';
// // import AddIcon from '@mui/icons-material/Add';
// // import ShareIcon from '@mui/icons-material/Share';
// // import { Link } from 'react-router-dom';
// // import LogoutIcon from '@mui/icons-material/Logout';
// // import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// // import { styled } from '@mui/material/styles';
// // import { getTop5Trending } from "../../api/graphicsAPI";

// // // Styled components
// // const StyledAppBar = styled(AppBar)({
// //   backgroundColor: '#333', // Customize app bar color
// //   '& .MuiToolbar-root': {
// //     justifyContent: 'space-between',
// //   },
// // });

// // const StyledCard = styled(Card)({
// //   width: '100%',
// //   boxShadow: '0px 8px 24px rgba(0,0,0,0.1)', // Customize card shadow
// // });

// // const Search = styled('div')(({ theme }) => ({
// //   position: 'relative',
// //   borderRadius: theme.shape.borderRadius,
// //   backgroundColor: alpha(theme.palette.common.white, 0.15),
// //   '&:hover': {
// //     backgroundColor: alpha(theme.palette.common.white, 0.25),
// //   },
// //   marginRight: theme.spacing(2),
// //   marginLeft: 0,
// //   width: '100%',
// //   [theme.breakpoints.up('sm')]: {
// //     marginLeft: theme.spacing(3),
// //     width: 'auto',
// //   },
// // }));

// // const SearchIconWrapper = styled('div')(({ theme }) => ({
// //   padding: theme.spacing(0, 2),
// //   height: '100%',
// //   position: 'absolute',
// //   pointerEvents: 'none',
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'center',
// // }));

// // const StyledInputBase = styled(InputBase)(({ theme }) => ({
// //   color: 'inherit',
// //   '& .MuiInputBase-input': {
// //     padding: theme.spacing(1, 1, 1, 0),
// //     // vertical padding + font size from searchIcon
// //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
// //     transition: theme.transitions.create('width'),
// //     width: '100%',
// //     [theme.breakpoints.up('md')]: {
// //       width: '20ch',
// //     },
// //   },
// // }));

// // const StyledToolbar = styled(Toolbar)({
// //   justifyContent: 'space-between',
// // });

// // function CommunityTrendingMapGraphics() {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [topGraphics, setTopGraphics] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 3;
// //   const [category, setCategory] = useState('');

// //   const handleCategoryChange = (event) => {
// //     setCategory(event.target.value);
// //   };

// //   useEffect(() => {
// //     const fetchGraphics = async () => {
// //       try {
// //         const data = await getTop5Trending();
// //         setTopGraphics(data);
// //       } catch (error) {
// //         console.error("Error fetching top graphics:", error);
// //       }
// //     };

// //     fetchGraphics();
// //   }, []);

// //   const startIndex = (currentPage - 1) * itemsPerPage;
// //   const endIndex = startIndex + itemsPerPage;

// //   return (
// //     <Container maxWidth="lg" sx={{ paddingBottom: 4 }}>
// //       <AppBar position="static" color="default" elevation={0}>
// //       <StyledToolbar sx={{ color:"black" }}>
// //         {/* Left side - Title */}
// //         <Typography variant="h6" noWrap sx={{ display: { xs: 'none', sm: 'block' } }}>
// //           Trending Map Graphics
// //         </Typography>

// //         {/* Center - Search input */}
// //         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'center' }}>
// //         <Select
// //             value={category}
// //             onChange={handleCategoryChange}
// //             displayEmpty
// //             inputProps={{ 'aria-label': 'Select category' }}
// //             sx={{ mr: 2 }}
// //           >
// //             <MenuItem value="">
// //               Trending Map Graphics
// //             </MenuItem>
// //             <MenuItem value={'category1'}>Category 1</MenuItem>
// //             <MenuItem value={'category2'}>Category 2</MenuItem>
// //             <MenuItem value={'category2'}>Category 2</MenuItem>
            
// //             {/* ... other categories */}
// //           </Select>
          
          
// //           <Search>
// //             <SearchIconWrapper>
// //               <SearchIcon />
// //             </SearchIconWrapper>
// //             <StyledInputBase
// //               placeholder="Search…"
// //               inputProps={{ 'aria-label': 'search' }}
// //             />
// //           </Search>
// //         </Box>

// //         {/* Right side - Post button */}
// //         <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
// //         <Button
// //   component={Link}
// //   to={`/communityPostMapGraphic/`}
// //   variant="contained"
// //   startIcon={<AddIcon />}
// //   sx={{ mr: 2 }}
// // >
// //   Post
// // </Button>
// //         </Box>
// //       </StyledToolbar>
// //     </AppBar>
// //       <Typography variant="h4" align="left" sx={{ my: 4, color: 'white' }}>
// //         Trending Map Graphics
// //       </Typography>


// //       <Grid container spacing={4}>
// //         {topGraphics
// //           .filter((graphic) => graphic.title.toLowerCase().includes(searchTerm.toLowerCase()))
// //           .slice(startIndex, endIndex)
// //           .map((graphic, index) => (
// //             <Grid item xs={12} sm={6} md={4} key={graphic.id}>
// //               <StyledCard>
// //                 <CardMedia
// //                   component="img"
// //                   height="140"
// //                   image={graphic.image}
// //                   alt={graphic.title}
// //                 />
// //                 <CardContent>
// //                   <Typography gutterBottom variant="h6">
// //                     {graphic.title}
// //                   </Typography>
// //                 </CardContent>
// //                 <CardActions>
// //                   <IconButton aria-label="add to favorites">
// //                     <FavoriteBorderIcon />
// //                   </IconButton>
// //                   <IconButton aria-label="share">
// //                     <ShareIcon />
// //                   </IconButton>
// //                   <Button size="small" color="primary">
// //                     More
// //                   </Button>
// //                 </CardActions>
// //               </StyledCard>
// //             </Grid>
// //         ))}
// //       </Grid>

// //       <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
// //         <Pagination
// //           count={Math.ceil(topGraphics.length / itemsPerPage)}
// //           page={currentPage}
// //           onChange={(_, page) => setCurrentPage(page)}
// //           color="primary"
// //           showFirstButton
// //           showLastButton
// //         />
// //       </Box>
// //     </Container>
// //   );
// // }

// // export default CommunityTrendingMapGraphics;

// // import React, { useState, useEffect } from 'react';
// // import { Link, MemoryRouter, Route, Routes, useLocation, NavLink } from 'react-router-dom';
// // import Pagination from '@mui/material/Pagination';
// // import PaginationItem from '@mui/material/PaginationItem';
// // //import { makeStyles } from '@mui/material';
// // import Stack from '@mui/material/Stack';
// // import {Typography, Paper, Button, IconButton, Box, TextField} from '@mui/material';
// // import { getTop5Trending } from "../../api/graphicsAPI";
// // import Menu from '@mui/material/Menu';
// // import MenuItem from '@mui/material/MenuItem';
// // import Divider from '@mui/material/Divider';
// // import { styled, alpha } from '@mui/material/styles';
// // import CommunitySearchBar from './CommunitySearchBar';
// // import {
// //     AiTwotoneHeart,
// //   } from "react-icons/ai";

// // const StyledMenu = styled((props) => (
// //     <Menu
// //       elevation={0}
// //       anchorOrigin={{
// //         vertical: 'bottom',
// //         horizontal: 'right',
// //       }}
// //       transformOrigin={{
// //         vertical: 'top',
// //         horizontal: 'right',
// //       }}
// //       {...props}
// //     />
// //   ))(({ theme }) => ({
// //     '& .MuiPaper-root': {
// //       borderRadius: 6,
// //       marginTop: theme.spacing(1),
// //       minWidth: 180,
// //       color:
// //         theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
// //       boxShadow:
// //         'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
// //       '& .MuiMenu-list': {
// //         padding: '4px 0',
// //       },
// //       '& .MuiMenuItem-root': {
// //         '& .MuiSvgIcon-root': {
// //           fontSize: 18,
// //           color: theme.palette.text.secondary,
// //           marginRight: theme.spacing(1.5),
// //         },
// //         '&:active': {
// //           backgroundColor: alpha(
// //             theme.palette.primary.main,
// //             theme.palette.action.selectedOpacity,
// //           ),
// //         },
// //       },
// //     },
// //   }));

// // const itemsPerPage = 3;

// // // const useStyles = makeStyles(theme => ({
// // //     root: {
// // //         position: "fixed",
// // //         bottom: 0,
// // //         zIndex: 200,
// // //         backgroundColor: "yellow",
// // //         padding: "10px 80px",
// // //         color:"white",
// // //         width:"100%", 
// // //     },
// // //     container:{
// // //         display:"flex",
// // //         justifyContent:"center",
// // //         alignItems:"center",
// // //         color:"white",
// // //     },
// // // })

// // // );

// // //const numPages = {Math.ceil(topGraphics.length / itemsPerPage)};

// // // const data = [
// // //   // Your data array goes here
// // //   // Example: { id: 1, name: 'Item 1' },
// // //   //          { id: 2, name: 'Item 2' },
// // //   //          ...
// // // ];

// // function CommunityTrendingMapGraphics(){
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const handleSearchChange = (event) => {
// //         setSearchTerm(event.target.value);
// //       };
    
// // //     const location = useLocation();
// // //   const query = new URLSearchParams(location.search);
// // //   const page = parseInt(query.get('page') || '1', 2);
// //     const [anchorEl, setAnchorEl] = React.useState(null);
        
// //     const open = Boolean(anchorEl);
// //     const handleClick = (event) => {
// //     setAnchorEl(event.currentTarget);
// //     };
// //     const handleClose = () => {
// //     setAnchorEl(null);
// //     };

  
// //     const [topGraphics, setTopGraphics] = useState([]);
// //     const [currentPage, setCurrentPage] = useState(1);
    
    

// //     useEffect(() => {
// //         const fetchGraphics = async () => {
// //           try {
// //             const data = await getTop5Trending();
            
// //             console.log("Hello");
// //             console.log(data);
// //             setTopGraphics(data);
            
            
// //           } catch (error) {
// //             console.error("Error fetching top graphics:", error);
// //           }
// //         };
    
// //         fetchGraphics();
// //         setCurrentPage(1);
// //       },[]);

// //       const handleDecrease =()=>{
// //         if(currentPage==1){
// //             return;
// //         }else{
// //             const newPage = currentPage - 1;
// //             setCurrentPage(newPage);
// //         }
// //       }
// //       const handleIncrease =()=>{
// //         const numPages = Math.ceil(topGraphics.length/3);
// //         if(currentPage==numPages){
// //             return;
// //         }else{
// //             const newPage = currentPage + 1;
// //             setCurrentPage(newPage);
// //         }
// //       }

// //     //   const handleChangePage = (event, newPage) => {
// //     //     setCurrentPage(newPage);
// //     //   };
// //       let startIndex = (currentPage - 1) * itemsPerPage;
// //   let endIndex = startIndex + itemsPerPage;//>topGraphics.length?(startIndex+itemsPerPage):topGraphics.length;
// //   console.log("What is the startIndex: "+startIndex);
// //   console.log("What is the endIndex: "+endIndex);
// //   console.log("What are the properties of a graphic: "+topGraphics[0]);
// //     //   if (endIndex>=topGraphics.length){
// //     //     endIndex=topGraphics.length;
// //     //   }
// // //   const currentData = topGraphics.slice(startIndex, endIndex);
// // //       const classes=useStyles();
// //     return(
        
// //     //     <div>
// //     //         {/* Display your paginated data here */}
// //     //   {currentData.map((item) => (
// //     //     <Typography key={item.id} variant="body1">
// //     //       {item.name}
// //     //     </Typography>
// //     //   ))}

// //     //   {/* Pagination component */}
// //     //   <Stack spacing={2} mt={3}>
// //     //     <Pagination
// //     //       count={Math.ceil(data.length / itemsPerPage)}
// //     //       page={currentPage}
// //     //       onChange={handleChangePage}
// //     //       color="primary"
// //     //     />
// //     //   </Stack>
// //     //     </div>
// //         // <div id={classes.container}>
// //         //     <div id={classes.root}>
// //         <div>
// //             <Box>
            
// //             <Button
// //               id="demo-customized-button"
// //               aria-controls={open ? 'demo-customized-menu' : undefined}
// //               aria-haspopup="true"
// //               aria-expanded={open ? 'true' : undefined}
// //               variant="contained"
// //               disableElevation
// //               onClick={handleClick}
// //               //endIcon={}
// //             >
// //               Trending Map Graphics
// //             </Button>
// //             <StyledMenu
// //               id="demo-customized-menu"
// //               MenuListProps={{
// //                 'aria-labelledby': 'demo-customized-button',
// //               }}
// //               anchorEl={anchorEl}
// //               open={open}
// //               onClose={handleClose}
// //             >
// //               <MenuItem onClick={handleClose} component={NavLink} to={"/community"} disableRipple>
              
// //                 Community
// //               </MenuItem>
// //               <MenuItem onClick={handleClose} component={NavLink} to={"/communityMapIdeas"} disableRipple>
                
// //                 Map Graphics Idea
// //               </MenuItem>
// //               <Divider sx={{ my: 0.5 }} />
// //               <MenuItem onClick={handleClose} component={NavLink} to={"/communityQuestions"} disableRipple>
                
// //                 Questions
// //               </MenuItem>
// //               <MenuItem onClick={handleClose} component={NavLink} to={"/communityUserName"} disableRipple>
                
// //                 User Name
// //               </MenuItem>
// //             </StyledMenu>
// //           </Box>
// //           <Box>
// //           <CommunitySearchBar onSearchChange={handleSearchChange} />
// //             </Box>
// //            <Box>
// //                 <Button id="post-map-button" variant="contained" component={NavLink}
// //                 to={"/communityPostMapGraphic"}>Post</Button>
// //            </Box>
// //           {topGraphics.slice(startIndex, endIndex).filter((item) =>
// //         item.title.toLowerCase().includes(searchTerm.toLowerCase())
// //       ).map((graphic, index) => (
// //         //key={index} sx={{ mb: 2, position: "relative", width: "48%" }}
// //         // <Box>
// //         // <Typography component={NavLink} to={"/communityGraphicPost/:"+index}>{graphic.title}</Typography>
// //         // <Box sx={{ mb: 2, position: "relative"}}>
            
// //         //     <Box
// //         //       component="img"
// //         //       src="mapImageUrl"
// //         //       sx={{
// //         //         width: "500px",
// //         //         height: "400px",
// //         //         objectFit: "cover",
// //         //         bgcolor: "grey",
// //         //       }}
// //         //     />
          
// //         //   <IconButton
// //         //     sx={{
// //         //       position: "absolute",
// //         //       //top: 4,
// //         //       //left: 2,
// //         //       //right: 10,
// //         //       color: "red",
// //         //     }}
// //         //     aria-label="like"
// //         //   >
// //         //     <AiTwotoneHeart />
// //         //   </IconButton>
// //         // </Box>
// //         // </Box>
            
// //             <Box>
// //             <Typography component={NavLink} to={"/communityGraphicPost/:"+index}>{graphic.title}</Typography>
            
// //             <Paper 
// //               key={index}
// //               elevation={4}
// //               data-cy="trending-graphic"
// //               sx={{ width: "500px", height: "400px", bgcolor: "grey", ml:"500px" }}
// //             //   component={NavLink}
// //               //to={"/communityGraphicPost/:"+index}
// //             >
// //               <img
// //                 src={graphic.image}
// //                 alt={graphic.title}
// //                 style={{ objectFit: "cover", width: "100%", height: "100%" }}
// //               />
// //               <IconButton
// //             sx={{
// //               position: "absolute",
// //             //   top: 8,
// //             //   right: 8,
// //               color: "red",
// //             }}
// //             aria-label="like"
// //           >
// //             <AiTwotoneHeart />
// //           </IconButton>
// //             </Paper>
            
// //             {/* <IconButton
// //             sx={{
// //               position: "absolute",
// //               top: 8,
// //               right: 8,
// //               color: "red",
// //             }}
// //             aria-label="like"
// //           >
// //             <AiTwotoneHeart />
// //           </IconButton> */}
// //             </Box>
            
// //           ))}
// //           <Button onClick={handleDecrease}>{"<"}</Button>
// //           <Button onClick={handleIncrease}>{">"}</Button>
        
// //         </div>
            
// //     );
// // }
// // export default CommunityTrendingMapGraphics;
