import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styled Box for the main container


// Styled Box for the loading bar
const LoadingBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems:"end",
  height:"100%"
}));

// Styled individual loading blocks (bars)
const LoadBar = styled(Box)(({ theme }) => ({
  width: '4px',
  height: '33px',
  backgroundColor: 'limegreen',
  borderRadius: '5px',
  margin: '0.1em',
  animation: 'move6 1s infinite',
  animationTimingFunction: 'ease-in-out',
  '@keyframes move6': {
    '0%': { height: '0.2em' },
    '25%': { height: '0.7em' },
    '50%': { height: '1.5em' },
    '100%': { height: '0.2em' },
  },
  '&:nth-child(1)': {
    animationDelay: '0.2s',
  },
  '&:nth-child(2)': {
    animationDelay: '0.4s',
  },
  '&:nth-child(3)': {
    animationDelay: '0.6s',
  },
}));

const Loader = () => {
  return (

    <LoadingBar>
      <LoadBar />
      <LoadBar />
      <LoadBar />
      <LoadBar />
    </LoadingBar>
  );
};

export default Loader;
