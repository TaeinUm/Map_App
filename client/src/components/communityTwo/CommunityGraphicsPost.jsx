// import React, { useState, useEffect} from "react";
// import {Box, Typography, TextField, Button, Paper, Divider, IconButton, Container} from "@mui/material";
// import { getTop5Trending } from "../../api/graphicsAPI";
// import { useParams } from 'react-router-dom';
// import {
//     AiTwotoneHeart,
//   } from "react-icons/ai";


// function CommunityGraphicPost() {
//     const [topGraphics, setTopGraphics] = useState([]);
//     const [message, setMessage] = useState('');
//     const {index} = useParams();
//     let actualIndex=index.replace(/:/g, '');


//   const handleMessageChange = (event) => {
//     setMessage(event.target.value);
//   };

//   const handleSubmit = () => {
//     // Handle your submission logic here
//     console.log('Submitted message:', message);
//   };
//   useEffect(() => {
//     const fetchGraphics = async () => {
//       try {
//         const data = await getTop5Trending();
        
//         console.log("Hello");
//         console.log(data);
//         setTopGraphics(data);
        
//       } catch (error) {
//         console.error("Error fetching top graphics:", error);
//       }
//     };

//     fetchGraphics();
//   },[]);
//   let graphic=topGraphics[actualIndex];
// //   let title=topGraphics[actualIndex].title;
// //   let image=topGraphics[actualIndex].image;
//   console.log("What is the graphic's properties: "+graphic);

// {/* <Box>
//                 <Typography>Hello</Typography>
//                 <TextField
//         id="prompt-textarea"
//         multiline
//         rows={1}
//         placeholder="Send a message"
//         variant="outlined"
//         fullWidth
//         value={message}
//         onChange={handleMessageChange}
//         InputProps={{
//           classes: {
//             root: 'm-0 w-full resize-none border-0 bg-transparent py-2 pr-2',
//             notchedOutline: 'border-transparent',
//           },
//           style: { maxHeight: '200px', height: '116px', overflowY: 'hidden' },
//         }}
//         inputProps={{
//             'data-id': 'request-:R3apdm:-49',
//           tabIndex: '0',
//         }}
//       />
//       <Box>
//         A map idea goes here
//       </Box>
        
//       {/* <Paper
//               key={0}
//               elevation={4}
//               data-cy="trending-graphic"
//               sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
//             >
//               <img
//                 src={topGraphics[0]}
//                 alt={topGraphics[0]}
//                 style={{ objectFit: "cover", width: "100%", height: "100%" }}
//               />
//             </Paper> */}
//     //   <Button variant="contained" color="primary" onClick={handleSubmit}>
//     //     Submit
//     //   </Button>
//     //             {/* <textarea id="prompt-textarea" tabindex="0" data-id="request-:R3apdm:-49" rows="1" placeholder="Send a message" class="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 gizmo:md:py-3.5 gizmo:placeholder-black/50 gizmo:dark:placeholder-white/50 pl-3 md:pl-4" style="max-height: 200px; height: 116px; overflow-y: hidden;"></textarea> */}
//     //         </Box>
            
//     //         Hi there you are on the community two map ideas posting page */}

//     return(
//         <div> 
//             <Container sx={{display: 'flex-row',
//     justifyContent: 'center',
//     alignItems: 'center',}}>
//             <Typography variant="h3" color="white">Hello</Typography>
//             <Typography variant="h5" color="white">User 1 2023.4.29</Typography>
//             <Divider sx={{ my: 0.5, height:5 }} />
            
//             <Paper 
//               key={index}
//               elevation={4}
//               data-cy="trending-graphic"
//               sx={{ width: "500px", height: "400px", bgcolor: "grey", justifyContent: 'center',
//               alignItems: 'center', ml:"325px"}}
//             //   component={NavLink}
//               //to={"/communityGraphicPost/:"+index}
//             >
//               {/* <img
//                 src={graphic.image}
//                 alt={graphic.title}
//                 style={{ objectFit: "cover", width: "100%", height: "100%" }}
//               /> */}
//               <IconButton
//             sx={{
//               position: "relative",
//             //   top: 8,
//             //   right: 8,
//               color: "red",
//             }}
//             aria-label="like"
//           >
//             <AiTwotoneHeart />
//           </IconButton>
//             </Paper>
              
//             <Divider sx={{ my: 0.5, height:5 }} />
//             <TextField
//         id="prompt-textarea"
//         multiline
//         rows={1}
//         placeholder="Send a message"
//         variant="outlined"
//         fullWidth
//         value={message}
//         onChange={handleMessageChange}
//         InputProps={{
//           classes: {
//             root: 'm-0 w-full resize-none border-0 bg-transparent py-2 pr-2',
//             notchedOutline: 'border-transparent',
//           },
//           style: { maxHeight: '200px', height: '116px', overflowY: 'hidden' },
//         }}
//         inputProps={{
//           'data-id': 'request-:R3apdm:-49',
//           tabIndex: '0',
//         }}
//       />
//       <Button variant="contained" color="primary" onClick={handleSubmit}>
//         Submit
//       </Button>
//             <Typography color="white">User4 Just Random Phrases</Typography>
//             <Typography color="white">User4 Just Random Phrases</Typography>
//             <Typography color="white">User4 Just Random Phrases</Typography>
//             <Typography color="white">User4 Just Random Phrases</Typography>
//             </Container>
//         </div>
//     );
// }

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
import { postInfo } from './CommunityTwo';
import { useContext } from 'react';
import { FiShare, FiTrash } from "react-icons/fi";
//const mongoose = require('mongoose');



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

function CommunityGraphicPost() {
  const {postComment, getCommentsForAPost, deleteComment} = CommunitySectionAPI;
  const [message, setMessage] = useState('');
  //const { text } = useParams(); // Uncomment this when using in your routing setup
  const actualIndex = 1; // Replace with `const actualIndex = index.replace(/:/g, '');` when useParams is active
  const {questionTitle, postInfo} = useContext(CommunityContext);
  const [actualTitle, setActualTitle] = useState("");
  const [commentsBuffer, setCommentsBuffer] = useState([]);
  const [authentification, setAuthentification] = useState(true);
  //const cleanedText= text.replace(/:/g, '');
  //let commentsBuffer = [];//getCommentsForAPost(postInfo._id);

  useEffect(() => {
    // if(postInfo===null){
    //   console.log("There is no record of postInfo");
    //   return;
    // }
    let newData = [];
    //let postId = localStorage.getItem("questionId");
    //console.log("What is the postId "+postId);
    let postItemInfo = localStorage.getItem("postItem");
    console.log("Do I have access to the CommunityTwo postInfo state variable: "+postInfo+"postId: "+postInfo._id+"postName: "+postInfo.postName);
    //let string = ""+postId;
    const fetchGraphics = async () => {
      try {
        newData= await getCommentsForAPost(postInfo._id);
        setCommentsBuffer(newData);
        //commentsBuffer = newData;
        console.log("Do I have any items: " +JSON.stringify(newData));
        
        //setAllGraphics(newData);
        // console.log("How many graphics are there in total: "+newData.length);
        // console.log("is it possible "+newData[0].types);
        // questions = newData.filter(post=>post.postType==="Questions");
        // graphics = newData.filter(post=>post.postType==="map");
        // console.log("What is the length of questions: "+ questions.length);
      } catch (error) {
        console.error("Error fetching top graphics:", error);
      }
    };

    fetchGraphics();
    if (localStorage.getItem("authentification")==="true"){
      setAuthentification(false);
    }
    //let mongooseId = new mongoose.Types.ObjectId(localStorage.getItem("questionId"));
    


    //setActualTitle(questionTitle);
  }, []);

  
  

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const deleteCommentNow = async (commentId) => {
    if(!localStorage.getItem("authentification")){
      alert("You have not signed in yet");
    }else{
      if(postInfo.userId!==localStorage.getItem("newUserid")){
        alert("You can not delete another user's comment");
      }else{
        let deletedData=await deleteComment(commentId);
        let newerData= await getCommentsForAPost(postInfo._id);
        setCommentsBuffer(newerData);
      }
    }

  };

  const handleSubmit = async () => {
    // Handle your submission logic here
    const currentTimeSec = new Date();//date.getSeconds();
    console.log("what is the current id: "+localStorage.getItem("newUserid"));
    console.log("I hope that I get false: "+localStorage.getItem("authentification"));
    //console.log("Do I have any items: " +commentsBuffer.length);
    postComment(localStorage.getItem("newUserid"), postInfo._id, currentTimeSec, document.getElementById("prompt-textarea").value);
    console.log('Submitted message:', message);
    let refreshData= await getCommentsForAPost(postInfo._id);
    setCommentsBuffer(refreshData);
  };

  console.log("What is the question title" + questionTitle);

  return (
    <Container maxWidth="md" sx={{ p: 3,  height: "100%"}}>

    <Paper sx={{ my: 2, p: 2, backgroundColor: '#333' }}>
      <Typography variant="h4" gutterBottom color="white">
        {postInfo.postName}
      </Typography>

      <Paper
              
              elevation={4}
              data-cy="trending-graphic"
              sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
            //   component={NavLink}
            //   to={"/communityGraphicPost/:"+index}
            >
              <img
                src={postInfo.postImages}
                alt={postInfo.postName}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Paper>

      <Typography variant="subtitle1" gutterBottom color="white">
        
      </Typography>
      <Divider sx={{ my: 2, bgcolor: 'white' }} />
      <br></br>
      <Typography paragraph style={{ backgroundColor: 'white', color: 'black', padding: '1rem', textAlign:'left'}}>
        {postInfo.content}

        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>



      </Typography>
      <Divider sx={{ my: 2, bgcolor: 'white' }} />
        <Typography variant="h6" gutterBottom color="white">
          Comments ({commentsBuffer.length})
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
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }} disabled={authentification}>
          Post Comment
        </Button>
        <br></br>
        <br></br><br></br>

        <Typography variant="h4" gutterBottom color="white">
           Comments Section
      </Typography>
      {commentsBuffer.map((comment) => (
        <Box>
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
                {comment.commentContent}
              </Typography>
              <IconButton onClick={(e)=>{deleteCommentNow(comment._id)}}>
                <FiTrash/>
              </IconButton>
              </Box>
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

export default CommunityGraphicPost;