import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FiShare, FiTrash } from "react-icons/fi";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import mapServiceAPI from "../../../api/mapServiceAPI";
import { AuthContext } from "../../../contexts/AuthContext";
import { MapContext } from "../../../contexts/MapContext";
import { useNavigate } from "react-router-dom";

function MapList({ searchQuery }) {
  const [mapListData, setMapListData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(5);
  const [startIndex, setStartIndex] = useState(0);
  const { updateMapContextAndNavigate } = useContext(MapContext);
  const navigate = useNavigate();

  const { userId, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await mapServiceAPI.getUserMapGraphics(userId);
        if (!Array.isArray(userInfo)) {
          return;
        }
        const filteredData = userInfo
          .filter((item) =>
            item?.mapName
              ?.toLowerCase()
              .includes(searchQuery?.toLowerCase() ?? "")
          )
          .sort((a, b) => new Date(b.mapDate) - new Date(a.mapDate));

        setMapListData(filteredData);
      } catch (error) {
        console.error("Error fetching map graphics:", error);
      }
    };

    fetchData();
  }, [searchQuery, userId]);

  const handleItemClick = (mapId, mapType, mapLayer) => {
    updateMapContextAndNavigate(mapId, mapType, mapLayer, navigate);
  };

  const handleLeftClick = () => {
    setStartIndex(Math.max(0, startIndex - visibleItems));
  };

  const handleRightClick = () => {
    setStartIndex(
      Math.min(mapListData.length - visibleItems, startIndex + visibleItems)
    );
  };

  const toLoginPage = () => {
    navigate("/signin");
  };

  const handleDelete = async (mapId, indexToRemove) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this map?"
    );
    if (confirmDelete) {
      try {
        await mapServiceAPI.deleteUserMapGraphic(userId, mapId);
        const updatedData = mapListData.filter(
          (_, index) => index !== indexToRemove
        );
        setMapListData(updatedData);
      } catch (error) {
        console.error("Error deleting data", error);
      }
    }
  };

  return (
    <>
      {!isAuthenticated && (
        <Typography
          type="button"
          onClick={toLoginPage}
          sx={{
            backgroundColor: "black",
            color: "#fafafa",
            width: "180px",
            height: "40px",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            margin: "50px auto",
            boxShadow: "5px 3px 5px grey",
          }}
        >
          {" "}
          Click here to login →{" "}
        </Typography>
      )}
      {mapListData
        .slice(startIndex, startIndex + visibleItems)
        .map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", my: 3 }}
          >
            <Box
              type="button"
              sx={{ width: 60, height: 60, bgcolor: "grey", mr: 2 }}
              onClick={() =>
                handleItemClick(item._id, item.mapType, item.mapData)
              }
            >
              <img
                src={item.image}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Box>
            <Typography
              type="button"
              variant="h6"
              onClick={() =>
                handleItemClick(item._id, item.mapType, item.mapData)
              }
              sx={{ flexGrow: 1, textAlign: "left", marginLeft: "30px" }}
            >
              {item.vers + ". " + item.mapName}
            </Typography>
            <Typography variant="body2" sx={{ mx: 2 }}>
              {new Date(item.mapDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            {/*<IconButton size="small">
              <FiShare />
            </IconButton>*/}
            <IconButton
              size="small"
              onClick={() => handleDelete(item._id, index)}
            >
              <FiTrash />
            </IconButton>
          </Box>
        ))}
      {/* Navigation Arrows */}
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <IconButton onClick={handleLeftClick} disabled={startIndex === 0}>
          <AiOutlineArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleRightClick}
          disabled={startIndex + visibleItems >= mapListData.length}
        >
          <AiOutlineArrowRight />
        </IconButton>
      </Box>
    </>
  );
}

export default MapList;
