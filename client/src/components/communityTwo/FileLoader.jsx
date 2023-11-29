import React, { useState, useEffect } from "react";
import {Box, Typography, TextField, Button, Paper, Input} from "@mui/material";

const FileLoader = ({ onFileLoad }) => {
    //const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] = useState(null);

    return (
        <div>
            <input onChange={(e)=>(setFile(e.target.files[0]))} type="file" accept=".kml, .shp, .json"/>
            <button>Load from Local Storage</button>
            <button>Post</button>

          {}
        </div>
      );
};
export default FileLoader;