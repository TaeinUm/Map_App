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
import mapServiceAPI from "../../../api/mapServiceAPI";
import { AuthContext } from "../../../contexts/AuthContext";

function Memo({ mapId }) {
  const { userId, username } = useContext(AuthContext);
  const [memoContent, setMemoContent] = useState("");

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
          value={memoContent}
          onChange={(e) => setMemoContent(e.target.value)}
        ></TextField>
        <Button
          onClick={handleSave}
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
