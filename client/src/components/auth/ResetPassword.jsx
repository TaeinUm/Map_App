import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import profileAPI from '../../api/profileAPI';
import { PasswordRecoveryContext } from '../../contexts/PasswordRecoveryContext';

const NewPasswordPage = () => {
  const { updateUserPassword } = profileAPI;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { email } = useContext(PasswordRecoveryContext);

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit =  async () => {
    const update = await updateUserPassword(email, confirmPassword);
    alert("Password updated");
    
  };

  return (
    <Container maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" style={{ marginBottom: '20px' }}>
            Set a New Password
          </Typography>
          <form>
            <TextField
              label="New Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={handleChangePassword}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              fullWidth
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
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewPasswordPage;
