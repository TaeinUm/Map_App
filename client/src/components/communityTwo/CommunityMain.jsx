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

  const [category, setCategory] = useState("All");
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
      <Box sx={{ mt: "20px" }}>
        <Typography sx={{ color: "white", textAlign: "left", ml: "30px", fontSize: "30px" }}>
          Trending Map Graphics
        </Typography>
        <PaginatedPosts
          posts={userGraphics}
          page={userGraphicsPage}
          setPage={setUserGraphicsPage}
          itemsPerPage={3}
        />
      </Box>
      <Box>
        <Typography sx={{ color: "white", textAlign: "left", ml: "30px", fontSize: "30px" }}>
          Questions
        </Typography>
        <PaginatedPosts
          posts={questionBuffer}
          page={questionPage}
          setPage={setQuestionPage}
          itemsPerPage={3}
        />
      </Box>
      <Box>
        <Typography sx={{ color: "white", textAlign: "left", ml: "30px", fontSize: "30px" }}>
          Map Graphics Ideas
        </Typography>
        <PaginatedPosts
          posts={ideasBuffer}
          page={ideasPage}
          setPage={setIdeasPage}
          itemsPerPage={3}
        />
      </Box>
    </>
  );

  const renderMapGraphics = () => (
    <>
    <Typography sx={{ color: "white", textAlign: "left", ml: "30px", fontSize: "30px" }}>
      Trending Map Graphics
    </Typography>
    <PaginatedPosts
      posts={trendingBuffer}
      page={trendingPage}
      setPage={setTrendingPage}
      itemsPerPage={9}
    />
    </>
  );

  const renderQuestion = () => (
    <>
      <Typography sx={{ color: "white", textAlign: "left", ml: "30px", fontSize: "30px" }}>
        Questions
      </Typography>
      <PaginatedPosts
        posts={questionBuffer}
        page={questionPage}
        setPage={setQuestionPage}
        itemsPerPage={9}
      />
    </>
  );

  const renderIdeas = () => (
    <>
      <Typography sx={{ color: "white", textAlign: "left", ml: "30px", fontSize: "30px" }}>
        Map Graphics Idea
      </Typography>
      <PaginatedPosts
        posts={ideasBuffer}
        page={ideasPage}
        setPage={setIdeasPage}
        itemsPerPage={9}
      />
    </>
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
      sx={{
        mt: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: "30px",
        }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{
            borderRadius: "5px",
            width: "85%",
          }}
        >
          <StyledToolbar
            sx={{ color: "black" }}
          >
            {/* <Typography
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
            </Typography> */}
            {/* Dropdown Menu for selecting categories */}
            <Box sx={{ display: "flex", justifyContent: "space-between"}}>
              <Select
                data-cy="community-select-bar"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={handleCategoryChange}
                displayEmpty
                inputProps={{ "aria-label": "Select category" }}
                sx={{ mr: "50px", bgcolor: "white", width: "250px", textAlign: "left" }}
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
                  sx={{ width: "500px" }}
                />
              </Search>
            </Box>
          </StyledToolbar>
        </AppBar>
        <Box sx={{ mt: "13px", mr: "20px" }}>
          <Button
            component={Link}
            to={`/PostMapGraphic/`}
            variant="contained"
            startIcon={<AddIcon />}
            disabled={authentification}
          >
            Post
          </Button>
        </Box>
      </Box>
      <Box>{content}</Box>
    </Container>
  );
}

export default CommunityMain;
