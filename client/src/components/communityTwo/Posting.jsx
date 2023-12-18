import React, { useState, useContext, useEffect } from 'react';
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
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { FiTrash } from "react-icons/fi";
import mapServiceAPI from '../../api/mapServiceAPI';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloudUpload from '@mui/icons-material/CloudUpload';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';

//const s3 = new AWS.S3();
function CommunityPostMapGraphic() {
  const [postType, setPostType] = useState('map');
  const [privacyType, setPrivacyType] = useState('1');
  const { makePost } = CommunitySectionAPI;
  const { uploadPostPicture } = CommunitySectionAPI;
  const navigate = useNavigate();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { username } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedImage__, setSelectedImage__] = useState(null);
  const [selectedMap, setSelectedMap] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [mapListData, setMapListData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const { userId } = useContext(AuthContext);
  const [postContent, setPostContent] = useState("");

  const handleOpenModal =  async () => {
    setIsModalOpen(true);

    try {
      const userInfo = await mapServiceAPI.getUserMapGraphics(userId);
      console.log("Hello")
      console.log(userInfo)
      
      if (Array.isArray(userInfo)) {
        setMapListData(userInfo);
        console.log(userInfo)
      }
    } catch (error) {
      console.error("Error fetching map graphics:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleMapItemClick = async (mapItem) => {
    setSelectedMap(mapItem); // 선택된 맵 데이터 저장
    
    const jsonDownloadLink = createJSONDownloadLink(mapItem); // 맵 데이터를 JSON으로 변환하고 URL 생성
    console.log("Selected Map:", mapItem);
    console.log("JSON Download Link:", jsonDownloadLink);
  
    const imageUrl = mapItem.image; // 맵 이미지 URL
    if (imageUrl) {
      setImagePreview(imageUrl); // 이미지 프리뷰 설정
      console.log(imageUrl)
      setSelectedImage(imageUrl)
      console.log("Selected: ", selectedImage)
      setSelectedImage__(1)
    }

    setIsModalOpen(false); // 모달 닫기

  };

  const createJSONDownloadLink = (mapData) => {
    const jsonString = JSON.stringify(mapData);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    return url;
  };

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
    setSelectedMap(null);
    setSelectedImage__(0)
  };

function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    // 파일이 Blob 타입인지 확인
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    } else {
     
      reject('File is not a Blob');
    }
  });
}


  const handlePostButton = async () => {
    
    if (!postContent.trim()) {
      alert('Please enter some content for your post.');
      return;
    }
    
    try {
      let imageUrl = '';
      if (selectedImage__ === 1){
        imageUrl=selectedImage;
      }
      else{
        if (selectedImage) {
          const imageBase64 = await convertImageToBase64(selectedImage);
          const response = await uploadPostPicture(localStorage.getItem('newUserid'), imageBase64);
    
          if (response && response.imageUrl) {
            imageUrl = response.imageUrl;
          } else {
            console.error('Error uploading image:', response);
          }
        }
      }
      
      
  
      const postPayload = {
        userId: localStorage.getItem('newUserid'),
        userName: username,
        content: document.getElementById('shabi-content').value,
        interactions: 0,
        postType,
        attachedFile: selectedMap,
        postName: document.getElementById('shabi-title').value,
        visibility: parseInt(privacyType),
        postImages: imageUrl,
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
      p={isMobile ? 0 : 3}
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
            {/* <RadioGroup
              row
              aria-label="privacy-type"
              name="privacyType"
              value={privacyType}
              onChange={(event) => setPrivacyType(event.target.value)}
            >
              <FormControlLabel value="0" control={<Radio />} label="Private" />
              <FormControlLabel value="1" control={<Radio />} label="Public" />
            </RadioGroup> */}
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
            value={postContent} // 상태와 연결
            onChange={(e) => setPostContent(e.target.value)}
          />
          <br></br>
          <br></br>

          <Box display="flex" justifyContent="space-between" marginTop="1rem">
      <Button variant="contained" color="primary" style={{
          backgroundColor: 'black',
          color: 'white',
        }} component="label">
           <PhotoCamera />
           <Typography variant="body1" sx={{ marginLeft: "10px"}}>
           Load Image From Local
          </Typography>
        
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>
    </Box>

    {imagePreview && (
      
      <Box marginTop="1rem">
        <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', marginRight: "20px" }} />
        <Button variant="contained" color="secondary" onClick={handleCancelImage} style={{ marginTop: '1rem' }}>
          Cancel Image
        </Button>
      </Box>
      
    )}


          <Box display="flex" justifyContent="space-between" marginTop="1rem">
           <Button onClick={handleOpenModal} variant="contained" color="primary" style={{
               backgroundColor: 'black',
               color: 'white',
             }} component="label">
              <CloudUpload />
              <Typography variant="body1" sx={{ marginLeft: "10px"}}>
              Load Image From Storage
          </Typography>
            
           </Button>
         </Box>

         <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
  <DialogTitle>Load Map Graphic From Storage</DialogTitle>
  <DialogContent>
    {mapListData.filter(mapItem => mapItem.privacy === "public") // privacy가 1인 맵 아이템만 필터링
      .map((mapItem, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", my: 3 }}
          onClick={() => handleMapItemClick(mapItem)}
        >
          <Box
            sx={{ width: 60, height: 60, bgcolor: "grey", mr: 2 }}
          >
            <img
              src={mapItem.image}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              alt={mapItem.mapName}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textAlign: "left", marginLeft: "30px" }}
          >
            {mapItem.mapName}
          </Typography>
          <IconButton size="small">
            <FiTrash />
          </IconButton>
        </Box>
    ))}
  </DialogContent>
</Dialog>


          <Box display="flex" justifyContent="space-between" marginTop="1rem">
            <Button variant="contained" color="primary" style={{
                backgroundColor: 'black',
                color: 'white', 
              }} component="label">
                <InsertDriveFile />

                <Typography variant="body1" sx={{ marginLeft: "10px"}}>
                Load Local Files
          </Typography>
              
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
