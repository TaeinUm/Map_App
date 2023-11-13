import React, { useState, useEffect } from "react";
import {Box, Typography, TextField, Button, Paper, Input} from "@mui/material";
import FileLoader from "./FileLoader";


function CommunityPostMapGraphic(){
    return(
        <div>
            <h3>Type</h3>
            <input type="radio" id="Map Graphics" value="HTML"></input>
            <label for="Map Graphics">Map Graphics</label>
            <input type="radio" id="Map Ideas" value="HTML"></input>
            <label for="Map Ideas">Map Ideas</label>
            <input type="radio" id="question" value="Bike"></input>
            <label for="question">Question</label><br></br>
            <h3>Title</h3>
            <textarea rows={1} placeholder="Enter the title of your post here"></textarea>
            <h3>Content</h3>
            <textarea rows={5} placeholder="Enter the title of your post here"></textarea>

            <FileLoader></FileLoader>
        </div>
    );
}
export default CommunityPostMapGraphic;