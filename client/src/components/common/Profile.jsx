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
  const { userId, username, profileImage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(profileImage);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postings = await profileAPI.getPostings(userId, username);
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
    fetchPosts();
    fetchEmail();
  }, [userId, username]);

  const handleProfileImageChange = (e) => {
    setProfile(e.target.files[0]);
  };

  const handleProfileImageUpload = async () => {
    try {
      await profileAPI.updateProfilePicture(userId, username, profile);
      alert("Successfully updated!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await profileAPI.updateUserDetails(userId, email, nickname, password);
      alert("Successfully updated!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ResponsiveContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: "#465065", borderRadius: "20px" }}>
            <CardActionArea sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                image={profileImage}
                alt="Profile Picture"
                sx={{
                  width: "30%",
                  height: "150px",
                  backgroundColor: "grey",
                  borderRadius: "100%",
                  objectFit: "cover",
                  zIndex: "1",
                }}
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
              ></CardMedia>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#FAFAFA",
                    marginBottom: "30px",
                  }}
                >
                  Welcome, {username}
                </Typography>
                <Button
                  onClick={handleProfileImageUpload}
                  variant="contained"
                  sx={{ backgroundColor: "#262931", marginBottom: "30px" }}
                >
                  Edit Profile Picture
                </Button>
              </CardContent>
            </CardActionArea>
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
                <CardMedia
                  component="img"
                  image={posts.postsImage}
                  alt="Posts"
                  sx={{
                    width: "200px",
                    height: "200px",
                    backgroundColor: "grey",
                    margin: "10px",
                  }}
                />
                <CardMedia
                  component="img"
                  image={posts.postsImage}
                  alt="Posts"
                  sx={{
                    width: "200px",
                    height: "200px",
                    backgroundColor: "grey",
                    margin: "10px",
                  }}
                />
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
                  "& .MuiOutlinedInput-notchedOutline": {
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
              defaultValue={username}
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
                  "& .MuiOutlinedInput-notchedOutline": {
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
              margin="normal"
              InputLabelProps={{
                style: { color: "#FAFAFA" },
              }}
              InputProps={{
                style: {
                  color: "#FAFAFA",
                  "& .MuiOutlinedInput-notchedOutline": {
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
              margin="normal"
              InputLabelProps={{
                style: { color: "#FAFAFA" },
              }}
              InputProps={{
                style: {
                  color: "#FAFAFA",
                  "& .MuiOutlinedInput-notchedOutline": {
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
