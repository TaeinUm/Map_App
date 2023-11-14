import React, { useState } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, TextField, Button, Paper } from '@mui/material';
import FileLoader from './FileLoader';

function CommunityPostMapGraphic() {
  const [postType, setPostType] = useState('Map Graphics');

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
    <FormControlLabel value="Map Graphics" control={<Radio />} label="Map Graphics" />
    <FormControlLabel value="Map Ideas" control={<Radio />} label="Map Ideas" />
    <FormControlLabel value="Questions" control={<Radio />} label="Questions" />
  </RadioGroup>
</FormControl>

<br></br>
<br></br>
<br></br>


    <Typography variant="h5" gutterBottom style={{ textAlign: 'left' }}>
        Title
      </Typography>
      <TextField 
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
          <input type="file" hidden />
        </Button>
        <Button variant="contained" color="primary" component="label">
          Load From Storage
          {/* Implement storage loading functionality */}
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" marginTop="1rem">
        <Button variant="contained" color="secondary" size="large">
          Post
        </Button>
      </Box>
    </Paper>
  );
}

export default CommunityPostMapGraphic;

