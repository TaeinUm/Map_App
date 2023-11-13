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
  Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { alpha } from '@mui/material/styles';
import ShareIcon from '@mui/icons-material/Share';
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
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: 0,
  width: 'auto',
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function CommunityTrendingMapGraphics() {
  const [searchTerm, setSearchTerm] = useState("");
  const [topGraphics, setTopGraphics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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
      <StyledAppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap sx={{ cursor: 'pointer', flexGrow: 1 }}>
            TERRACANVAS
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => setSearchTerm(event.target.value)}
              value={searchTerm}
            />
          </Search>
          <Button color="inherit" startIcon={<LogoutIcon />}>Logout</Button>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
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
                    Learn More
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
