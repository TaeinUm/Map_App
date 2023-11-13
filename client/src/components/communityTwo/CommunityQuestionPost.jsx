import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Paper,
  Container,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';


const StyledAppBar = styled(AppBar)({
  backgroundColor: '#333',
  color: 'white',
});

const StyledFooter = styled(Paper)(({ theme }) => ({
  backgroundColor: '#333',
  color: 'white',
  padding: theme.spacing(3),
  marginTop: 'auto',
}));

function CommunityQuestionPost() {
  const [message, setMessage] = useState('');
  // const { index } = useParams(); // Uncomment this when using in your routing setup
  const actualIndex = 1; // Replace with `const actualIndex = index.replace(/:/g, '');` when useParams is active

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    // Handle your submission logic here
    console.log('Submitted message:', message);
  };

  return (
    <Container maxWidth="md" sx={{ p: 3 }}>

      <Paper sx={{ my: 2, p: 2, backgroundColor: '#333' }}>
        <Typography variant="h4" gutterBottom color="white">
          What should I write in the memo?
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="white">
          User1 2023.05.10
        </Typography>
        <Divider sx={{ my: 2, bgcolor: 'white' }} />
        <br></br>
        <Typography paragraph color="white">
          Hi, I have a question. What do you guys usually jot down in your memo?
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </Typography>
        <Divider sx={{ my: 2, bgcolor: 'white' }} />
        <Typography variant="h6" gutterBottom color="white">
          Comments (0)
        </Typography>
        {/* Comment list here */}
        <Typography paragraph color="white">
        </Typography>
        {/* ... more comments ... */}
      
        <TextField
          id="prompt-textarea"
          multiline
          rows={4}
          placeholder="Write a comment..."
          variant="outlined"
          fullWidth
          value={message}
          onChange={handleMessageChange}
          sx={{ color: 'white',
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },

            }
          }}
        />
        <br></br>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Post Comment
        </Button>
      </Paper>

    </Container>
  );
}

export default CommunityQuestionPost;
