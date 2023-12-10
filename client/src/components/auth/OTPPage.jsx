import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordRecoveryContext } from '../../contexts/PasswordRecoveryContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const OTPPage = () => {
  const navigate = useNavigate();
  const { otp } = useContext(PasswordRecoveryContext);
  const [enteredOtp, setEnteredOtp] = useState('');

  const handleChange = (event) => {
    setEnteredOtp(event.target.value);
  };

  const handleSubmit = () => {
    console.log("You have entered the otp: " + enteredOtp);
    console.log("what is the actual otp: " + otp);
    if (enteredOtp == otp) {
      navigate("/NewPasswordPage");
    } else {
      alert("You entered the wrong otp");
    }
  };

  return (
    <Container maxWidth="xs" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      height: '100%'
    }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" style={{ marginBottom: '20px' }}>
            Enter OTP
          </Typography>
          <form>
            <TextField
              label="OTP"
              variant="outlined"
              type="text"
              value={enteredOtp}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: 6 }}
              style={{ marginBottom: '20px' }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmit}
              fullWidth
              style={{
                backgroundColor: 'black',
                color: 'white',
              }}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OTPPage;
