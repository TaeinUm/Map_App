import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

function PasswordReset({ open, handleClose }) {
  /***       useState section         ***/
  const [resetEmail, setResetEmail] = useState("");

  /***       handle password reset function        ***/
  const handlePasswordResetRequest = async () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail);

    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return;
    }

    handleClose();
    alert(" RESET FUNCTIONALITY IS NEEDED !  not yet :)");
    return;
  };

  /***       modal style       ***/
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "400px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  /****       return      ****/
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography id="password-reset-modal-title" variant="h6" component="h2">
          Reset Your Password
        </Typography>
        <Box id="password-reset-modal-description" sx={{ mt: 2 }}>
          {/**    text field for email address    **/}
          <TextField
            fullWidth
            name="resetEmail"
            label="Email Address"
            variant="outlined"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          {/**      request reset button    **/}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "black", borderRadius: "20px" }}
            onClick={handlePasswordResetRequest}
          >
            Send Reset Link
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PasswordReset;
