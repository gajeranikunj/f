import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Stack, Backdrop } from '@mui/material';
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const Navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.name !== "" && formData.email !== "" && formData.password !== "") {
      axios.post('http://localhost:3005/Loginsingup/Login', formData)
        .then((response) => {
          if (response.data.status == "success") {
            window.localStorage.setItem("auto", response.data.token)
            Navigate("/")
          window.location.reload();
          } else {
            console.error('Login failed:', response.data.message);
          }
        })
        .catch((error) => {
          console.error('An error occurred during login:', error);
        });
    } else {
      console.log('All fields are required');
      alert("All fields are required")
    }
  };

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={true}
    >
      <Box
        sx={{
          maxWidth: 300,
          backgroundColor: '#f1f7fe',
          borderRadius: '16px',
          color: '#010101',
          overflow: 'hidden',
          padding: '32px 24px 24px',
          textAlign: 'center',
          position: "relative"
        }}
      >
        <Link to={"/"} style={{ position: "absolute", top: "10px", right: "10px", padding: "0px" }} >
          <IoCloseCircleOutline style={{ fontSize: "24px" }} />
        </Link>
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.6rem' }}>
          Login Form
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', fontSize: '1rem' }}>
          Login account with your email.
        </Typography>
        <Stack spacing={2} sx={{ marginTop: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Stack>
        <Button
          variant="contained"
          sx={{
            marginTop: 3,
            borderRadius: '24px',
            backgroundColor: '#0066ff',
            color: '#fff',
            padding: '10px 16px',
            fontSize: '1rem',
            fontWeight: 600,
            '&:hover': { backgroundColor: '#005ce6' },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Box sx={{ marginTop: 3, backgroundColor: '#e0ecfb', padding: '16px' }}>
          <Typography variant="body2" sx={{ fontSize: '.85rem' }}>
            you want to create account?{' '}
            <Link to={"/SignUp"} style={{ fontWeight: 'bold', color: '#0066ff' }} >
              SignUp
            </Link>
          </Typography>
        </Box>
      </Box>
    </Backdrop >
  );
};

export default LoginForm;
