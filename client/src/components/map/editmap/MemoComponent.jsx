import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Memo from '../tab/Memo';

const MemoComponent = () => {
  const [isMemoVisible, setIsMemoVisible] = useState(false);

  const toggleMemo = () => {
    setIsMemoVisible(!isMemoVisible);
  };

  return (
    <Box>
      <Button
        sx={{ width: '100%', height: '20px', backgroundColor: 'grey' }}
        onClick={toggleMemo}
      >
        {isMemoVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Button>
      {isMemoVisible && <Memo />}
    </Box>
  );
};

export default MemoComponent;
