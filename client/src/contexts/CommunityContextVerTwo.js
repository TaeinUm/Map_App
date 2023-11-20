import React, { createContext, useState } from "react";
import {useNavigate} from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

export const CommunityContext = createContext(null);

export const CommunityProvider = ({ children }) => {
  //const history = useHistory();
  const [screenType, setScreenType] = useState(null);
  const [postId, setPostId] = useState(null);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent]=useState("");
  const navigate = useNavigate();
    //   const [comments, setGeojsonData] = useState(null);
    //   const [markers, setMarkers] = useState([]);

  const navigateTo = (path) => {
    navigate(path);
  };

  const updateQuestionTitle = (text) => {
    setQuestionTitle(text);
    console.log("What is the question title now?" + questionTitle);
  }

  

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
        questionTitle,
        updateQuestionTitle,
        setQuestionTitle,
        setQuestionContent,
        updateScreenTypeAndNavigate,
        postId,
        
        updatePostIdAndNavigate,
        navigateTo,
        
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};