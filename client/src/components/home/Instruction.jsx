import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import Instruction1 from "./instructions/ Instruction1";
import Instruction2 from "./instructions/Instruction2";
import Instruction3 from "./instructions/Instruction3";
import Instruction4 from "./instructions/Instruction4";
import Instruction5 from "./instructions/Instruction5";

const instructionComponents = {
  1: <Instruction1 />,
  2: <Instruction2 />,
  3: <Instruction3 />,
  4: <Instruction4 />,
  5: <Instruction5 />,
};

const instructions = [
  { id: 1, text: "1. Go to Map page", image: "image1.jpg" },
  {
    id: 2,
    text: "2. Choose graphics or map files to edit",
    image: "image2.jpg",
  },
  {
    id: 3,
    text: "3. Change graphics style just by a few clicks",
    image: "image2.jpg",
  },
  { id: 4, text: "4. You can also change JSON file", image: "image2.jpg" },
  { id: 5, text: "5. Save Your map graphics!", image: "image2.jpg" },
];

function Instruction() {
  const [selectedInstructionId, setSelectedInstructionId] = useState(1);
  const [autoAdvance, setAutoAdvance] = useState(true); // New state to control auto-advance

  useEffect(() => {
    let interval;
    if (autoAdvance) {
      interval = setInterval(() => {
        setSelectedInstructionId((prevId) =>
          prevId === instructions.length ? 1 : prevId + 1
        );
      }, 6000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoAdvance]); // Depend on autoAdvance state

  // Function to handle button click
  const handleButtonClick = (instruction) => {
    setSelectedInstructionId(instruction.id);
    setAutoAdvance(false); // Stop auto-advancing when button is manually clicked
  };

  const selectedInstruction = instructions.find(
    (instr) => instr.id === selectedInstructionId
  );

  return (
    <div>
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* ... existing Box and Typography components ... */}
        <Box
          sx={{
            display: "flex",
            gap: "40px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {/* Instructions details */}
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {instructions.map((instruction) => (
              <Button
                key={instruction.id}
                onClick={() => handleButtonClick(instruction)}
                sx={{
                  color: "#fafafa",
                  height: "100px",
                  width: "100%",
                  textDecoration:
                    selectedInstructionId === instruction.id
                      ? "underline"
                      : "none",
                }}
              >
                {instruction.text}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              height: "600px",
              zIndex: "1",
              backgroundColor: "#fafafa",
            }}
          >
            {selectedInstruction &&
              instructionComponents[selectedInstructionId]}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Instruction;
