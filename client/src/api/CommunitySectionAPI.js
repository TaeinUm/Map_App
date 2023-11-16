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
        //   const response = await axios.get(
        //     `${API_BASE_URL}/api/community/post`
        //   );
          return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

            postType, 
            postText,
            postFile,
            date,

          }  );
        } catch (error) {
          console.error("cannot make a post.");
        }
      },
//       makePost: async (userId, postType, content, date) => {
//         const { isAuthenticated, userId, username } = useContext(AuthContext);

//   if (!isAuthenticated) {
//     console.error("User is not authenticated");
//     return;
//   }
//         try {
//         //   const response = await axios.get(
//         //     `${API_BASE_URL}/api/community/post`
//         //   );
//           return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

//             postType, 
//             postText,
//             postFile,
//             date,

//           }  );
//         } catch (error) {
//           console.error("cannot make a post.");
//         }
//       },

      
  };
  export default CommunitySectionAPI;