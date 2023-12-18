import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  CardContent,
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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import mapboxgl from 'mapbox-gl';

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
  const [isLiked, setIsLiked] = useState(false);
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
        const userId = localStorage.getItem("newUserid");
        setIsLiked(response.likes.includes(userId));
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

  const { username } = useContext(AuthContext);

  const handleSubmit = async () => {
    const currentTimeSec = new Date();
    try {
      await postComment(
        localStorage.getItem("newUserid"),
        postId,
        username,
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

  const handleDownloadJson = () => {
    if (postInfo.attachedFile) {
      try {
        // 맵 데이터를 JSON 형식으로 변환
        const mapData = postInfo.attachedFile;
        const blob = new Blob([JSON.stringify(mapData, null, 2)], {
          type: "application/json",
        });
        const url = window.URL.createObjectURL(blob);
        triggerDownload(url, "mapData.json");
      } catch (error) {
        console.error("Error downloading JSON data:", error);
      }
    }
  };

  const triggerDownload = (url, filename) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

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
      const userId = localStorage.getItem("newUserid");
      setIsLiked(response.likes.includes(userId));
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  const handleLike = async () => {
    try {
      const userId = localStorage.getItem("newUserid");
      await CommunitySectionAPI.newlikePost(userId, postId);
      setIsLiked(!isLiked);
      if (isLiked) {
        
        await CommunitySectionAPI.unlikeMap(userId, postId);
      } else {
        
        await CommunitySectionAPI.likeMap(userId, postId);
      }

      await fetchPostDetails();
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: "100vh", p: 3, height: "100%" }}>
      <Paper sx={{ my: 2, p: 2, backgroundColor: "#fff" }}>
        <CardContent sx={{ textAlign: "left" }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            color="gray"
            sx={{ fontWeight: "bold", marginBottom: "5px" }}
          >
            <span style={{ fontWeight: "normal", textTransform: "uppercase" }}>
              {postInfo.postType}
            </span>
          </Typography>
        </CardContent>

        <Typography
          variant="h4"
          gutterBottom
          color="black"
          sx={{ marginBottom: "5px", marginTop: "-10px" }}
        >
          {postInfo.postName}
        </Typography>

        <CardContent sx={{ textAlign: "left" }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            color="gray"
            sx={{ fontWeight: "bold", marginBottom: "0px" }}
          >
            <span style={{ fontWeight: "normal" }}>{postInfo.userName}</span>
          </Typography>

          <Typography
            variant="subtitle1"
            gutterBottom
            color="gray"
            sx={{ fontWeight: "bold", marginBottom: "-50px" }}
          >
            <span style={{ fontWeight: "normal" }}>
              {new Date(postInfo.postDate)
                .toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
                .replace(",", "")
                .replace(/:/g, ":")}
            </span>
          </Typography>
        </CardContent>
        <CardContent sx={{ textAlign: "right" }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            color="gray"
            sx={{
              fontWeight: "bold",
              marginTop: "-15px",
              marginBottom: "-30px",
            }}
          >
            <ThumbUpIcon sx={{ fontSize: "small", verticalAlign: "middle" }} />{" "}
            Liked:{" "}
            <span style={{ fontWeight: "normal" }}>
              {postInfo.interactions}
            </span>
          </Typography>
        </CardContent>
        <hr />

        <Paper
          elevation={4}
          sx={{ width: "auto", height: "auto", bgcolor: "grey" }}
        >
          {postInfo.postImages && (
            <img
              src={postInfo.postImages}
              alt={postInfo.postName}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          )}
        </Paper>

        <Typography variant="subtitle1" gutterBottom color="white" />
        <Typography
          paragraph
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "1rem",
            textAlign: "left",
            minHeight: "100px",
          }}
        >
          <br></br>

          {postInfo.content}
        </Typography>

        {postInfo.attachedFile && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadJson}
            sx={{ mt: 2 }}
            style={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            <CloudDownloadIcon />
            <Typography variant="body1" sx={{ marginLeft: "10px"}}>
            DOWNLOAD FILE
          </Typography>
          </Button>
        </Box>
      )}

        <Divider sx={{ my: 2, bgcolor: "black" }} />
        {/* <Typography variant="h4" gutterBottom color="white" sx={{ mt: 3 }}>
          Comments Section
        </Typography> */}

        <Typography
          variant="h6"
          gutterBottom
          color="black"
          sx={{ textAlign: "left", ml: "10px", mb: "20px" }}
        >
          Comments ({commentsBuffer.length})
        </Typography>

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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLike}
              sx={{ mt: 2 }}
              disabled={authentification}
              data-cy="comment-button"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
               {isLiked ? <ThumbDownIcon/> : <ThumbUpIcon/>} 
               <Typography
            sx={{textAlign: "left", marginLeft: "10px" }}
          >
             {isLiked ? "CANCEL LIKE" : "Like Post"}
          </Typography>
             
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
              disabled={authentification}
              data-cy="comment-button"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              Post Comment
            </Button>
          </Box>
        </Box>

        {/* {commentsBuffer.map((comment, index) => (
          <Typography key={index} sx={{ color: "#FAFAFA", mb: 2, ml: 5 }}>
            {comment.commentContent}
          </Typography>
        ))} */}
        <br></br>
        <Divider sx={{ my: 2, bgcolor: "black" }} />

        {[...commentsBuffer] // Create a shallow copy of the array to avoid mutating the original array
          .sort((a, b) => new Date(b.commentDate) - new Date(a.commentDate)) // Sort by most recent date
          .map((comment, index) => (
            <Paper
              key={index}
              sx={{
                bgcolor: "background.paper",
                mb: 2,
                p: 2,
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <AccountCircleIcon sx={{ mr: 2, color: "action.active" }} />
              <Box sx={{ textAlign: "left", width: "100%" }}>
                <Typography fontSize="13px" color="text.secondary">
                  {comment.userName || "Anonymous"}
                </Typography>
                <Typography fontSize="18px" color="text.primary">
                  {comment.commentContent}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {new Date(comment.commentDate).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
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
