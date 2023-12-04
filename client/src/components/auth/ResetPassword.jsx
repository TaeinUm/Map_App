import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import profileAPI from '../../api/profileAPI';
import { PasswordRecoveryContext } from '../../contexts/PasswordRecoveryContext';

const NewPasswordPage = () => {
  const {updateUserPassword} = profileAPI;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {email} = useContext(PasswordRecoveryContext);

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = () => {
    // Implement your password update logic here
    // For this example, you can add validation and update the password on the server
    updateUserPassword(email, confirmPassword);
    alert(`Password updated: ${password}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Set a New Password</h2>
      <form>
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handleChangePassword}
        />
        <br />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
        />
        <br />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default NewPasswordPage;
