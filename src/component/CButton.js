import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(2, 2, 241, 1);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(218, 103, 68, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(218, 103, 68, 0);
  }
`;
const CButton = ({ name }) => {
  // Add a check for fun being a function
  const [show, setshow] = useState(true);
  useEffect(() => {
    if (window.localStorage.getItem("auto")) {
      setshow(false)
    }
  }, [])

  return (
    <>
      <Link to={name} style={{display:show?"block":"none"}}>
        <Button
          sx={{
            border: 'none',
            color: '#fff',
            height: "30px",
            backgroundImage: 'linear-gradient(30deg, #4154F1, #f3f2f0e3)',
            borderRadius: '20px',
            backgroundSize: '100% auto',
            fontFamily: 'inherit',
            fontSize: '15px',
            padding: '0.6em 1.5em',
            transition: 'background-size 0.3s ease, background-position 0.3s ease',
            '&:hover': {
              backgroundPosition: 'right center',
              backgroundSize: '200% auto',
              animation: `${pulseAnimation} 1.5s infinite`,
            },
          }}
        >
          {name}
        </Button>
      </Link>
    </>
  );
};

export default CButton;
