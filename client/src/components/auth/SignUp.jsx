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
import { register } from "../../api/authAPI";
import SignUpImage from '../../assets/images/SignUpImage.png';

function SignUp() {
  /****       useState section      ****/
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  /** useNavigate */
  const navigate = useNavigate();

  /****       onChange handler for name      ****/
  const handleNameChange = (event) => {
    setName(event.target.value);
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

  /****       onChange handler for agreement      ****/
  const handleAgreementChange = (event) => {
    setAgreement(event.target.checked);
  };

  /****       register button      ****/
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
    /****       if user x agree to the policy, alert error      ****/
    if (!agreement) {
      console.error("You must agree to policy.");
      alert("Please agree to terms and conditions.");
      return;
    }

    /****       If everything's valid, attempt register      ****/
    if (email && password) {
      try {
        const data = await register(name, email, password);
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

  /****       return      ****/
  return (
    <Box
      className="sign-container"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {/**        Side Image section        **/}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flex="1"
        width="50%"
        height="100vh" // Set the height of the container
        sx={{
          "@media (max-width: 768px)": {
            display: "none",
          },
        }}
      >
        <img
          src={SignUpImage}
          alt="Background"
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
      {/**        sign up form        **/}
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
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", mb: "60px" }}>
          TerraCanvas
        </Typography>
        <Box width="70%">
          <Box display="flex" justifyContent="space-between" marginBottom={1}>
            {/**        textfield for name        **/}
            <TextField
              fullWidth
              name="name"
              label="Name"
              variant="outlined"
              onChange={handleNameChange}
            />
          </Box>
          {/**        textfield for email        **/}
          <TextField
            error={emailError}
            helperText={emailHelperText}
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          {/**        textfield for pw        **/}
          <TextField
            error={passwordError}
            helperText={passwordHelperText}
            name="password"
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          {/**        agreement form        **/}
          <FormControlLabel
            sx={{ marginBottom: "20px" }}
            control={<Checkbox name="agreement" />}
            label="I agree with Dribbble's Terms of Service, Privacy Policy, and default Notification Settings."
            onChange={handleAgreementChange}
          />
          {/**        register button        **/}
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              width: "100%",
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
