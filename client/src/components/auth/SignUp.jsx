import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { register } from "../../api/authService";

function SignUp() {
  const [name, setName] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNickChange = (event) => {
    setNick(event.target.value);
  };

  /**       onChange handler for email      **/
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (emailError) {
      setEmailError(false);
      setEmailHelperText("");
    }
  };

  /**       onChange handler for pw      **/
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (passwordError) {
      setPasswordError(false);
      setPasswordHelperText("");
    }
  };

  const handleAgreementChange = (event) => {
    setAgreement(event.target.checked);
  };

  const handleSubmit = async () => {
    /**   check email regex **/
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(email);

    /**  at least 8 characters with at least one special character **/
    const passwordPattern = /^(?=.*[!@#$%^&*]).{8,}$/;
    const isValidPassword = passwordPattern.test(password);

    /**  If email is not valid, textField alert error **/
    if (!isValidEmail) {
      setEmailError(true);
      setEmailHelperText("Invalid email address");
      console.error("Not a valid email address");
      return;
    }

    /**  If pw is not valid, textField alert error **/
    if (!isValidPassword) {
      setPasswordError(true);
      setPasswordHelperText("8 chars & include a special char");
      console.error(
        "Password must be at least 8 characters long and include at least one special character"
      );
      return;
    }

    if (!agreement) {
      console.error("You must agree to policy.");
      alert("Please agree to terms and conditions.");
      return;
    }

    if (email && password) {
      try {
        const data = await register(name, nick, email, password);
        if (data) {
          alert("successfully registered. Please login.");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Register failed:", error);
      }
    } else {
      console.error("Sign Up Failed.");
    }
  };

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
              name="name"
              label="Name"
              variant="outlined"
              margin="normal"
              width="50%"
              marginRight="10px"
              onChange={handleNameChange}
            />
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              margin="normal"
              width="50%"
              onChange={handleNickChange}
            />
          </Box>
          <TextField
            error={emailError}
            helperText={emailHelperText}
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            error={passwordError}
            helperText={passwordHelperText}
            fullWidth
            name="password"
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            sx={{ marginBottom: "20px" }}
          />
          <FormControlLabel
            sx={{ marginBottom: "20px" }}
            control={<Checkbox name="agreement" />}
            label="I agree with Dribbble's Terms of Service, Privacy Policy, and default Notification Settings."
            onChange={handleAgreementChange}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
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
