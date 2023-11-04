import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

function SignUp() {
  return (
    <Box
      className="sign-container"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flex="1"
        width="50%"
        sx={{
          "@media (max-width: 768px)": {
            display: "none",
          },
        }}
      >
        <img
          src="https://picsum.photos/id/43/1280/831.jpg"
          alt="Background"
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
      <Box
        className="sign-form"
        p={3}
        display="flex"
        height="100vh"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex="1"
        bgcolor="white"
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
          TerraCanvas
        </Typography>
        <Box width="70%">
          <Box display="flex" justifyContent="space-between" marginBottom={1}>
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              width="50%"
              marginRight="10px"
            />
            <TextField
              label="Username"
              variant="outlined"
              margin="normal"
              width="50%"
            />
          </Box>
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
          <FormControlLabel
            sx={{ marginBottom: "20px" }}
            control={<Checkbox name="agreement" />}
            label="I agree with Dribbble's Terms of Service, Privacy Policy, and default Notification Settings."
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: "20px",
              color: "#FAFAFA",
              backgroundColor: "black",
              marginBottom: "20px",
              height: "50px",
            }}
          >
            Create Account
          </Button>
        </Box>
        <Typography variant="body1">
          Already have an account? <Link href="/signin">Sign In</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default SignUp;
