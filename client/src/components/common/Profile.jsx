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
  const fileInputRef = React.createRef();
  const navigate = useNavigate();

  const { userId, username, profileImage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState(username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(
    profileImage ||
      "https://www.vecteezy.com/vector-art/1840618-picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector"
  );

  useEffect(() => {
    const fetchPosts = async (id) => {
      try {
        const postings = await profileAPI.getPostings(id);
        setPosts(postings);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchEmail = async () => {
      try {
        const emailData = await profileAPI.getEmail(userId, username);
        setEmail(emailData);
      } catch (error) {
        console.error(error);
      }
    };

    if (username && userId) {
      setProfile(profileImage);
      fetchPosts();
      fetchEmail();
    }
  }, [userId, username]);

  useEffect(() => {
    setNickname(username);
  }, [username]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(URL.createObjectURL(file));
      console.log(URL.createObjectURL(file));
    }
  };

  const handleEditIconClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", profile);
      await profileAPI.updateProfilePicture(userId, username, formData);
      alert("Successfully updated!");
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleCreateMapClick = () => {
    navigate("/map");
  };

  return (
    <ResponsiveContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
          <Card
            sx={{
              mt: 2,
              borderRadius: "20px",
            }}
          >
            <CardActionArea
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
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {Array.isArray(posts) &&
                  posts.map((post, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      image={post.image}
                      alt={`Post ${index}`}
                      sx={{
                        width: "200px",
                        height: "200px",
                        backgroundColor: "grey",
                        margin: "10px",
                      }}
                    />
                  ))}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
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
              InputProps={{
                style: {
                  color: "#FAFAFA",
                  "& .MuiOutlinedInputNotchedOutline": {
                    borderColor: "#FAFAFA",
                  },
                  "&::placeholder": {
                    color: "#FAFAFA",
                  },
                },
              }}
              sx={{
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
              }}
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
              InputProps={{
                style: {
                  color: "#FAFAFA",
                  "& .MuiOutlinedInputNotchedOutline": {
                    borderColor: "#FAFAFA",
                  },
                  "&::placeholder": {
                    color: "#FAFAFA",
                  },
                },
              }}
              sx={{
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
              }}
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
              InputProps={{
                style: {
                  color: "#FAFAFA",
                  "& .MuiOutlinedInputNotchedOutline": {
                    borderColor: "#FAFAFA",
                  },
                  "&::placeholder": {
                    color: "#FAFAFA",
                  },
                },
              }}
              sx={{
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
              }}
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
              InputProps={{
                style: {
                  color: "#FAFAFA",
                  "& .MuiOutlinedInputNotchedOutline": {
                    borderColor: "#FAFAFA",
                  },
                  "&::placeholder": {
                    color: "#FAFAFA",
                  },
                },
              }}
              sx={{
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
              }}
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
