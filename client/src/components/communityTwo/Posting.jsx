import React, { useState, useContext } from 'react';
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
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
//import AWS from 'aws-sdk';


//const s3 = new AWS.S3();
function CommunityPostMapGraphic() {
  const [postType, setPostType] = useState('Questions');
  const [privacyType, setPrivacyType] = useState('1');
  const { makePost } = CommunitySectionAPI;
  const { uploadPostPicture } = CommunitySectionAPI;
  const navigate = useNavigate();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { username } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file)
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const max_width = 800; // Set the maximum width
          const scaleSize = max_width / img.width;
          const canvas = document.createElement('canvas');
          canvas.width = max_width;
          canvas.height = img.height * scaleSize;
  
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
          canvas.toBlob((blob) => {
            const resizedImage = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            setSelectedImage(resizedImage); // Set the resized image file
            setImagePreview(URL.createObjectURL(resizedImage)); // Set the preview
          }, 'image/jpeg', 0.85); // Adjust the quality parameter as needed
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleCancelImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const handlePostButton = async () => {
    try {
      let imageUrl = '';
  
      if (selectedImage) {
        // 이미지를 Base64로 변환
        const imageBase64 = await convertImageToBase64(selectedImage);
  
        // 변환된 이미지를 업로드
        const response = await uploadPostPicture(localStorage.getItem('newUserid'), imageBase64);
  
        if (response && response.imageUrl) {
          imageUrl = response.imageUrl;
        } else {
          console.error('Error uploading image:', response);
        }
      }
  
      const postPayload = {
        userId: localStorage.getItem('newUserid'),
        userName: username,
        content: document.getElementById('shabi-content').value,
        interactions: 0,
        postType,
        postName: document.getElementById('shabi-title').value,
        visibility: parseInt(privacyType),
        postImages: imageUrl, // 업로드된 이미지 URL 사용
        postDate: new Date().toISOString()
      };
  
      const response = await makePost(postPayload);
      alert('Post created successfully!');
      navigate('/community');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating the post. Please try again.');
    }
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
          backgroundColor: 'white', 
          color: 'black', 
          width: isMobile ? '100%' : '70%',
          maxWidth: isMobile ? 'none' : '1000px',
          margin: 'auto',
          overflow: 'hidden',
        }}
      >
        <Box padding={isMobile ? 1 : 3}> 
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
          <br></br>
          <br></br>

          <Box display="flex" justifyContent="space-between" marginTop="1rem">
      <Button variant="contained" color="primary" style={{
          backgroundColor: 'black',
          color: 'white',
        }} component="label">
        Load Image From Local
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>
    </Box>

    {imagePreview && (
      <Box marginTop="1rem">
        <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        <Button variant="contained" color="secondary" onClick={handleCancelImage} style={{ marginTop: '1rem' }}>
          Cancel Image
        </Button>
      </Box>
    )}


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
          <br></br>
          <br></br>
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
