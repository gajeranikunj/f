import React, { useState } from 'react'
import { Box, Typography, Grid, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, Stack } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import axios from 'axios';

function Changepassword({ isSm }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }));

    const handleSubmit = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            setError("New passwords don't match");
            return;
        }

        const token = localStorage.getItem('auto');
        try {
            const response = await axios.post('http://localhost:3005/Loginsingup/changepassword', formData, {
                headers: {
                    'Authorization': token
                }
            });
            if (response.data.status === "success") {
                alert("Password changed successfully!");
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleClickShowPassword = () => setShowPassword(prevState => !prevState);

    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <Box>
            <Grid container alignItems="center" spacing={1}>
                <Grid item sm={3} xs={12}>
                    <Typography variant="subtitle1" className='nunito-sans' marginBottom={isSm ? "5.6px" : "0px"} color="rgba(1, 41, 112, 0.6)" fontWeight={700}>
                        Current Password
                    </Typography>
                </Grid>
                <Grid item sm={9} xs={12} marginBottom={isSm ? "0px" : "10px"}>
                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder='Current Password'
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Grid>
                <Grid item sm={3} xs={12}>
                    <Typography variant="subtitle1" className='nunito-sans' marginBottom={isSm ? "5.6px" : "0px"} color="rgba(1, 41, 112, 0.6)" fontWeight={700}>
                        New Password
                    </Typography>
                </Grid>
                <Grid item sm={9} xs={12} marginBottom={isSm ? "0px" : "10px"}>
                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder='New Password'
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Grid>
                <Grid item sm={3} xs={12}>
                    <Typography variant="subtitle1" className='nunito-sans' marginBottom={isSm ? "5.6px" : "0px"} color="rgba(1, 41, 112, 0.6)" fontWeight={700}>
                        Re-enter New Password
                    </Typography>
                </Grid>
                <Grid item sm={9} xs={12} marginBottom={isSm ? "0px" : "10px"}>
                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder='Re-enter New Password'
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Grid>
                {error && (
                    <Grid item xs={12}>
                        <Typography color="error" align="center">
                            {error}
                        </Typography>
                    </Grid>
                )}
                <Grid item xs={12} className='btn-grid'>
                    <Stack direction="row" justifyContent="center" marginTop={isSm ? "18px" : "5px"} className='btn'>
                        <Button 
                            variant="contained" 
                            onClick={handleSubmit}
                            sx={{ textTransform: "capitalize", fontSize: "15px" }} 
                            size={isSm ? "medium" : "small"} 
                            className='change-btn'
                        >
                            Change Password
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Changepassword