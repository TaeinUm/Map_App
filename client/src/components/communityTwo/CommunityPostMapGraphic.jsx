import React, { useState } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, TextField, Button, Paper } from '@mui/material';
import FileLoader from './FileLoader';
import CommunitySectionAPI from '../../api/CommunitySectionAPI';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
//const mongoose = require('mongoose');
//import { loginUser } from '../../../../server/controllers/userController';
//const session = require('express-session');
//var newId = new mongoose.mongo.ObjectId();
//let hardCodedUserIds = [newId];
function CommunityPostMapGraphic() {
  const [postType, setPostType] = useState("Questions");
  const [privacyType, setPrivacyType] = useState("1");
  const {makePost} = CommunitySectionAPI;
  const navigate = useNavigate();
  //const {userEmail} = AuthContext;

  function handlePostButton(){
    console.log(document.getElementById("shabi-title").value);
    console.log(document.getElementById("shabi-content").value);
    console.log("Do I got a userid "+localStorage.getItem("newUserid"));
    //let mongooseId = new mongoose.Types.ObjectId(localStorage.getItem("newUserid"));
    //console.log("Is there a userEmail: "+userEmail);
    //console.log("What is the userId from post: "+newId);
    const currentTimeSec = new Date();
    makePost(localStorage.getItem("newUserid"), document.getElementById("shabi-content").value, 0, postType, document.getElementById("shabi-file").files[0], document.getElementById("shabi-title").value, parseInt(privacyType), document.getElementById("shabi-file").files[0], currentTimeSec);
    alert("You are being directed to the community landing page");
    navigate("/community");
  }

  return (
    <Paper style={{ padding: '2rem', backgroundColor: '#212121', color: 'white', margin: '2rem' }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'left' }}>
        Type
      </Typography>
      <FormControl component="fieldset" style={{ width: '100%', textAlign: 'left' }}>
  <RadioGroup
    row
    aria-label="post-type"
    name="postType"
    value={postType}
    onChange={(event) => setPostType(event.target.value)}
    sx={{ justifyContent: 'flex-start', width: '100%', alignItems: 'flex-start' }} // Align items to the start on the cross-axis
  >
    <FormControlLabel value="map" control={<Radio />} label="Map Graphics" />
    <FormControlLabel value="Map Ideas" control={<Radio />} label="Map Ideas" />
    <FormControlLabel value="Questions" control={<Radio />} label="Questions" />
  </RadioGroup>
  <RadioGroup
    row
    aria-label="privacy-type"
    name="privacyType"
    value={privacyType}
    onChange={(event) => setPrivacyType(event.target.value)}
    sx={{ justifyContent: 'flex-start', width: '100%', alignItems: 'flex-start' }} // Align items to the start on the cross-axis
  >
    <FormControlLabel value="0" control={<Radio />} label="Private" />
    <FormControlLabel value="1" control={<Radio />} label="Public" />
    
  </RadioGroup>
</FormControl>

<br></br>
<br></br>
<br></br>


    <Typography variant="h5"  gutterBottom style={{ textAlign: 'left' }}>
        Title
      </Typography>
      <TextField 
        id="shabi-title"
        
        fullWidth 
        variant="outlined" 
        placeholder="Enter the title of your post here" 
        style={{ backgroundColor: 'white' }}
      />
<br></br>
<br></br>
  <br></br>
<Typography variant="h5" gutterBottom style={{ textAlign: 'left' }}>
        Contents
      </Typography>
      <TextField 
        id="shabi-content"
        fullWidth 
        multiline 
        rows={10} 
        variant="outlined" 
        placeholder="Enter the content of your post here" 
        style={{ backgroundColor: 'white' }}
      />

<br></br>
<br></br>
<br></br>

      <Box display="flex" justifyContent="space-between" marginTop="1rem">
        <Button variant="contained" color="primary" component="label">
          Load Local Files
          <input id="shabi-file" type="file" hidden />
        </Button>
        <Button variant="contained" color="primary" component="label">
          Load From Storage
          {/* Implement storage loading functionality */}
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" marginTop="1rem">
        <Button variant="contained" color="secondary" size="large" onClick={handlePostButton}>
          Post
        </Button>
      </Box>
    </Paper>
  );
}

export default CommunityPostMapGraphic;

