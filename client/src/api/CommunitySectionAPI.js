import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import React, { useContext } from "react";

const API_BASE_URL =
"https://terracanvas-fb4c23ffbf5d.herokuapp.com" || "http://localhost:8080";

const CommunitySectionAPI = {
    //make a post
    makePost: async (userId, postType, postFile, date) => {
        const { isAuthenticated, userId, username } = useContext(AuthContext);

        if (!isAuthenticated) {
            console.error("User is not authenticated");
            return;
        }
        try {
            // const response = await
            // axios
            // .post(`${API_BASE_URL}/api/community/post`, {
            //     userId: userId,
            //     postType: postType,
            //     postText: postText,
            //     postFile: postFile,
            // })
            // .then(function(response){
            //     console.log("makePost success");
            //     console.log(response);
            // })
            // .catch((err) => console.log(err));
            const response = await axios.post(`${API_BASE_URL}/api/community/post`,
                {
                    params:{userId, postType, postType, postFile, date},
                }
            );
            return response.data;
        //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post`,{
        //     userId,
        //     postType, 
        //     postText,
        //     postFile,
        //     date,

        //   }  );
        } catch (error) {
            console.error("cannot make a post.");
        }
    },
    getMapsByUsername: async (searchedUser) => {
        try {
            const response = await axios.get(
            `${API_BASE_URL}/api/community/getMapsByUsername/${searchedUser}`,{
                params:{searchedUser},
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
            `${API_BASE_URL}/api/community/getQuestions/${searchText}`,{
                params:{searchText},
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
            `${API_BASE_URL}/api/community/getIdeas/${searchText}`,{
                params:{searchText},
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
            `${API_BASE_URL}/api/community/getMapsBySearch/${searchText}`,{
                params:{searchText},
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
        
    getComments: async (postId) => {
        const { isAuthenticated, userId, username } = useContext(AuthContext);

        if (!isAuthenticated) {
            console.error("User is not authenticated");
            return;
        }
        try {
            const response = await axios.get(
            `${API_BASE_URL}/api/community/getComments/${postId}`,{
                params:{postId},
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
            console.error("cannot get comments.");
        }
    },

    postComment: async (postId, userId, date, commentText) => {
        const { isAuthenticated, userId, username } = useContext(AuthContext);

        if (!isAuthenticated) {
            console.error("User is not authenticated");
            return;
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/api/community/postComment`,
                {
                    params:{postId, userId, commentText, date},
                }
            );
            return response.data;
            // axios
            // .post(`${API_BASE_URL}/api/community/postComment`, {
            //     postId: postId,
            //     userId: userId,
            //     date: date,
            //     commentText: commentText,
            // })
            // .then(function(response){
            //     console.log("postComment success");
            //     console.log(response);
            // })
            // .catch((err) => console.log(err));
        //   const response = await axios.get(
        //     `${API_BASE_URL}/api/community/comments/${postId}`,{
        //         params:{postId},
        //     }
        //   );
        //   return response.comments;
        //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/postComment`,{
        //     postId,
        //     userId,
        //     commentText,
            
        //     date,

        //   }  );
        } catch (error) {
            console.error("cannot post a comment.");
        }
    },

    likeMap: async (postId) => {
        const { isAuthenticated, userId, username } = useContext(AuthContext);

        if (!isAuthenticated) {
            console.error("User is not authenticated");
            return;
        }
        try {
            const response = await axios.put(`${API_BASE_URL}/api/community/likeMap/${postId}`,
                {
                    params:{userId},
                }
            );
            return response.data;
            // axios
            // .put(`${API_BASE_URL}/api/community/likeMap/${postId}`, {
            //     userId: userId,
                
            // })
            // .then(function(response){
            //     console.log("likeMap success");
            //     console.log(response);
            // })
            // .catch((err) => console.log(err));
        //   const response = await axios.get(
        //     `${API_BASE_URL}/api/community/comments/${postId}`,{
        //         params:{postId},
        //     }
        //   );
        //   return response.comments;
        //   return await CommunitySectionAPI("put", `${API_BASE_URL}/api/community/likeMap/${postId}`,{
            
        //     userId,
            
            

        //   }  );
        } catch (error) {
            console.error("cannot like a map.");
        }
    },
    unlikeMap: async (postId) => {
        const { isAuthenticated, userId, username } = useContext(AuthContext);

        if (!isAuthenticated) {
            console.error("User is not authenticated");
            return;
        }
        try {
            const response = await axios.put(`${API_BASE_URL}/api/community/unlikeMap/${postId}`,
                {
                    params:{userId},
                }
            );
            return response.data;
            // axios
            // .put(`${API_BASE_URL}/api/community/likeMap/${postId}`, {
            //     userId: userId,
                
            // })
            // .then(function(response){
            //     console.log("likeMap success");
            //     console.log(response);
            // })
            // .catch((err) => console.log(err));
        //   const response = await axios.get(
        //     `${API_BASE_URL}/api/community/comments/${postId}`,{
        //         params:{postId},
        //     }
        //   );
        //   return response.comments;
        //   return await CommunitySectionAPI("put", `${API_BASE_URL}/api/community/likeMap/${postId}`,{
            
        //     userId,
            
            

        //   }  );
        } catch (error) {
            console.error("cannot unlike a map.");
        }
    },


    
};
export default CommunitySectionAPI;