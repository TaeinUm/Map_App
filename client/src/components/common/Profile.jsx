import React from "react";
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
  const userData = {
    email: "user@example.com",
    nickname: "User1",
    profileImage: "",
    postsImage: "",
  };

  return (
    <ResponsiveContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: "#465065", borderRadius: "20px" }}>
            <CardActionArea sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                image={userData.profileImage}
                alt="Profile Picture"
                sx={{
                  width: "30%",
                  backgroundColor: "grey",
                }}
              />
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
                  Welcome, {userData.nickname}
                </Typography>
                <Button
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
                  image={userData.postsImage}
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
                  image={userData.postsImage}
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
              fullWidth
              label="Email"
              defaultValue={userData.email}
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
              fullWidth
              label="Nickname"
              defaultValue={userData.nickname}
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
              fullWidth
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
              fullWidth
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
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#262931" }}
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
