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

import { styled } from "@mui/system";
import { AuthContext } from "../../contexts/AuthContext";
import profileAPI from "../../api/profileAPI";
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

  const generatePath = (postName, postType) => {
    console.log("postname: ", postName);
    console.log("postType: ", postType);
    switch (postType) {
      case "map":
        return `/communityGraphicPost/${postName}`;
      case "Questions":
        return `/communityQuestionPost/${postName}`;
      case "Map Ideas":
        return `/communityMapIdeaPost/${postName}`;
      default:
        return "#";
    }
  };

  const handlePostClick = (postName, postType) => {
    const path = generatePath(postName, postType);
    navigate(path);
  };

  return (
    <ResponsiveContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/**           Welcome, {user}  & create your map button    */}
          <Card sx={{ backgroundColor: "#465065", borderRadius: "20px" }}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#FAFAFA",
                  marginBottom: "30px",
                  marginTop: "30px",
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
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", margin: "10px" }}
              >
                Your Postings on Community
              </Typography>
              <CardContent
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {Array.isArray(posts) &&
                  posts.map((post, index) => (
                    <CardActionArea
                      key={post.id || index}
                      onClick={() =>
                        handlePostClick(post.postName, post.postType)
                      }
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
                        image={
                          post.postImages ||
                          "https://img.favpng.com/18/6/16/earth-globe-black-and-white-clip-art-png-favpng-wSZdMyWbDnwP5h9ds7LZzYwnU.jpg"
                        }
                        alt={`Post ${index}`}
                        sx={{
                          width: "80px",
                          height: "80px",
                          backgroundColor: "grey",
                          margin: "10px",
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            color: "#fafafa",
                            textAlign: "left",
                            fontSize: "24px",
                            fontWeight: "bold",
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
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: "bold",
                fontSize: "38px",
                textAlign: "left",
                color: "#FAFAFA",
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
              sx={{ width: "100%", mt: 3, mb: 2, backgroundColor: "#262931" }}
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
