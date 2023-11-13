import React, { useState } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, TextField, Button, Paper } from '@mui/material';
import FileLoader from './FileLoader';

function CommunityPostMapGraphic() {
  const [postType, setPostType] = useState('Map Graphics');

  return (
    <Paper style={{ padding: '2rem', backgroundColor: '#212121', color: 'white', margin: '2rem' }}>
      <Typography variant="h5" gutterBottom>Type</Typography>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="post-type"
          name="postType"
          value={postType}
          onChange={(event) => setPostType(event.target.value)}
        >
          <FormControlLabel value="Map Graphics" control={<Radio />} label="Map Graphics" />
          <FormControlLabel value="Map Ideas" control={<Radio />} label="Map Ideas" />
          <FormControlLabel value="Questions" control={<Radio />} label="Questions" />
        </RadioGroup>
      </FormControl>

      <Typography variant="h5" gutterBottom style={{ marginTop: '1rem' }}>Title</Typography>
      <TextField 
        fullWidth 
        variant="outlined" 
        placeholder="Enter the title of your post here" 
        style={{ backgroundColor: 'white' }}
      />

      <Typography variant="h5" gutterBottom style={{ marginTop: '1rem' }}>Content</Typography>
      <TextField 
        fullWidth 
        multiline 
        rows={10} 
        variant="outlined" 
        placeholder="Enter the content of your post here" 
        style={{ backgroundColor: 'white' }}
      />


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

      <Box textAlign="center" marginTop="4rem" paddingBottom="1rem">
        <Typography variant="caption">
          TERRACANVAS - Terms and Conditions Privacy Policy Contact
        </Typography>
      </Box>
    </Paper>
  );
}

export default CommunityPostMapGraphic;

