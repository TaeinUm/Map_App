import React, { useState, useEffect } from "react";
import {Box, Typography, TextField, Button, Paper} from "@mui/material";
//import { getTop5Trending } from "../../api/graphicsAPI";


function CommunityTwoMapIdeaPostings() {
    //const [topGraphics, setTopGraphics] = useState([]);
    const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    // Handle your submission logic here
    console.log('Submitted message:', message);
  };
//   useEffect(() => {
//     const fetchGraphics = async () => {
//       try {
//         const data = await getTop5Trending();
        
//         console.log("Hello");
//         console.log(data);
//         setTopGraphics(data);
        
//       } catch (error) {
//         console.error("Error fetching top graphics:", error);
//       }
//     };

//     fetchGraphics();
//   },[]);

    return(
        <div>
            <Box>
                <Typography>Hello</Typography>
                <TextField
        id="prompt-textarea"
        multiline
        rows={1}
        placeholder="Send a message"
        variant="outlined"
        fullWidth
        value={message}
        onChange={handleMessageChange}
        InputProps={{
          classes: {
            root: 'm-0 w-full resize-none border-0 bg-transparent py-2 pr-2',
            notchedOutline: 'border-transparent',
          },
          style: { maxHeight: '200px', height: '116px', overflowY: 'hidden' },
        }}
        inputProps={{
            'data-id': 'request-:R3apdm:-49',
          tabIndex: '0',
        }}
      />
      <Box>
        A map idea goes here
      </Box>
        
      {/* <Paper
              key={0}
              elevation={4}
              data-cy="trending-graphic"
              sx={{ width: "500px", height: "400px", bgcolor: "grey" }}
            >
              <img
                src={topGraphics[0]}
                alt={topGraphics[0]}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Paper> */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
                {/* <textarea id="prompt-textarea" tabindex="0" data-id="request-:R3apdm:-49" rows="1" placeholder="Send a message" class="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 gizmo:md:py-3.5 gizmo:placeholder-black/50 gizmo:dark:placeholder-white/50 pl-3 md:pl-4" style="max-height: 200px; height: 116px; overflow-y: hidden;"></textarea> */}
            </Box>
            
            Hi there you are on the community two map ideas posting page
        </div>
    );
}

export default CommunityTwoMapIdeaPostings;