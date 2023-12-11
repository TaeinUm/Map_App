import React, { useState, useEffect } from "react";
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
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import CommunitySectionAPI from "../../api/CommunitySectionAPI";
import { useParams } from "react-router-dom";
import { CommunityContext } from "../../contexts/CommunityContextVerTwo";
import { postInfo } from "./CommunityMain";
import { useContext } from "react";
//const mongoose = require('mongoose');

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#333",
  color: "white",
});

const StyledFooter = styled(Paper)(({ theme }) => ({
  backgroundColor: "#333",
  color: "white",
  padding: theme.spacing(3),
  marginTop: "auto",
}));

function Post() {
  const { postType, postId } = useParams();
  const { postComment, getCommentsForAPost } = CommunitySectionAPI;
  const [message, setMessage] = useState("");
  const [postInfo, setPostInfo] = useState({});
  //const { text } = useParams(); // Uncomment this when using in your routing setup
  const actualIndex = 1; // Replace with `const actualIndex = index.replace(/:/g, '');` when useParams is active
  const [commentsBuffer, setCommentsBuffer] = useState([]);
  const [questionTitle, setQuestionTitle] = useState("");
  const [authentification, setAuthentification] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await CommunitySectionAPI.getPostDetails(
          postType,
          postId
        );
        if (!response) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setQuestionTitle(response.postName);
        setPostInfo(response);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();

    const fetchComments = async () => {
      try {
        const comments = await getCommentsForAPost(postId);
        setCommentsBuffer(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();

    if (localStorage.getItem("authentification") === "true") {
      setAuthentification(false);
    }
  }, [getCommentsForAPost, questionTitle]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    const currentTimeSec = new Date();
    try {
      await postComment(
        localStorage.getItem("newUserid"),
        postId,
        currentTimeSec,
        message
      );
      let refreshData = await getCommentsForAPost(postId);
      setCommentsBuffer(refreshData);
      setMessage(""); // Reset message field after submission
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', p: 3, height: "100%" }}>
      <Paper sx={{ my: 2, p: 2, backgroundColor: "#fff" }}>
        <Typography variant="h4" gutterBottom color="black" sx={{marginBottom: "10px", marginTop: "20px"}}>
          {postInfo.postName}
        </Typography>
        <Typography variant="h7" gutterBottom color="gray">
          {postInfo.userId}
        </Typography>
        <br></br>
        <Typography variant="h7" gutterBottom color="gray">
        {new Date(postInfo.postDate).toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }).replace(',', '').replace(/:/g, ':')}
        </Typography>
        <br></br>
        <Typography variant="h7" gutterBottom color="gray">
          {postInfo.postType}
        </Typography>

        <br></br>
        <br></br>
        <hr/>

        <Paper
          elevation={4}
          sx={{ width: "auto", height: "auto", bgcolor: "grey" }}
        >
          <img
            src={postInfo.postImages}
            alt={postInfo.postName}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </Paper>

        <Typography variant="subtitle1" gutterBottom color="white" />
        <Typography
          paragraph
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "1rem",
            textAlign: "left",
            minHeight: "200px"
          }}
        >
          {postInfo.content}
        </Typography>
        <Divider sx={{ my: 2, bgcolor: "black" }} />
        {/* <Typography variant="h4" gutterBottom color="white" sx={{ mt: 3 }}>
          Comments Section
        </Typography> */}

        {/* <Typography variant="h6" gutterBottom color="black" sx={{ textAlign: "left", ml: "5px" }}>
          Comments ({commentsBuffer.length})
        </Typography> */}
        <TextField
          data-cy="comment-textarea"
          id="prompt-textarea"
          multiline
          rows={4}
          placeholder="Write a comment..."
          variant="outlined"
          fullWidth
          value={message}
          onChange={handleMessageChange}
          sx={{
            backgroundColor: "white",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "black" },
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
            disabled={authentification}
            data-cy="comment-button"
            style={{
              backgroundColor: 'black',
              color: 'white',
            }}
          >
            Post Comment
          </Button>
        </Box>

        {/* {commentsBuffer.map((comment, index) => (
          <Typography key={index} sx={{ color: "#FAFAFA", mb: 2, ml: 5 }}>
            {comment.commentContent}
          </Typography>
        ))} */}
        <br></br>
        <Divider sx={{ my: 2, bgcolor: "black" }} />
        <Typography variant="h6" gutterBottom color="black" sx={{ textAlign: "left", ml: "10px", mb: "20px" }}>
          Comments ({commentsBuffer.length})
        </Typography>

        {
  [...commentsBuffer] // Create a shallow copy of the array to avoid mutating the original array
    .sort((a, b) => new Date(b.commentDate) - new Date(a.commentDate)) // Sort by most recent date
    .map((comment, index) => (
      <Paper 
        key={index} 
        sx={{ 
          bgcolor: 'background.paper', 
          mb: 2, 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          width: '100%'
        }}
  >
    <AccountCircleIcon sx={{ mr: 2, color: 'action.active' }} />
    <Box sx={{ textAlign: 'left', width: '100%' }}>
      <Typography fontSize="13px" color="text.secondary">
        {comment.userId || 'Anonymous'}
      </Typography>
      <Typography fontSize="18px" color="text.primary">
        {comment.commentContent}
      </Typography>
      <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
        {new Date(comment.commentDate).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })}
      </Typography>
    </Box>
  </Paper>
))}
      </Paper>
    </Container>
  );
}

export default Post;
