import React, { useState } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CommunitySectionAPI from '../../api/CommunitySectionAPI';
import { useNavigate } from 'react-router-dom';

function CommunityPostMapGraphic() {
  const [postType, setPostType] = useState('Questions');
  const [privacyType, setPrivacyType] = useState('1');
  const { makePost } = CommunitySectionAPI;
  const navigate = useNavigate();

  // Material-UI 테마 훅을 사용하여 현재 테마 접근
  const theme = useTheme();
  // 현재 화면이 모바일 크기인지 확인하는 미디어 쿼리 훅
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  function handlePostButton() {
    // Post button event handler logic
    const currentTimeSec = new Date();
    makePost(
      localStorage.getItem('newUserid'),
      document.getElementById('shabi-content').value,
      0,
      postType,
      document.getElementById('shabi-file').files[0],
      document.getElementById('shabi-title').value,
      parseInt(privacyType),
      document.getElementById('shabi-file').files[0],
      currentTimeSec
    );
    alert('You are being directed to the community landing page');
    navigate('/community');
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={isMobile ? 0 : 3} // 모바일에서 패딩 제거
    >
      <Paper
        elevation={6}
        style={{
          padding: isMobile ? 0 : '2rem',
          backgroundColor: 'white', // 배경색을 흰색으로 변경
          color: 'black', // 텍스트 색상을 검은색으로 변경 (가독성을 위해)
          width: isMobile ? '100%' : '70%',
          maxWidth: isMobile ? 'none' : '800px',
          margin: 'auto',
          overflow: 'hidden',
        }}
      >
        <Box padding={isMobile ? 1 : 3}> {/* 모바일에서는 패딩을 줄임 */}
          <Typography variant="h5" gutterBottom style={{ textAlign: 'left' }}>
            Title
          </Typography>
          <TextField
            id="shabi-title"
            fullWidth
            variant="outlined"
            placeholder="Enter the title of your post here"
            style={{ backgroundColor: 'white' }}
          />

          <Typography variant="h5" gutterBottom style={{ textAlign: 'left', marginTop: '20px' }}>
            Post Type
          </Typography>
          <FormControl component="fieldset" style={{ width: '100%', textAlign: 'left' }}>
            <RadioGroup
              row
              aria-label="post-type"
              name="postType"
              value={postType}
              onChange={(event) => setPostType(event.target.value)}
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
            >
              <FormControlLabel value="0" control={<Radio />} label="Private" />
              <FormControlLabel value="1" control={<Radio />} label="Public" />
            </RadioGroup>
          </FormControl>

          <Typography variant="h5" gutterBottom style={{ textAlign: 'left', marginTop: '20px' }}>
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

          <Box display="flex" justifyContent="space-between" marginTop="1rem">
           <Button variant="contained" color="primary" style={{
               backgroundColor: 'black',
               color: 'white',
             }} component="label">
             Load From Storage
           </Button>
         </Box>

          <Box display="flex" justifyContent="space-between" marginTop="1rem">
            <Button variant="contained" color="primary" style={{
                backgroundColor: 'black',
                color: 'white', 
              }} component="label">
              Load Local Files
              <input id="shabi-file" type="file" hidden />
            </Button>
          </Box>
          
          <Box display="flex" justifyContent="center" marginTop="1rem">
            <Button variant="contained" color="secondary" size="large" style={{
                backgroundColor: 'black',
                color: 'white',
              }} onClick={handlePostButton}>
              Post
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default CommunityPostMapGraphic;
