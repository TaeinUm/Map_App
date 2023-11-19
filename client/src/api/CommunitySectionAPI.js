import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import React, { useContext } from "react";

const API_BASE_URL =
"https://terracanvas-fb4c23ffbf5d.herokuapp.com" || "http://localhost:8080";

const CommunitySectionAPI = {
    //make a post
    makePost: async (content, likes, types, image, title) => {
        const { isAuthenticated, userId, username } = AuthContext;

        // if (!isAuthenticated) {
        //     console.error("User is not authenticated");
        //     return;
        // }
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
                    //params:{userId, postType, postType, postFile, date},
                    params: {userId,
                        content,
                        likes,
                        types,
                        image,
                        title},
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
    getSamplePosts: async () => {
        try {
            const response = await axios.get(
            `${API_BASE_URL}/api/community/getSamplePosts`,{
                params:{},
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
    getAllPosts: async (types) => {
        try {
            const response = await axios.get(
            `${API_BASE_URL}/api/community/getAllPosts/${types}`,{
                params:{types},
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
        const { isAuthenticated, userId, username } = AuthContext;
        try {
            const response = await axios.get(
            `${API_BASE_URL}/api/community/getMapsByUsername/:${userId}`,{
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
            `${API_BASE_URL}/api/community/getQuestions/:${searchText}`,{
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
            `${API_BASE_URL}/api/community/getIdeas/:${searchText}`,{
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
            `${API_BASE_URL}/api/community/getMapsBySearch/:${searchText}`,{
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
    getPost: async (postId) => {
        try {
            const response = await axios.get(
            `${API_BASE_URL}/api/community/getPost/${postId}`,{
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

    postComment: async (postId, date, content) => {
        const { isAuthenticated, userId, username } = AuthContext;

        if (!isAuthenticated) {
            console.error("User is not authenticated");
            return;
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/api/community/postComment`,
                {
                    params:{userId,
                        postId,
                        date,
                        content},
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
        const { isAuthenticated, userId, username } = AuthContext;

        if (!isAuthenticated) {
            console.error("User is not authenticated");
            return;
        }
        try {
            const response = await axios.put(`${API_BASE_URL}/api/community/likeMap/:${postId}`,
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
        const { isAuthenticated, userId, username } = AuthContext;

        if (!isAuthenticated) {
            console.error("User is not authenticated");
            return;
        }
        try {
            const response = await axios.put(`${API_BASE_URL}/api/community/unlikeMap/:${postId}`,
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