import React from "react";
import { Box, TextField, Button, Typography, Link } from "@mui/material";

function SignIn() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        className="sign-form"
        height="100vh"
        p={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex="1"
        bgcolor="white"
      >
        <Typography variant="h3" gutterBottom sx={{ marginBottom: "80px" }}>
          TerraCanvas
        </Typography>
        <Box width="70%" marginBottom={2}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            sx={{ marginBottom: "20px" }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: "20px",
              color: "#FAFAFA",
              backgroundColor: "black",
              height: "50px",
            }}
          >
            Sign In
          </Button>
        </Box>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "20px",
          }}
        >
          Don't have an account? <Link href="/signup">Sign up</Link>
        </Typography>
        <Typography variant="body1">
          Do you forget the password? <Link href="/">Forgot?</Link>
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flex="1"
        width="50%"
        height="100%"
        sx={{
          "@media (max-width: 768px)": {
            display: "none",
          },
        }}
      >
        <img
          src="https://picsum.photos/id/58/1280/853.jpg"
          alt="Background"
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
    </Box>
  );
}

export default SignIn;
