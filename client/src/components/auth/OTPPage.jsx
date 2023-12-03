import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { PasswordRecoveryContext } from '../../contexts/PasswordRecoveryContext';
import { useContext } from 'react';

const OTPPage = () => {
  const {otp} = useContext(PasswordRecoveryContext);
  const [enteredOtp, setEnteredOtp] = useState('');
  const handleChange = (event) => {
    setEnteredOtp(event.target.value);
  };

  const handleSubmit = () => {
    // Handle OTP verification or other actions here
    //alert(`Entered OTP: ${otp}`);
    console.log("You have entered the otp: "+enteredOtp);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Enter OTP</h2>
      <form>
        <TextField
          label="OTP"
          variant="outlined"
          type="text"
          value={enteredOtp}
          onChange={handleChange}
          inputProps={{ maxLength: 6 }}
        />
        <br />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default OTPPage;