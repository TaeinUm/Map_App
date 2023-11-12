import React, { useState, useEffect } from "react";
import {Box, Typography, TextField, Button, Paper, Input} from "@mui/material";

const FileLoader = ({ onFileLoad }) => {
    //const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] = useState(null);
    //const [msg, setMSG] = useState(null);
  
    // const handleFileChange = (event) => {
      
    //   const file = event.target.files[0];
    //   //setSelectedFile(file);
    // };
  
    // const handleFileLoad = () => {
    //   if (selectedFile) {
    //     // You can perform any actions with the selected file here
    //     console.log('Selected file:', selectedFile);
    //     // Call the onFileLoad prop with the selected file
    //     onFileLoad(selectedFile);
    //   }
    // };

    // function handleUpload(){
    //     if(!file){
    //         return;
    //     }
    //     const fd = new FormData();
    //     fd.append("file", file );

    // }

    return (
        <div>
            <input onChange={(e)=>(setFile(e.target.files[0]))} type="file" accept=".kml, .shp, .json"/>
            <button>Load from Local Storage</button>
            <button>Post</button>

          {/* <Input
            type="file"
            onChange={(e)=>{setFile(e.target.files[0])}}
            style={{ display: 'none' }}
            inputProps={{ accept: '.pdf, .doc, .docx' }} // Specify accepted file types
          />
          <label htmlFor="file-input">
            <Button variant="contained" component="span">
              Choose File
            </Button>
          </label>
          <Button variant="contained" color="primary" onClick={handleFileLoad}>
            Load File
          </Button> */}
        </div>
      );
};
export default FileLoader;