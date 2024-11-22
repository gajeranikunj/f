import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Stack, Backdrop } from '@mui/material';
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', img: null });
  const Navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData((prevData) => ({ ...prevData, img: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name !== "" && formData.email !== "" && formData.password !== "") {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      if (formData.img) data.append('img', formData.img);
      axios.post('http://localhost:3005/Loginsingup/Singup', data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          Navigate("/login")
        })
        .catch((error) => {
          if (error.response?.data?.message === "User already exists with this email") {
            if (window.confirm("User already exists, do you want to log in?")) Navigate("/login")
            else console.log(error);
          } else console.log(error);
        });
    } else {
      if (formData.name === "") alert("Name is required");
      else if (formData.email === "") alert("Email is required");
      else if (formData.password === "") alert("Password is required");
    }
  };

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={true}>
      <Box sx={{ maxWidth: 300, backgroundColor: '#f1f7fe', borderRadius: '16px', color: '#010101', overflow: 'hidden', padding: '32px 24px 24px', textAlign: 'center', position: "relative" }}>
        <Link to={"/"} style={{ position: "absolute", top: "10px", right: "10px", padding: "0px" }} ><IoCloseCircleOutline style={{ fontSize: "24px" }} /></Link>
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Sign up</Typography>
        <Typography variant="body2" sx={{ color: '#666', fontSize: '1rem' }}>Create a free account with your email.</Typography>
        <Stack spacing={2} sx={{ marginTop: 2 }}>
          <label htmlFor="img-upload" style={{ cursor: 'pointer' }}>
            <Box sx={{ width: "70px", height: "70px", borderRadius: "50%", boxShadow: 2, overflow: 'hidden', margin: '0 auto' }} >
              {formData.img ? <img src={URL.createObjectURL(formData.img)} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Typography sx={{ fontSize: '1rem', color: '#aaa', textAlign: 'center', lineHeight: '70px' }}>+ Add Image</Typography>}
            </Box>
          </label>
          <Box component="input" type="file" accept="image/*" onChange={handleImageChange} sx={{ display: 'none' }} id="img-upload" />
          <TextField fullWidth variant="outlined" label="Full Name" name="name" value={formData.name} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          <TextField fullWidth variant="outlined" label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          <TextField fullWidth variant="outlined" label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
        </Stack>
        <Button variant="contained" sx={{ marginTop: 3, borderRadius: '24px', backgroundColor: '#0066ff', color: '#fff', padding: '10px 16px', fontSize: '1rem', fontWeight: 600, '&:hover': { backgroundColor: '#005ce6' } }} onClick={handleSubmit}>Sign up</Button>
        <Box sx={{ marginTop: 3, backgroundColor: '#e0ecfb', padding: '16px' }}>
          <Typography variant="body2" sx={{ fontSize: '.85rem' }}>
            Have an account?{' '}
            <Link to={"/login"} style={{ fontWeight: 'bold', color: '#0066ff' }}  >
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Backdrop>
  );
};

export default SignUpForm;
