import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({ setAnswer, mx, choices, value }) {
  const [alignment, setAlignment] = useState('');
  
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAnswer(newAlignment)
    }
  };
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ mx: mx }}
    >
      <ToggleButton value={choices[0]}>{choices[0]}</ToggleButton>
      <ToggleButton value={choices[1]}>{choices[1]}</ToggleButton>
      <ToggleButton value={choices[2]}>{choices[2]}</ToggleButton>
    </ToggleButtonGroup>
  );
}