import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import placeholder from '../../assets/images/TerraCanvas_placeholder_image.png';

const PaginatedPosts = ({ posts, page, setPage, itemsPerPage }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  const navigate = useNavigate();

  const handlePostClick = (post) => {
    navigate(`/posts/${post.postType}/${post._id}`);
  };

  const filteredPosts = posts.filter((post) => post.visibility === 1);

  const sortedPosts = filteredPosts.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

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
                image={post.postImages || placeholder}
                alt={post.postName}
              />
              <CardContent>
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
                <Typography variant="overline" display="block" gutterBottom align="left">
                  Posted by {post.userName || "here! get author name"}
                </Typography>
                <Typography variant="overline" display="block" gutterBottom align="left">
                  Date: {new Date(post.postDate).toLocaleDateString()}
                </Typography>
                <Typography variant="overline" display="block" gutterBottom align="left">
                  Likes: {post.interactions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(filteredPosts.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        showFirstButton
        showLastButton
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'white',
            '&.Mui-selected': {},
          },
        }}
      />
    </Box>
  );
};

export default PaginatedPosts;
