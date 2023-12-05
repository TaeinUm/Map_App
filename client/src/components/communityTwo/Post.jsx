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
    <Container maxWidth="md" sx={{ p: 3, height: "100%" }}>
      <Paper sx={{ my: 2, p: 2, backgroundColor: "#333" }}>
        <Typography variant="h4" gutterBottom color="white">
          {postInfo.postName}
        </Typography>

        <Paper
          elevation={4}
          sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
        >
          <img
            src={postInfo.postImages}
            alt={postInfo.postName}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </Paper>

        <Typography variant="subtitle1" gutterBottom color="white" />
        <Divider sx={{ my: 2, bgcolor: "white" }} />
        <Typography
          paragraph
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "1rem",
            textAlign: "left",
          }}
        >
          {postInfo.content}
        </Typography>
        <Divider sx={{ my: 2, bgcolor: "white" }} />
        <Typography variant="h4" gutterBottom color="white" sx={{ mt: 3 }}>
          Comments Section
        </Typography>

        <Typography variant="h6" gutterBottom color="white">
          Comments ({commentsBuffer.length})
        </Typography>
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
              "& fieldset": { borderColor: "white" },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          disabled={authentification}
          data-cy="comment-button"
        >
          Post Comment
        </Button>

        {commentsBuffer.map((comment, index) => (
          <Typography key={index} sx={{ color: "#FAFAFA", mb: 2, ml: 5 }}>
            {comment.commentContent}
          </Typography>
        ))}
      </Paper>
    </Container>
  );
}

export default Post;
