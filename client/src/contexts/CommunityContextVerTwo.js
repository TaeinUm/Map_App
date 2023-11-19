import React, { createContext, useState } from "react";
import {useNavigate} from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

export const CommunityContext = createContext(null);

export const CommunityProvider = ({ children }) => {
  //const history = useHistory();
  const [screenType, setScreenType] = useState(null);
  const [postId, setPostId] = useState(null);
  const navigate = useNavigate();
    //   const [comments, setGeojsonData] = useState(null);
    //   const [markers, setMarkers] = useState([]);

  const updateScreenTypeAndNavigate = (searchType, path) => {
    setScreenType(searchType);
    // setGeojsonData(data);
    //You should be able to navigate to a specific webpage using a function and a path 
    //history.push(path);
    navigate(path);
  };
  const updatePostIdAndNavigate = (postId, path) => {
    setPostId(postId);
    //history.push(path);
    navigate(path);
  };
 
  

  return (
    <CommunityContext.Provider
      value={{
        screenType,
    
        updateScreenTypeAndNavigate,
        postId,
        
        updatePostIdAndNavigate,
        
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};