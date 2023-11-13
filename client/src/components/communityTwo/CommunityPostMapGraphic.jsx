import React, { useState, useEffect } from "react";
import {Box, Typography, TextField, Button, Paper, Input} from "@mui/material";
import FileLoader from "./FileLoader";


function CommunityPostMapGraphic(){
    return(
        <div>
            <h3 style={{color:'white'}}>Type</h3>
            <input type="radio" id="Map Graphics" value="HTML"></input>
            <label style={{color:'white'}} for="Map Graphics">Map Graphics</label>
            <input type="radio" id="Map Ideas" value="HTML"></input>
            <label style={{color:'white'}} for="Map Ideas">Map Ideas</label>
            <input type="radio" id="question" value="Bike"></input>
            <label style={{color:'white'}} for="question">Question</label><br></br>
            <h3 style={{color:'white'}}>Title</h3>
            <textarea style={{width:"75%"}} rows={1} placeholder="Enter the title of your post here"></textarea>
            <h3 style={{color:'white'}}>Content</h3>
            <textarea style={{width:"75%", height:"400px"}} rows={5} placeholder="Enter the content of your post here"></textarea>

            <FileLoader></FileLoader>
        </div>
    );
}
export default CommunityPostMapGraphic;