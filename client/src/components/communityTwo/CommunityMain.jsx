import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Card,
  Container,
  InputBase,
  Pagination,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { styled, alpha } from "@mui/material/styles";
import CommunitySectionAPI from "../../api/CommunitySectionAPI";
import { CommunityContext } from "../../contexts/CommunityContextVerTwo";
import { getTop5Trending } from "../../api/graphicsAPI";
import PaginatedPosts from "./PaginatedPosts";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#333",
  "& .MuiToolbar-root": { justifyContent: "space-between" },
});

const StyledCard = styled(Card)({
  width: "100%",
  boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
}));

const StyledToolbar = styled(Toolbar)({ justifyContent: "space-between" });

function CommunityMain() {
  const [authentification, setAuthentification] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [userGraphics, setUserGraphics] = useState([]);
  const [allPostings, setAllPostings] = useState([]);
  const [questionBuffer, setQuestionBuffer] = useState([]);
  const [trendingBuffer, setTrendingBuffer] = useState([]);
  const [ideasBuffer, setIdeasBuffer] = useState([]);

  const [userGraphicsPage, setUserGraphicsPage] = useState(1);
  const [trendingPage, setTrendingPage] = useState(1);
  const [questionPage, setQuestionPage] = useState(1);
  const [ideasPage, setIdeasPage] = useState(1);
  const [usernamePage, setUsernamePage] = useState(1);

  const [category, setCategory] = useState("all");
  const [whiteBar, setWhiteBar] = useState("All");
  const { getAllPosts } = CommunitySectionAPI;

  const {
    navigateTo,
    updatePostIdAndNavigate,
    setQuestionTitle,
    setQuestionContent,
    questionTitle,
    updateQuestionTitle,
    updatePostInfo,
  } = useContext(CommunityContext);

  const {
    getMapsByUsername,
    getQuestionsBySearch,
    getIdeasBySearch,
    getMapsBySearch,
    likeMap,
    getPostsByUserId,
  } = CommunitySectionAPI;

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const topGraphics = await getTop5Trending();
        setUserGraphics(topGraphics);

        const data = await CommunitySectionAPI.getAllPosts();

        setAllPostings(data);
        setQuestionBuffer(data.filter((post) => post.postType === "Questions"));
        setTrendingBuffer(data.filter((post) => post.postType === "map"));
        setIdeasBuffer(data.filter((post) => post.postType === "Map Ideas"));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllPosts();
    if (localStorage.getItem("isAuthenticated") === "true") {
      setAuthentification(false);
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setWhiteBar(event.target.value);
  };

  const renderAllPosts = () => (
    <>
      <PaginatedPosts
        posts={userGraphics}
        page={userGraphicsPage}
        setPage={setUserGraphicsPage}
        itemsPerPage={3}
      />
      <PaginatedPosts
        posts={questionBuffer}
        page={questionPage}
        setPage={setQuestionPage}
        itemsPerPage={3}
      />
      <PaginatedPosts
        posts={ideasBuffer}
        page={ideasPage}
        setPage={setIdeasPage}
        itemsPerPage={3}
      />
    </>
  );

  const renderMapGraphics = () => (
    <PaginatedPosts
      posts={trendingBuffer}
      page={trendingPage}
      setPage={setTrendingPage}
      itemsPerPage={9}
    />
  );

  const renderQuestion = () => (
    <PaginatedPosts
      posts={questionBuffer}
      page={questionPage}
      setPage={setQuestionPage}
      itemsPerPage={9}
    />
  );

  const renderIdeas = () => (
    <PaginatedPosts
      posts={ideasBuffer}
      page={ideasPage}
      setPage={setIdeasPage}
      itemsPerPage={9}
    />
  );

  const renderAllUserName = () => (
    <PaginatedPosts
      posts={allPostings}
      page={usernamePage}
      setPage={setUsernamePage}
      itemsPerPage={9}
    />
  );

  let content = null;

  switch (category) {
    case "All":
      content = renderAllPosts();
      break;
    case "Trending Map Graphics":
      content = renderMapGraphics();
      break;
    case "Questions":
      content = renderQuestion();
      break;
    case "Map Ideas":
      content = renderIdeas();
      break;
    case "User Name":
      content = renderAllUserName();
      break;
    default:
      content = renderAllPosts();
  }

  return (
    <Container
      maxWidth="100%"
      sx={{
        paddingBottom: 4,
        margin: "10px",
        marginBottom: "50px",
      }}
    >
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderRadius: "5px" }}
      >
        <StyledToolbar sx={{ color: "black" }}>
          <Typography
            data-cy="current-category"
            variant="h6"
            noWrap
            sx={{
              display: { xs: "none", sm: "block" },
              color: "black",
              width: "300px",
              textAlign: "left",
            }}
          >
            {whiteBar}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
              justifyContent: "center",
            }}
          >
            {/* Dropdown Menu for selecting categories */}
            <Select
              data-cy="community-select-bar"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              onChange={handleCategoryChange}
              displayEmpty
              inputProps={{ "aria-label": "Select category" }}
              sx={{ mr: 2, bgcolor: "white", width: "200px" }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Trending Map Graphics">
                Trending Map Graphics
              </MenuItem>
              <MenuItem value="Questions">Questions</MenuItem>
              <MenuItem value="Map Ideas">Map Graphics Idea</MenuItem>
              <MenuItem value="User Name">User Name</MenuItem>
            </Select>

            {/* Search Bar */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Search>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              component={Link}
              to={`/PostMapGraphic/`}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mr: 2 }}
              disabled={authentification}
            >
              Post
            </Button>
          </Box>
        </StyledToolbar>
      </AppBar>
      {content}
    </Container>
  );
}

export default CommunityMain;
