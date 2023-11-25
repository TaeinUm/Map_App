import React, { useState, useEffect } from 'react';
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
import CommunitySectionAPI from '../../api/CommunitySectionAPI';
import { useParams } from 'react-router-dom';
import { CommunityContext } from '../../contexts/CommunityContextVerTwo';
const mongoose = require('mongoose');


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
  const {postComment, getCommentsForAPost} = CommunitySectionAPI;
  const [message, setMessage] = useState('');
  //const { text } = useParams(); // Uncomment this when using in your routing setup
  const actualIndex = 1; // Replace with `const actualIndex = index.replace(/:/g, '');` when useParams is active
  const {questionTitle} = CommunityContext;
  const [actualTitle, setActualTitle] = useState("");
  //const cleanedText= text.replace(/:/g, '');
  let commentsBuffer = [];

  useEffect(() => {
    let postId = localStorage.getItem("questionId");
    console.log("What is the postId "+postId);
    let string = ""+postId;
    //let mongooseId = new mongoose.Types.ObjectId(localStorage.getItem("questionId"));
    commentsBuffer = getCommentsForAPost(postId);


    //setActualTitle(questionTitle);
  }, []);

  

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    // Handle your submission logic here
    const currentTimeSec = new Date();//date.getSeconds();
    console.log("what is the current id: "+localStorage.getItem("newUserid"));
    postComment(localStorage.getItem("newUserid"), localStorage.getItem("questionId"), currentTimeSec, document.getElementById("prompt-textarea").value);
    console.log('Submitted message:', message);
  };

  console.log("What is the question title" + questionTitle);

  return (
    <Container maxWidth="md" sx={{ p: 3,  height: "100vh"}}>

    <Paper sx={{ my: 2, p: 2, backgroundColor: '#333' }}>
      <Typography variant="h4" gutterBottom color="white">
        {localStorage.getItem("questionTitle")}
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="white">
        
      </Typography>
      <Divider sx={{ my: 2, bgcolor: 'white' }} />
      <br></br>
      <Typography paragraph style={{ backgroundColor: 'white', color: 'black', padding: '1rem', textAlign:'left'}}>
        {localStorage.getItem("questionContent")}

        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>



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
  sx={{
    backgroundColor: 'white', // Set the background color to white
    color: 'black', // Set the text color to black
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' },
      '&:hover fieldset': { borderColor: 'white' },
      '&.Mui-focused fieldset': { borderColor: 'white' },
    },
    '& .MuiInputBase-input': {
      color: 'black', // Ensure the text color is black
    },
  }}
/>

        <br></br><br></br>
        <br></br>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Post Comment
        </Button>
        <br></br>
        <br></br><br></br>

        <Typography variant="h4" gutterBottom color="white">
           Comments Section
      </Typography>
      {commentsBuffer.map((comment) => (
              <Typography
                variant="h2"
                //onClick={setupQuestionLocal(post)}
                sx={{
                  fontSize: "20px",
                  color: "#FAFAFA",
                  mb: 2,
                  ml: 5,
                  display: "flex",
                  flexGrow: "1",
                  fontWeight: "bold",
                }}
                //onClick={updatePostIdAndNavigate(index, '/communityQuestionPost/:'+index)}
                
              >
                {comment.content}
              </Typography>
            ))}
      {/* {commentsBuffer.map((content, index) => (
              <Typography
                variant="h2"
                
                sx={{
                  fontSize: "20px",
                  color: "#FAFAFA",
                  mb: 2,
                  ml: 5,
                  display: "flex",
                  flexGrow: "1",
                  fontWeight: "bold",
                }}
                //onClick={updatePostIdAndNavigate(index, '/communityQuestionPost/:'+index)}
                
              >
                {content}
              </Typography>
            ))} */}
      </Paper>

    </Container>
  );
  
}

export default CommunityQuestionPost;
