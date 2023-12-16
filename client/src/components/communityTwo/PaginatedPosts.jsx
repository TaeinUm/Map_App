import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Pagination,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const PaginatedPosts = ({ posts, page, setPage, itemsPerPage }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  const navigate = useNavigate();

  const handlePostClick = (post) => {
    navigate(`/posts/${post.postType}/${post._id}`);
  };

  const sortedPosts = posts.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
        marginBottom: "50px",
      }}
    >
      {/* <Typography
        sx={{ color: "#fafafa", fontSize: "38px", marginBottom: "20px" }}
      >
        Title Here
      </Typography> */}

      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {paginatedPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card
              sx={{
                margin: "10px",
                height: "350px",
                width: "320px",
              }}
              onClick={() => handlePostClick(post)}
            >
              <CardMedia
                component="img"
                height="200"
                image={post.postImages || "https://via.placeholder.com/140"}
                alt={post.postName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {post.postName}
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                  Posted by {post.userName || "here! get author name"}
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                  Date: {new Date(post.postDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(posts.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        showFirstButton
        showLastButton
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'white',
            '&.Mui-selected': {
              // backgroundColor: '#ffccbc',
              // color: '#d84315',
            },
          },
        }}
      />
    </Box>
  );
};
export default PaginatedPosts;
