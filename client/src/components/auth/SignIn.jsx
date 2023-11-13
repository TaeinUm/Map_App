import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Box, TextField, Button, Typography, Link } from "@mui/material";
import PasswordReset from "./modal/PasswordReset";

function SignIn() {
  /***        useContext for handle Login function  ***/
  const { handleLogin } = useContext(AuthContext);

  /****         useState section               ****/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
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

  const handleLoginClick = async () => {
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

    /**  If both valid, attempt login **/
    if (email && password) {
      handleLogin(email, password);
    } else {
      console.error("Please enter both email and password.");
    }
  };

  /**     return      **/
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {/**        sign in form        **/}
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
          {/**        Login button        **/}
          <Button
            variant="contained"
            sx={{
              width: "100%",
              borderRadius: "20px",
              color: "#FAFAFA",
              backgroundColor: "black",
              height: "50px",
            }}
            onClick={handleLoginClick}
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
          Do you forget the password?{" "}
          <Button
            type="button"
            onClick={modalOpen}
            sx={{ textDecoration: "underline" }}
          >
            Forgot?
          </Button>
          <PasswordReset open={isModalOpen} handleClose={modalClose} />
        </Typography>
      </Box>
      {/**        Side Image section        **/}
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
