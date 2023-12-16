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
              height: "400px",
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
            <CardContent sx={{ textAlign: 'left' }}> 
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              noWrap 
              sx={{
                width: '100%', 
                overflow: 'hidden',
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap' 
              }}
            >
              {post.postName}
            </Typography>
              <Typography variant="overline" display="block" gutterBottom  sx ={{marginBottom: "0px"}}>
                Author: {post.userId || "Author name here"}
              </Typography>
              <Typography variant="overline" display="block" gutterBottom sx ={{marginBottom: "0px"}}>
                Date: {new Date(post.postDate).toLocaleDateString()}
              </Typography>
              <Typography variant="overline" display="block" gutterBottom sx ={{marginBottom: "0px"}}>
                Like: {post.interactions}
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
