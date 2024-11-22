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
  const duration = time; // duration in seconds

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.round(value - minute * 60);

    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <Box sx={{ width: '100%', px: 3 }}>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={currentTime} // Set the current time here
        min={0}
        step={1}
        max={duration}
        onChange={onSliderChange} // Trigger the change when slider is moved
        sx={{
          height: 4,
          '& .MuiSlider-thumb': {
            width: 8,
            height: 8,
          },
          '& .MuiSlider-rail': {
            opacity: 0.28,
          },
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -2 ,color:"white"}}>
        <TinyText >{formatDuration(currentTime)}</TinyText>
        <TinyText>-{formatDuration(duration - currentTime)}</TinyText>
      </Box>
    </Box>
  );
}
