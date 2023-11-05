import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Box, TextField, Button, Typography, Link } from "@mui/material";

function SignIn() {
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginClick = async () => {
    /**   check email regex **/
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(email);

    /**  at least 8 characters with at least one special character **/
    const passwordPattern = /^(?=.*[!@#$%^&*]).{8,}$/;
    const isValidPassword = passwordPattern.test(password);

    if (!isValidEmail) {
      console.error("Not a valid email address");
      alert("Please enter the valid email address.")
      return;
    }
  
    if (!isValidPassword) {
      console.error("Password must be at least 8 characters long and include at least one special character");
      alert("Please enter the valid password. At least 8 characters long and include at least one special character.")
      return;
    }

    if (email && password) {
      handleLogin(email, password);
    } else {
      console.error("Please enter both email and password.");
    }
  };

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
        <Typography
          variant="h3"
          gutterBottom
          sx={{ marginBottom: "80px", fontWeight: "bold" }}
        >
          TerraCanvas
        </Typography>
        <Box width="70%" marginBottom={2}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={handlePasswordChange}
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
            onClick={handleLoginClick}
          >
            {/** replace this to handleLoginClick!!!!!! */}
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
