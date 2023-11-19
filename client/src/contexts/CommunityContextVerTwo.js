import React, { createContext, useState, useHistory } from "react";

export const CommunityContext = createContext(null);

export const CommunityProvider = ({ children }) => {
  const history = useHistory();
  const [screenType, setScreenType] = useState(null);
  const [postId, setPostId] = useState(null);
    //   const [comments, setGeojsonData] = useState(null);
    //   const [markers, setMarkers] = useState([]);

  const updateScreenTypeAndNavigate = (searchType, path) => {
    setScreenType(searchType);
    // setGeojsonData(data);
    //You should be able to navigate to a specific webpage using a function and a path 
    history.push(path);
    //navigate("/mapedit");
  };
  const updatePostIdAndNavigate = (postId, path) => {
    setPostId(postId);
    history.push(path);

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