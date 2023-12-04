

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { alpha } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import { getTop5Trending } from "../../api/graphicsAPI";
import { CommunityContext } from "../../contexts/CommunityContextVerTwo";
import { useContext } from "react";
import CommunitySectionAPI from "../../api/CommunitySectionAPI";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
//import { likePost } from '../../../../server/controllers/postController';

let newQuestions = [
  "What should I write in the memo?",
  "Where can I find the map graphics templates that I liked?",
  "what is JSON files?",
];
let questions = [];
let ideas = [];
let graphics = [];
//let userGraphics =[];
// Styled components
const StyledAppBar = styled(AppBar)({
  backgroundColor: "#333", // Customize app bar color
  "& .MuiToolbar-root": {
    justifyContent: "space-between",
  },
});

const StyledCard = styled(Card)({
  width: "100%",
  boxShadow: "0px 8px 24px rgba(0,0,0,0.1)", // Customize card shadow
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  // Removed the width: '100%' to prevent stretching, which can misalign the search bar
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto", // Use 'auto' or set a fixed width if necessary
  },
  display: "flex", // Added display flex
  alignItems: "center", // Added alignItems center for the Search component
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ko-KR', options);
};

const StyledToolbar = styled(Toolbar)({
  justifyContent: "space-between",
});

export var postInfo;

function CommunityTwo() {
  //const [postInfo, setPostInfo] = useState(null);
  const [userGraphics, setUserGraphics] = useState([]);
  const [authentification, setAuthentification] = useState(true);
  const { getAllPosts } = CommunitySectionAPI;
  const [searchTerm, setSearchTerm] = useState("");
  const [topGraphics, setTopGraphics] = useState([]);
  const [questionBuffer, setQuestionBuffer] = useState([]);
  const [trendingBuffer, setTrendingBuffer] = useState([]);
  const [ideasBuffer, setIdeasBuffer] = useState([]);
  //const [allGraphics, setAllGraphics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
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
  const [whiteBar, setWhiteBar] = useState("Trending Map Graphics");
  const handleSearchChange = async (event) => {
   
    if (category === "category3") {
      let total = [];
      let repeat = [];
      let users = [];
      
      users = await getMapsByUsername(event.target.value);
      
      //console.log("what is users: "+JSON.stringify(users[0]));
      for (let user in users) {
        //console.log("What is the user id: "+user._id)
       
        repeat = await getPostsByUserId(users[user]._id);

        total = total.concat(repeat);
        
        setUserGraphics(total);
      }
    }

    setSearchTerm(event.target.value);
  };
  const handleUserSearch = async (e) => {
    if (e === "Enter") {
      if (category === "category3") {
        let repeat = [];
        let users = [];
        
        users = await getMapsByUsername(
          document.getElementById("random-search-bar")
        );

        for (let user in users) {
          repeat = await getPostsByUserId(user);
          userGraphics.concat(repeat);
        }
      }
    }
  };
  function setupQuestionPost(text) {
    updateQuestionTitle(text);
  }
  function setupQuestionLocal(post) {
    localStorage.setItem("postItem", post);
    postInfo = post;
    updatePostInfo(post);
  }

  function setupIdeasLocal(post) {
    if (localStorage.getItem("ideaId") != post._id) {
      localStorage.setItem("questionId", post._id);
    }
    if (localStorage.getItem("ideaContent") != post.content) {
      localStorage.setItem("questioncontent", post.content);
    }
    if (localStorage.getItem("ideaTitle") != post.title) {
      localStorage.setItem("questiontitle", post.title);
    }
  }

  function setupGraphicsLocal(post) {
    if (localStorage.getItem("graphicId") != post._id) {
      localStorage.setItem("graphicId", post._id);
    }
    if (localStorage.getItem("graphicContent") != post.content) {
      localStorage.setItem("graphiccontent", post.content);
    }
    if (localStorage.getItem("graphicTitle") != post.title) {
      localStorage.setItem("graphictitle", post.title);
    }
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    if (event.target.value === "category1") {
      setWhiteBar("Questions");
    } else if (event.target.value === "category3") {
      setWhiteBar("User Name");
    } else if (event.target.value === "") {
      setWhiteBar("Trending Map Graphics");
    } else if (event.target.value === "category2") {
      setWhiteBar("Map Graphics Idea");
    }
   
  };
  function giveALike(userId, postId) {
    let newData = likeMap(userId, postId);
  }
  let newData = "";

  useEffect(() => {
    let newData = [];

    const fetchGraphics = async () => {
      try {
        const data = await getTop5Trending();
        setTopGraphics(data);
        newData = await getAllPosts();
        setUserGraphics(newData);
        //setAllGraphics(newData);
      
        setQuestionBuffer(
          newData.filter((post) => post.postType === "Questions")
        );
        setTrendingBuffer(newData.filter((post) => post.postType === "map"));
        setIdeasBuffer(newData.filter((post) => post.postType === "Map Ideas"));
       
      } catch (error) {
        console.error("Error fetching top graphics:", error);
      }
    };

    fetchGraphics();
    if (localStorage.getItem("authentification") === "true") {
      setAuthentification(false);
    }
   

    //questions = newData.filter(post=>post.types==="Questions");
    // for (let key in newData){
    //   console.log((key));
    // }

    // ideas = newData.filter((post)=>(post.types==="Map Ideas"));
    // graphics = newData.filter((post)=>(post.types==="Map Graphics"));
    // userGraphics = newData.filter((post)=>(post.userId===localStorage.getItem("newUserid")))
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let content = null;

  if (category === "category3") {
    content = (
      <Box>
        <Typography variant="h4" align="left" sx={{ my: 4, color: "white" }}>
          Username Posts
        </Typography>
        <Box
          sx={{
            display: "flex-column",
            width: "100%",
            height: "100%",
            gap: "10px",
            mt: 5,
            transition: "transform 0.5s",
            //transform: `translateX(${scrollAmount}px)`,
          }}
        >
          {userGraphics.map((graphic, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={graphic._id}
              m={2}
              data-cy="community-user-name-graphics"
            >

              
              <StyledCard>
                <Paper
                  key={index}
                  elevation={4}
                  data-cy="trending-graphic"
                  sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
                >
                  <img
                    src={graphic.postImages}
                    alt={graphic.postName}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Paper>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    onMouseEnter={() => setupQuestionLocal(graphic)}
                    component={NavLink}
                    to={"/communityGraphicPost/:" + graphic.postName}
                  >
                    {graphic.postName}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() =>
                      giveALike(localStorage.getItem("newUserid"), graphic._id)
                    }
                  >
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
          {}
        </Box>
      </Box>
    );
  }


  // if (category === "category3") {
  //   content = (
  //     <Box sx={{ mt: 5, maxWidth: "100%" }}>
  //       <Typography variant="h4" align="left" sx={{ mb: 4, color: "white" }}>
  //         User Name
  //       </Typography>
  //       <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
  //         {questionBuffer
  //           .filter(post => post.postName.includes(searchTerm))
  //           .map(post => (

              
  //             <Grid
  //               type="button"
  //               item
  //               xs={12}
  //               sm={6}
  //               sx={{bgcolor : "black"}}
  //               md={4}
  //               key={post._id}
  //               data-cy="community-user-name-graphics"
  //             >

  //               <Box sx={{ display: 'flex', alignItems: 'left' }}>
  //               <img
  //                 src={post.postImages || "https://img.favpng.com/18/6/16/earth-globe-black-and-white-clip-art-png-favpng-wSZdMyWbDnwP5h9ds7LZzYwnU.jpg"}
  //                 alt="Image"
  //                 height="160"
  //                 width="160"
  //                 style={{ borderRadius: '4px',marginBottom : "12px", marginTop : "12px", marginLeft : "12px", marginRight : "20px"}} // 필요에 따라 스타일 조정
  //               />
  //               <Box>

  //                 <Typography
  //                     gutterBottom
  //                     variant="h6"
                      
  //                     sx={{ fontStyle: "none", color: "white", textDecoration: "none", textAlign: "left"}}
  //                     onMouseEnter={() => setupQuestionLocal(post)}
  //                     component={NavLink}
  //                     to={"/communityGraphicPost/:" + post.postName}
  //                     > 
  //                     <Box sx={{ textAlign: 'left', fontWeight: 'bold', marginTop: "20px" }}>
  //                     {post.postName}
  //                     </Box>
                      
  //                   </Typography>

  //                   {/* <Box sx={{ bgcolor: 'black', color: 'white', mb: 2, padding: '16px', borderRadius: '4px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
  //               <Box sx={{ bgcolor: 'lightblue', width: '100px', height: '100px', mr: 2 }} /> */}
  //               <Box sx={{ textAlign: 'left' }}>
  //                 <Typography sx={{ color: 'white', textDecoration: 'none' }}>
  //                   Author: {post.author || "Unknown"}
  //                 </Typography>
  //                 <Typography sx={{ color: 'white', textDecoration: 'none' }}>
  //                   {post.postDate || "Date not available"}
  //                 </Typography>
  //                 <Typography
  //                   sx={{
  //                     color: 'white',
  //                     textDecoration: 'none',
  //                     display: '-webkit-box',
  //                     WebkitLineClamp: 3,
  //                     WebkitBoxOrient: 'vertical',
  //                     overflow: 'hidden',
  //                     textOverflow: 'ellipsis',
  //                   }}
  //                 >
  //                   {post.content || "No content available"}
  //                 </Typography>
  //               </Box>
  //               </Box>
  //             </Box>
  //             </Grid>
  //         ))}
  //       </Box>
  //     </Box>
  //   );
  // }

  if (category === "category1") {
    content = (
      <Box sx={{ mt: 5, maxWidth: "100%" }}>
        <Typography variant="h4" align="left" sx={{ mb: 4, color: "white" }}>
          New Questions
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {questionBuffer
            .filter(post => post.postName.includes(searchTerm))
            .map(post => (

              
              <Grid
                type="button"
                item
                xs={12}
                sm={6}
                sx={{bgcolor : "black"}}
                md={4}
                key={post._id}
                data-cy="questions-buffer"
              >

                <Box sx={{ display: 'flex', alignItems: 'left' }}>
                <img
                  src={post.postImages || "https://img.favpng.com/18/6/16/earth-globe-black-and-white-clip-art-png-favpng-wSZdMyWbDnwP5h9ds7LZzYwnU.jpg"}
                  alt="Image"
                  height="160"
                  width="160"
                  style={{ borderRadius: '4px',marginBottom : "12px", marginTop : "12px", marginLeft : "12px", marginRight : "20px"}} // 필요에 따라 스타일 조정
                />
                <Box>

                  <Typography
                      gutterBottom
                      variant="h6"
                      
                      sx={{ fontStyle: "none", color: "white", textDecoration: "none", textAlign: "left"}}
                      onMouseEnter={() => setupQuestionLocal(post)}
                      component={NavLink}
                      to={"/communityQuestionPost/:" + post.postName}
                      > 
                      <Box sx={{ textAlign: 'left', fontWeight: 'bold', marginTop: "20px" }}>
                      {post.postName}
                      </Box>
                      
                    </Typography>

                    {/* <Box sx={{ bgcolor: 'black', color: 'white', mb: 2, padding: '16px', borderRadius: '4px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <Box sx={{ bgcolor: 'lightblue', width: '100px', height: '100px', mr: 2 }} /> */}
                <Box sx={{ textAlign: 'left' }}>
                  <Typography sx={{ color: 'white', textDecoration: 'none' }}>
                    Author: {post.author || "Unknown"}
                  </Typography>
                  <Typography sx={{ color: 'white', textDecoration: 'none' }}>
                    {post.postDate || "Date not available"}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {post.content || "No content available"}
                  </Typography>
                </Box>
                </Box>
              </Box>
              </Grid>
          ))}
        </Box>
      </Box>
    );
  }
  
  if (category === "category2") {
    content = (
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '10px',
        mt: 5
      }}>
        {ideasBuffer && ideasBuffer.length > 0 && ideasBuffer
    .filter((post) => post.postName.includes(searchTerm))
    .map((post, index) => (
            <Card 
              key={post._id} // 고유한 key를 추가하는 것이 좋습니다.
              sx={{ maxWidth: 345, mb: 2, bgcolor: 'black' }} // bgcolor shorthand 사용
              component={NavLink} 
              to={"/communityMapIdeaPost/:" + post.postName}
              
            >
              <CardMedia
                component="img"
                height="140"
                image={post.postImages || "https://wallpapers.com/images/hd/living-planet-earth-4e6ueybd5ba1mkqp.jpg"}
                alt="Image"
              />
              <CardContent>
              <Typography variant="h5" component="div" sx={{ color: "#FAFAFA", marginBottom: "10px"}}>
                    {post.postName}
                  </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'right' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white' }}>
                  {post.author || "Author"}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'right' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white' , marginBottom: "10px"}}>
                  {post.postDate || "2020-10-12 12AM"}
                  </Typography>
                </Box>
                {/* <Typography variant="body2" sx={{ color: "#FAFAFA", textAlign: 'left' }}>
                    {post.content || "Content content"}
                  </Typography> */}
                  <Typography
                            variant="body2"
                            sx={{
                              color: 'white',
                              textAlign: 'left',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              mb: 2, // margin-bottom을 추가하여 카드의 여백을 조정할 수 있습니다.
                            }}
                          >
                  {post.content || "Content content"}
                </Typography>
  
              </CardContent>
            </Card>
        ))}
      </Box>
    );
  }

  if (category === "") {
    content = (
      <Box>
        <Typography variant="h4" align="left" sx={{ my: 4, color: "white" }}>
          Trending Map Graphics
        </Typography>

        <Grid container spacing={4}>
          {}
          {trendingBuffer
            .filter((graphic) => graphic.postName.includes(searchTerm))
            .slice(startIndex, endIndex)
            .map((graphic, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={graphic._id}
                data-cy="community-trending-graphics"
              >
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="140"
                    image={graphic.postImages}
                    alt={graphic.postName}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      onMouseEnter={() => setupQuestionLocal(graphic)}
                      component={NavLink}
                      to={"/communityGraphicPost/:" + graphic.postName}
                      sx={{textDecoration: "none", color: "black",}}
                    >
                      {graphic.postName}
                      <Typography align="left" sx={{color: "black" }}>
                        Author: Unknown
                      </Typography>

                      <Typography align="left" sx={{color: "black" }}>
                      {formatDate(graphic.postDate)}
                      </Typography>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() =>
                        giveALike(
                          localStorage.getItem("newUserid"),
                          graphic._id
                        )
                      }
                    >
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

        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <Pagination
            data-cy="pagination-trending-graphics"
            count={Math.ceil(graphics.length / itemsPerPage)}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
        <Box>
        <Typography variant="h4" align="left" sx={{ my: 4, color: "white" }}>
          Map Graphic Ideas
        </Typography>
        </Box>

        <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '10px',
        mt: 5
      }}>
        {ideasBuffer && ideasBuffer.length > 0 && ideasBuffer
    .filter((post) => post.postName.includes(searchTerm))
    .map((post, index) => (
            <Card 
              key={post._id} // 고유한 key를 추가하는 것이 좋습니다.
              sx={{ maxWidth: 345, mb: 2, bgcolor: 'black' }} // bgcolor shorthand 사용
              component={NavLink} 
              to={"/communityMapIdeaPost/:" + post.postName}
              
            >
              <CardMedia
                component="img"
                height="140"
                image={post.postImages || "https://wallpapers.com/images/hd/living-planet-earth-4e6ueybd5ba1mkqp.jpg"}
                alt="Image"
              />
              <CardContent>
              <Typography variant="h5" component="div" sx={{ color: "#FAFAFA", marginBottom: "10px"}}>
                    {post.postName}
                  </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'right' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white' }}>
                  {post.author || "Author"}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'right' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white' , marginBottom: "10px"}}>
                  {post.postDate || "2020-10-12 12AM"}
                  </Typography>
                </Box>
                {/* <Typography variant="body2" sx={{ color: "#FAFAFA", textAlign: 'left' }}>
                    {post.content || "Content content"}
                  </Typography> */}
                  <Typography
                            variant="body2"
                            sx={{
                              color: 'white',
                              textAlign: 'left',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              mb: 2, // margin-bottom을 추가하여 카드의 여백을 조정할 수 있습니다.
                            }}
                          >
                  {post.content || "Content content"}
                </Typography>
  
              </CardContent>
            </Card>
        ))}
      </Box>

      </Box>
    );
    
  }

  return (
    <Container maxWidth="lg" sx={{ paddingBottom: 4, height: "100%" }}>
      <AppBar position="static" color="default" elevation={0}>
        <StyledToolbar sx={{ color: "black" }}>
          {/* Left side - Title */}
          <Typography
            data-cy="current-category"
            variant="h6"
            noWrap
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {whiteBar}
          </Typography>

          {/* Center - Search input */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Select
              data-cy="community-select-bar"
              value={category}
              onChange={handleCategoryChange}
              displayEmpty
              inputProps={{ "aria-label": "Select category" }}
              sx={{ mr: 2 }}
            >
              <MenuItem value="">Trending Map Graphics</MenuItem>
              <MenuItem value={"category2"}>Map Graphic Idea</MenuItem>
              <MenuItem value={"category1"} data-cy="question-page">Question</MenuItem>
              <MenuItem value={"category3"} data-cy="user-name">User Name</MenuItem>

              {/* ... other categories */}
            </Select>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                id="random-search-bar"
                data-cy="community-search-bar"
                name="search-posts"
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchChange}
                onKeyDown={handleUserSearch}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    
                    if (category === "category1") {
                     
                      getQuestionsBySearch(searchTerm);
                    }
                    if (category === "category2") {
                      
                      getIdeasBySearch(searchTerm);
                    }
                    if (category === "category3") {
                     
                      getMapsByUsername(searchTerm);
                    }
                    if (category === "") {
                      
                      getMapsBySearch(searchTerm);
                    }
                  }
                }}
              />
            </Search>
          </Box>

          {/* Right side - Post button */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              //onClick={navigateTo('/communityPostMapGraphic/')}
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

export default CommunityTwo;

{
}
