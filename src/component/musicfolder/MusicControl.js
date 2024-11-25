import * as React from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicControl({ time, currentTime, onSliderChange }) {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ color: "white", marginRight: "10px" }}>{formatTime(currentTime)}</Box>
      <Slider
        size="small"
        min={0}
        max={time}
        value={currentTime}
        onChange={onSliderChange}
        sx={{ width: "70%", color: "white" }}
      />
      <Box sx={{ color: "white", marginLeft: "10px" }}>{formatTime(time)}</Box>
    </Box>
  );
}
