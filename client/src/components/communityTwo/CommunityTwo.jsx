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

let newQuestions = ["What should I write in the memo?", "Where can I find the map graphics templates that I liked?", "what is JSON files?"];
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
  // Removed the width: '100%' to prevent stretching, which can misalign the search bar
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto', // Use 'auto' or set a fixed width if necessary
  },
  display: 'flex', // Added display flex
  alignItems: 'center', // Added alignItems center for the Search component
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
            <MenuItem value={'category2'}>Map Graphic Idea</MenuItem>
            <MenuItem value={'category1'}>Question</MenuItem>
            <MenuItem value={'category2'}>User Name</MenuItem>
            
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

      <Typography variant="h4" align="left" sx={{ my: 4, color: 'white' }}>
        New Questions:
      </Typography>
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
                component={NavLink}
                to={"/communityQuestionPost/:"+index}
              >
                {text}
              </Typography>
            ))}
          </Box>
    </Container>

    
  );
}

export default CommunityTwo;

