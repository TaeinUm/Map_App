import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import React, { useContext } from "react";
import { CommunityContext } from "../contexts/CommunityContextVerTwo";

const API_BASE_URL =
  "http://localhost:8080";

const CommunitySectionAPI = {
  
  uploadPostPicture: async (postId, imageBase64) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/community/${postId}/upload-post-picture`,
        {
          imageBase64: imageBase64 // Base64 인코딩된 이미지 데이터 전송
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error uploading post image: ", error);
      throw error;
    }
  },

  newlikePost: async (userID, postId) => {
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/community/newlikePost/${postId}`,
        { userId: userID }
      );
      return response.data;
    } catch (error) {
      console.error("cannot like a post.");
    }
  },
  
  
  //make a post
  makePost: async (postPayload) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/community/post`, postPayload);
      return response.data;
    } catch (error) {
      console.error("Error making the post: ", error);
    }
  },

  getSamplePosts: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/community/getSamplePosts`,
        {
          params: {},
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot get sample posts.");
    }
  },


  getAllPosts: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/community/getAllPosts`
      );

      return response.data;
    } catch (error) {
      console.error("cannot get all posts of a certain type.");
    }
  },

  getMapsByUsername: async (searchedUser) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users/${encodeURIComponent(searchedUser)}`
      );
      return response.data;
    } catch (error) {
      console.error("cannot get a user's maps.");
    }
  },

  getPostsByUserId: async (userID) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/community/getMapsByUsername/${userID}`,
        {
          params: { userId: userID },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot get a user's maps.");
    }
  },

  getQuestionsBySearch: async (searchText) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/community/getQuestions/:${searchText}`,
        {
          params: { searchText },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot get questions for a query.");
    }
  },

  getIdeasBySearch: async (searchText) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/community/getIdeas/:${searchText}`,
        {
          params: { searchText },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot get ideas for a query.");
    }
  },

  getMapsBySearch: async (searchText) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/community/getMapsBySearch/:${searchText}`,
        {
          params: { searchText },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot get maps for a query.");
    }
  },
  
  getCommentsForAPost: async (postID) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/community/getAllCommentsByPostID/${postID}`,
        {
          params: { postId: postID },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot get post.");
    }
  },

  postComment: async (userID, postId, username, date, content) => {

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/community/postComment`,

        {
          userId: userID,
          postId: postId,
          userName: username,
          commentDate: date,
          commentContent: content,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error posting the comment: ", error);
    }
  },

  likeMap: async (userID, postId) => {
    const { isAuthenticated, userId, username } = AuthContext;

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/community/likeMap/${postId}`,
        {
          params: { userId: userID },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot like a map.");
    }
  },
  
  unlikeMap: async (userID, postId) => {
    const { isAuthenticated, userId, username } = AuthContext;

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/community/unlikeMap/${postId}`,
        {
          params: { userId: userID },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot unlike a map.");
    }
  },

  deletePost: async (postID) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/community/deletePost/${postID}`,
        {
          params: { postId: postID },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot delete a user's post.");
    }
  },

  deleteAllComment: async (postId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/community/deleteAllComment/${postId}`,
        {
          params: { postId: postId },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot delete comments.");
    }
  },

  deleteComment: async (commentID) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/community/deleteAllComment/${commentID}`,
        {
          params: { commentId: commentID },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot delete a comment.");
    }
  },

  getPostDetails: async (postType, postId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/community/${postType}/${postId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching post details:", error);
      throw error;
    }
  },
};

export default CommunitySectionAPI;
