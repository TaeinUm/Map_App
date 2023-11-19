import React from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { FiEdit } from "react-icons/fi";
function Memo() {
  return (
    <>
      <Box style={{ width: "100%", height: "200px", backgroundColor: "white" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "left",
              marginLeft: "10px",
            }}
          >
            Memo
          </Typography>
          <IconButton sx={{ marginLeft: "220px", color: "black" }}>
            <FiEdit />
          </IconButton>
        </Box>
        <Divider sx={{ borderBottomWidth: 2, borderColor: "grey" }} />
        <TextField
          variant="outlined"
          multiline
          rows={3}
          sx={{ width: "90%", height: "80px", margin: "10px" }}
        ></TextField>
        <Button
          sx={{
            backgroundColor: "#282c34",
            margin: "20px",
            height: "30px",
            width: "80px",
            color: "#fafafa",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          Save
        </Button>
      </Box>
    </>
  );
}

export default Memo;
