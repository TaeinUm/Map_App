import React, { createContext, useState } from "react";

export const CommunityContext = createContext(null);

export const CommunityProvider = ({ children }) => {
  const [searchType, setSearchType] = useState(null);
    //   const [comments, setGeojsonData] = useState(null);
    //   const [markers, setMarkers] = useState([]);

  const updateCommunityContextAndNavigate = (searchType) => {
    setSearchType(searchType);
    // setGeojsonData(data);
    //You should be able to navigate to a specific webpage using a function and a path 
    //navigate("/mapedit");
  };

  

  return (
    <CommunityContext.Provider
      value={{
        searchType,
        setSearchType,
        updateCommunityContextAndNavigate,
        
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};