import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { FiTrash } from "react-icons/fi";
import placeholder from "../../assets/images/TerraCanvas_placeholder_image.png"

import { styled } from "@mui/system";
import { AuthContext } from "../../contexts/AuthContext";
import profileAPI from "../../api/profileAPI";
import CommunitySectionAPI from "../../api/CommunitySectionAPI";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

// Styled component for container
const ResponsiveContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
  },
}));

const Profile = () => {
  // React.createRef, useNavigate, useContext section
  const fileInputRef = React.createRef();
  const navigate = useNavigate();
  const { userId, username, profileImage } = useContext(AuthContext);

  // useState section
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState(username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(
    profileImage ||
      "https://www.vecteezy.com/vector-art/1840618-picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector"
  );

  // styles
  const textFieldStyle = {
    style: {
      color: "#FAFAFA",
      "& .MuiOutlinedInputNotchedOutline": {
        borderColor: "#FAFAFA",
      },
      "&::placeholder": {
        color: "#FAFAFA",
      },
    },
  };

  const textFieldsx = {
    width: "100%",
    "& label.Mui-focused": {
      color: "#FAFAFA",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FAFAFA",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FAFAFA",
      },
    },
    "& .MuiInputBase-input": {
      "&::placeholder": {
        color: "#FAFAFA",
        opacity: 1,
      },
    },
  };

  /****         useEffect section       *****/
  useEffect(() => {
    //fetch user's postings
    const fetchPosts = async (id) => {
      try {
        const postings = await profileAPI.getPostings(id);
        setPosts(postings);
      } catch (error) {
        console.error(error);
      }
    };
    //fetch user's email
    const fetchEmail = async () => {
      try {
        const emailData = await profileAPI.getEmail(userId, username);
        setEmail(emailData);
      } catch (error) {
        console.error(error);
      }
    };

    //check if the user's logged in (has username and id)
    if (username && userId) {
      setProfile(profileImage);
      fetchPosts(userId);
      fetchEmail();
    }
  }, [userId, username]);

  useEffect(() => {
    setNickname(username);
  }, [username]);

  // when Save Changes button's clicked
  const handleSaveChanges = async () => {
    if (!email || !username || !password || !confirmPassword) {
      alert("please completely fill up the form.");
      return;
    }

    if (password !== confirmPassword) {
      alert("password doesn't match!");
      return;
    }

    try {
      await profileAPI.updateUserDetails(userId, email, nickname, password);
      alert("Successfully updated!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  // when Create Your Map button's clicked
  const handleCreateMapClick = () => {
    navigate("/map");
  };

  const generatePath = (postId, postType) => {
    switch (postType) {
      case "map":
        return `/posts/map/${postId}`;
      case "Questions":
        return `/posts/Questions/${postId}`;
      case "Map Ideas":
        return `/posts/Map%20Ideas/${postId}`;
      default:
        return "#";
    }
  };

  const handlePostClick = (postId, postType) => {
    const path = generatePath(postId, postType);
    navigate(path);
  };

  const handleDeletePost = async (event, postId) => {
    event.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    try {
      await CommunitySectionAPI.deleteAllComment(postId);
      await CommunitySectionAPI.deletePost(postId);

      setPosts(posts.filter((post) => post._id !== postId));
      alert("Post deleted successfully.");
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <ResponsiveContainer
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // Align items to the start to prevent stretching to full viewport height
        minHeight: "100vh", // Use minHeight instead of height
        m: "30px",
        mt: "50px",
        mb: "50px",
      }}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} paddingRight={"10px"}>
          {/**           Welcome, {user}  & create your map button    */}
          <Card sx={{ backgroundColor: "#465065", borderRadius: "20px" }}>
            <CardContent>
              <Typography
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#FAFAFA",
                  marginBottom: "30px",
                  marginTop: "30px",
                  fontSize: "35px",
                }}
              >
                Welcome, {username}
              </Typography>
              <Button
                onClick={handleCreateMapClick}
                variant="contained"
                sx={{
                  width: "250px",
                  backgroundColor: "#262931",
                  marginBottom: "30px",
                }}
              >
                Create Your Map
              </Button>
            </CardContent>
          </Card>

          {/**           User's Postings on Community       */}
          <Card
            sx={{
              mt: 2,
              borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                height: "600px",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "2",
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginTop: "10px",
                    height: "100px",
                    color: "black",
                  }}
                >
                  Your Postings on Community
                </Typography>
              </Box>
              <CardContent
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "scroll",
                }}
              >
                {Array.isArray(posts) &&
                  posts.map((post, index) => (
                    <CardActionArea
                      key={post.id || index}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "90%",
                        height: "100px",
                        backgroundColor: "#465065",
                        margin: "10px",
                        borderRadius: "5px",
                        zIndex: "2",
                      }}
                    >
                      <CardMedia
                        onClick={() => handlePostClick(post._id, post.postType)}
                        image={post.postImages || placeholder}
                        alt={`Post ${index}`}
                        sx={{
                          width: "80px",
                          height: "80px",
                          backgroundColor: "grey",
                          margin: "10px",
                        }}
                      />
                      <Box
                        onClick={() => handlePostClick(post._id, post.postType)}
                        sx={{
                          display: "flex",
                          width: "80%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              color: "#fafafa",
                              textAlign: "left",
                              fontSize: "24px",
                              fontWeight: "bold",
                              maxWidth: "250px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {post.postName}
                          </Typography>
                          <Typography
                            sx={{ color: "#fafafa", textAlign: "left" }}
                          >
                            {(() => {
                              const date = new Date(post.postDate);
                              const year = date.getFullYear();
                              const month = date.getMonth() + 1;
                              const day = date.getDate();

                              const formattedMonth =
                                month < 10 ? `0${month}` : month;
                              const formattedDay = day < 10 ? `0${day}` : day;

                              return `${year}-${formattedMonth}-${formattedDay}`;
                            })()}
                          </Typography>
                          <Typography
                            sx={{ color: "#fafafa", textAlign: "left" }}
                          >
                            comments: {post.interactions}
                          </Typography>
                        </Box>
                        <Button
                          onClick={(event) => handleDeletePost(event, post._id)}
                          sx={{
                            marginRight: "0",
                            color: "#fafafa",
                            zIndex: "4",
                          }}
                        >
                          <FiTrash />
                        </Button>
                      </Box>
                    </CardActionArea>
                  ))}
              </CardContent>
            </Box>
          </Card>
        </Grid>

        {/**           Profile Edit   (User Information Change section)       */}
        <Grid item xs={12} sm={6}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              backgroundColor: "#465065",
              padding: "40px",
              borderRadius: "20px",
            }}
          >
            <Typography
              sx={{
                mb: 2,
                fontWeight: "bold",
                fontSize: "38px",
                textAlign: "left",
                color: "#FAFAFA",
                fontSize: "30px",
              }}
            >
              Profile Edit
            </Typography>
            <TextField
              label="Email"
              defaultValue={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                style: { color: "#FAFAFA" },
              }}
              InputProps={textFieldStyle}
              sx={textFieldsx}
            />

            <TextField
              label="Username"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                style: { color: "#FAFAFA" },
              }}
              InputProps={textFieldStyle}
              sx={textFieldsx}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              margin="normal"
              InputLabelProps={{
                style: { color: "#FAFAFA" },
              }}
              InputProps={textFieldStyle}
              sx={textFieldsx}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              margin="normal"
              InputLabelProps={{
                style: { color: "#FAFAFA" },
              }}
              InputProps={textFieldStyle}
              sx={textFieldsx}
            />
            <Button
              type="submit"
              onClick={handleSaveChanges}
              variant="contained"
              sx={{ width: "100%", mt: 3, mb: 2, backgroundColor: "#262931", p: 1 }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ResponsiveContainer>
  );
};

export default Profile;
