import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import mapServiceAPI from "../../../api/mapServiceAPI";
import { AuthContext } from "../../../contexts/AuthContext";

function Memo({ mapId }) {
  const { userId, username } = useContext(AuthContext);
  const [memoContent, setMemoContent] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const loadMemo = async () => {
      try {
        const response = await mapServiceAPI.getMemoContent(
          userId,
          username,
          mapId
        );
        setMemoContent(response.memoContent);
      } catch (error) {
        console.error("Error loading memo:", error);
      }
    };

    loadMemo();
  }, [userId, username, mapId]);

  const handleSave = async () => {
    try {
      await mapServiceAPI.updateMemoContent(
        userId,
        username,
        mapId,
        memoContent
      );
      setMemoContent(memoContent);
    } catch (error) {
      console.error("Error saving memo:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box sx={{ width: "100%", backgroundColor: "white", padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Memo
          </Typography>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 1 }} />
        <TextField
          variant="outlined"
          multiline
          rows={4}
          sx={{ width: "100%" }}
          value={memoContent}
          onChange={(e) => setMemoContent(e.target.value)}
        />
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          sx={{ mt: 2, alignSelf: "flex-end" }}
        >
          Save
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Memo saved"
        />
      </Box>
    </>
  );
}

export default Memo;
