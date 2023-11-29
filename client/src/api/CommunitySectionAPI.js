import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import React, { useContext } from "react";
import { CommunityContext } from "../contexts/CommunityContextVerTwo";

const API_BASE_URL =
  "https://terracanvas-fb4c23ffbf5d.herokuapp.com" || "http://localhost:8080";
//const [authenticated, setAuthenticated] = useState(false);
//const [userID, setUserID] = useState("");
//const {userID, authentified} = CommunityContext;
// let userID = "";
// let authentified = false;

// export function setUserID(userId){
//     userID = userId;
// }

// export function setAuthentified(value){
//     authentified=value;
// }

const CommunitySectionAPI = {
  // doAuthenitication: (value)=>{
  //     let autheniticated = value;
  //     return autheniticated;
  // },
  // doUserID: (userId)=>{
  //     let userID = userId;
  //     return userID;
  // },

  //make a post
  makePost: async (
    userID,
    content,
    likes,
    types,
    image,
    title,
    visibility,
    attachedFile,
    postDate
  ) => {
    //const { isAuthenticated, userId, username } = AuthContext;

    // if (!isAuthenticated) {
    //     console.error("User is not authenticated");
    //     return;
    // }
    try {
      const response = await axios.post(`${API_BASE_URL}/api/community/post`, {
        userId: userID,
        content: content,
        interactions: likes,
        postType: types,
        postImages: image,
        postName: title,
        visibility: visibility,
        attachedFile: attachedFile,
        postDate: postDate,
      });
      
      return response.data;
      //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post`,{
      //     content,
      //     likes,
      //     types,
      //     image,
      //     title,

      //   }  );
    } catch (error) {
      console.error("cannot make a post.");
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
      //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

      //     postType,
      //     postText,
      //     postFile,
      //     date,

      //   }  );
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
      //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

      //     postType,
      //     postText,
      //     postFile,
      //     date,

      //   }  );
    } catch (error) {
      console.error("cannot get all posts of a certain type.");
    }
  },
  // deletePost: async (postId) => {
  //     try {
  //         const response = await axios.delete(
  //         `${API_BASE_URL}/api/community/deletePost/${postId}`,{
  //             params:{postId},
  //         }
  //         );
  //         return response.data;
  //     //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

  //     //     postType,
  //     //     postText,
  //     //     postFile,
  //     //     date,

  //     //   }  );
  //     } catch (error) {
  //         console.error("cannot get a user's maps.");
  //     }
  // },
  // updatePost: async (postId, postType) => {
  //     try {
  //         const response = await axios.put(
  //         `${API_BASE_URL}/api/community/updatePost/${postId}`,{
  //             params:{postId, postType},
  //         }
  //         );
  //         return response.data;
  //     //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

  //     //     postType,
  //     //     postText,
  //     //     postFile,
  //     //     date,

  //     //   }  );
  //     } catch (error) {
  //         console.error("cannot get a user's maps.");
  //     }
  // },
  getMapsByUsername: async (searchedUser) => {
    //const { isAuthenticated, userId, username } = AuthContext;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users/${encodeURIComponent(searchedUser)}`
      );
      return response.data;
      //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

      //     postType,
      //     postText,
      //     postFile,
      //     date,

      //   }  );
    } catch (error) {
      console.error("cannot get a user's maps.");
    }
  },
  getPostsByUserId: async (userID) => {
    //const { isAuthenticated, userId, username } = AuthContext;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/community/getMapsByUsername/${userID}`,
        {
          params: { userId: userID },
        }
      );
      return response.data;
      //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

      //     postType,
      //     postText,
      //     postFile,
      //     date,

      //   }  );
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
      //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

      //     postType,
      //     postText,
      //     postFile,
      //     date,

      //   }  );
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
      //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

      //     postType,
      //     postText,
      //     postFile,
      //     date,

      //   }  );
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
      //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

      //     postType,
      //     postText,
      //     postFile,
      //     date,

      //   }  );
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
      //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

      //     postType,
      //     postText,
      //     postFile,
      //     date,

      //   }  );
    } catch (error) {
      console.error("cannot get post.");
    }
  },
  // getComments: async (postId) => {
  //     const { isAuthenticated, userId, username } = useContext(AuthContext);

  //     if (!isAuthenticated) {
  //         console.error("User is not authenticated");
  //         return;
  //     }
  //     try {
  //         const response = await axios.get(
  //         `${API_BASE_URL}/api/community/getComments/${postId}`,{
  //             params:{postId},
  //         }
  //         );
  //         return response.data;
  //     //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

  //     //     postType,
  //     //     postText,
  //     //     postFile,
  //     //     date,

  //     //   }  );
  //     } catch (error) {
  //         console.error("cannot get comments.");
  //     }
  // },

  postComment: async (userID, postId, date, content) => {
    const { isAuthenticated, userId, username } = AuthContext;

    // if (!isAuthenticated) {
    //     console.error("User is not authenticated");
    //     return;
    // }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/community/postComment`,

        {
          userId: userID,
          postId: postId,
          commentDate: date,
          commentContent: content,
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot post a comment.");
    }
  },

  likeMap: async (userID, postId) => {
    const { isAuthenticated, userId, username } = AuthContext;

    // if (!isAuthenticated) {
    //     console.error("User is not authenticated");
    //     return;
    // }
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

    // if (!isAuthenticated) {
    //     console.error("User is not authenticated");
    //     return;
    // }
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
};
export default CommunitySectionAPI;
