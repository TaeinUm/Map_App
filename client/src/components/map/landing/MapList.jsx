import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FiShare, FiTrash } from "react-icons/fi";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const getMapListData = [
  { image: "1.jpg", title: "Ver 1. World map", date: "2023.04.01" },
  { image: "2.jpg", title: "Ver 2. World map", date: "2023.04.15" },
  { image: "3.jpg", title: "Ver 3. World map", date: "2023.05.06" },
  { image: "4.jpg", title: "Ver 1. Terra map", date: "2023.03.20" },
  { image: "5.jpg", title: "Ver 1. New map", date: "2023.06.01" },
  { image: "6.jpg", title: "Ver 2. basic map", date: "2023.06.15" },
  { image: "7.jpg", title: "Ver 1. basic map", date: "2023.07.01" },
];

function MapList({ searchQuery }) {
  const [mapListData, setMapListData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(3);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const filteredData = getMapListData
      .filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => b.date.localeCompare(a.date));

    setMapListData(filteredData);
  }, [searchQuery]);

  const handleLeftClick = () => {
    setStartIndex(Math.max(0, startIndex - visibleItems));
  };

  const handleRightClick = () => {
    setStartIndex(
      Math.min(mapListData.length - visibleItems, startIndex + visibleItems)
    );
  };

  const handleDelete = (indexToRemove) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this map?"
    );
    if (confirmDelete) {
      const updatedData = mapListData.filter(
        (_, index) => index !== indexToRemove
      );
      setMapListData(updatedData);
    }
  };

  return (
    <>
      {mapListData
        .slice(startIndex, startIndex + visibleItems)
        .map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", my: 3 }}
          >
            <Box sx={{ width: 60, height: 60, bgcolor: "grey", mr: 2 }}>
              <img
                src={item.image}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Box>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ mx: 2 }}>
              {item.date}
            </Typography>
            <IconButton size="small">
              <FiShare />
            </IconButton>
            <IconButton size="small" onClick={() => handleDelete(index)}>
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
