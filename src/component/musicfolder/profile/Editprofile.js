import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Stack, Button, TextField } from '@mui/material';
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';

function EditProfile({ isSm, userdata }) {
    const [profile, setProfile] = useState({
        name: userdata?.profile?.name || "",
        country: userdata?.profile?.country || "",
        about: userdata?.profile?.about || "",
        email: userdata?.profile?.email || "",
    });
    const [img, setimg] = useState(userdata?.profile?.img || null)
    const [error, setError] = useState("");
    const [isSaveDisabled, setIsSaveDisabled] = useState(true); // State to disable save button if no changes
    const [publicSong, setPublicSong] = useState(userdata?.profile?.publicsong || false); // State to check if publicSong is true
    const [bgimg, setBgimg] = useState(userdata?.profile?.bgimg || null);
    const [deleteBgImage, setDeleteBgImage] = useState(false);  // To flag image deletion

    useEffect(() => {
        if (userdata?.profile) {
            // Check if any profile field has changed
            const hasProfileChanges = Object.keys(profile).some(
                key => profile[key] !== (userdata?.profile?.[key] || "")
            );

            // Check if images have changed
            const hasImageChanges = 
                (img !== userdata?.profile?.img) || 
                (bgimg !== userdata?.profile?.bgimg);

            // Enable save button only if there are any changes
            setIsSaveDisabled(!(hasProfileChanges || hasImageChanges));
        }
    }, [profile, img, bgimg, userdata]);

    const handleImageChange = (event) => {
        console.log(event.target.files);

        const file = event.target.files[0];
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type) || file.size > 5 * 1024 * 1024) {
                setError(file.type ? "File size exceeds 5MB." : "Please select a valid image (JPEG, PNG).");
                setimg(null);
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setError("");
                setimg(reader.result);
            };
            reader.readAsDataURL(file);
        }
        setIsSaveDisabled(false);
    };

    const handleBgImageChange = (event) => {
        console.log(event.target.files);
        const file = event.target.files[0];
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type) || file.size > 5 * 1024 * 1024) {
                setError(file.type ? "File size exceeds 5MB." : "Please select a valid image (JPEG, PNG).");
                setBgimg(null);
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setError("");
                setBgimg(reader.result);
            };
            reader.readAsDataURL(file);
        }
        setIsSaveDisabled(false);
    };

    const handleImageDelete = () => {
        if (!publicSong) {
            setimg(null);
            setError("");
            setIsSaveDisabled(false); // Enable save button when image is deleted
        }
    };
    const handleBgImageDelete = () => {
        if (!publicSong) {
            setBgimg(null);
            setError("");
            setDeleteBgImage(true);  // Set flag to true for deletion
        }
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveChanges = () => {
        const formData = new FormData();

        // Convert empty strings to null when sending to backend
        Object.entries(profile).forEach(([key, value]) => {
            const trimmedValue = value?.trim();
            if (trimmedValue === "") {
                formData.append(key, ""); // Send empty string to backend
            } else if (trimmedValue) {
                formData.append(key, trimmedValue);
            }
        });

        // Handle profile image update
        if (img && img.startsWith('data:image')) {
            const byteString = atob(img.split(',')[1]);
            const mimeString = img.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            const file = new File([blob], "profile-image.jpg", { type: mimeString });
            formData.append('img', file);
        }

        // Handle background image update
        if (bgimg && bgimg.startsWith('data:image')) {
            const byteString = atob(bgimg.split(',')[1]);
            const mimeString = bgimg.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            const file = new File([blob], "background-image.jpg", { type: mimeString });
            formData.append('bgimg', file);
        }
        // Handle profile image deletion
        if (!img && userdata?.profile?.img) {
            formData.append('deleteImage', 'true');
        }

        // Handle background image deletion (set a flag for deletion)
        if (!bgimg && userdata?.profile?.bgimg) {
            formData.append('deleteBgImage', 'true');
        }

        const authToken = window.localStorage.getItem("auto");
        axios.post(`http://localhost:3005/profile/setprofile/${userdata.profile._id}`, formData, {
            headers: {
                'Authorization': authToken,
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(response => {
                console.log("Profile updated successfully:", response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error("Failed to update profile:", error);
            });
    };


    return (
        <Box>
            <Grid container spacing={isSm ? 2 : 1}>
                {/* Profile Image Section */}
                <Grid item sm={3} xs={12}>
                    <Typography
                        variant="subtitle1"
                        className="nunito-sans"
                        marginBottom={isSm ? "5.6px" : "0px"}
                        color="rgba(1, 41, 112, 0.6)"
                        fontWeight={700}
                    >
                        Profile Image
                    </Typography>
                </Grid>
                <Grid item sm={9} xs={12} marginBottom={isSm ? "0px" : "10px"}>
                    <Stack spacing={1}>
                        <label htmlFor="img-upload" style={{ cursor: 'pointer', width: "70px", margin: "auto" }}>
                            <Box sx={{ width: "70px", height: "70px", borderRadius: "50%", boxShadow: 2, overflow: 'hidden', margin: '0 auto' }}>
                                {img ? (
                                    <img src={img} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <Typography sx={{ fontSize: '1rem', color: '#aaa', textAlign: 'center', lineHeight: '70px' }}>+ Add Image</Typography>
                                )}
                            </Box>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            id="img-upload"
                            style={{ display: 'none' }}
                        />
                    </Stack>
                    {error && (
                        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    {img && !publicSong && (
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ marginTop: '10px', display: 'flex' }}
                            onClick={handleImageDelete}
                            startIcon={<BsTrash />}
                        >
                            Delete Image
                        </Button>
                    )}
                </Grid>

                <Grid item sm={3} xs={12}>
                    <Typography
                        variant="subtitle1"
                        className="nunito-sans"
                        marginBottom={isSm ? "5.6px" : "0px"}
                        color="rgba(1, 41, 112, 0.6)"
                        fontWeight={700}
                    >
                        Background Image
                    </Typography>
                </Grid>
                <Grid item sm={9} xs={12} marginBottom={isSm ? "0px" : "10px"}>
                    <Stack spacing={1}>
                        <label htmlFor="bgimg-upload" style={{ cursor: 'pointer', width: "100%", margin: "auto" }}>
                            <Box sx={{ width: "100%", height: "150px", boxShadow: 2, overflow: 'hidden', display: "flex", justifyContent: "center", alignItems: "center",borderRadius:"5px" }}>
                                {bgimg ? (
                                    <img src={bgimg} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <Typography sx={{ fontSize: '1.3rem', color: '#aaa', textAlign: 'center', lineHeight: '70px' }}>+ Add Background</Typography>
                                )}
                            </Box>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBgImageChange}
                            id="bgimg-upload"
                            style={{ display: 'none' }}
                        />
                    </Stack>
                    {bgimg && (
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ marginTop: '10px', display: 'flex' }}
                            onClick={handleBgImageDelete}
                            startIcon={<BsTrash />}
                        >
                            Delete Background Image
                        </Button>
                    )}
                    {error && (
                        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                </Grid>

                {/* Other Fields (Name, About, Country, Email) */}
                <Grid item sm={3} xs={12}>
                    <Typography
                        variant="subtitle1"
                        className="nunito-sans"
                        marginBottom={isSm ? "5.6px" : "0px"}
                        color="rgba(1, 41, 112, 0.6)"
                        fontWeight={700}
                    >
                        Name
                    </Typography>
                </Grid>
                <Grid item sm={9} xs={12} marginBottom={isSm ? "0px" : "10px"}>
                    <TextField
                        fullWidth
                        type="text"
                        size="small"
                        value={profile.name}
                        onChange={(e) => handleInputChange(e, 'name')}
                    />
                </Grid>

                <Grid item sm={3} xs={12}>
                    <Typography
                        variant="subtitle1"
                        className="nunito-sans"
                        marginBottom={isSm ? "5.6px" : "0px"}
                        color="rgba(1, 41, 112, 0.6)"
                        fontWeight={700}
                    >
                        About
                    </Typography>
                </Grid>
                <Grid item sm={9} xs={12} marginBottom={isSm ? "0px" : "10px"}>
                    <TextField
                        fullWidth
                        type="text"
                        multiline
                        maxRows={4}
                        size="small"
                        value={profile.about}
                        onChange={(e) => handleInputChange(e, 'about')}
                    />
                </Grid>

                <Grid item sm={3} xs={12}>
                    <Typography
                        variant="subtitle1"
                        className="nunito-sans"
                        marginBottom={isSm ? "5.6px" : "0px"}
                        color="rgba(1, 41, 112, 0.6)"
                        fontWeight={700}
                    >
                        Country
                    </Typography>
                </Grid>
                <Grid item sm={9} xs={12} marginBottom={isSm ? "0px" : "10px"}>
                    <TextField
                        fullWidth
                        type="text"
                        size="small"
                        value={profile.country}
                        onChange={(e) => handleInputChange(e, 'country')}
                    />
                </Grid>

                <Grid item sm={3} xs={12}>
                    <Typography
                        variant="subtitle1"
                        className="nunito-sans"
                        marginBottom={isSm ? "5.6px" : "0px"}
                        color="rgba(1, 41, 112, 0.6)"
                        fontWeight={700}
                    >
                        Email
                    </Typography>
                </Grid>
                <Grid item sm={9} xs={12} marginBottom={isSm ? "0px" : "10px"}>
                    <TextField
                        fullWidth
                        type="email"
                        size="small"
                        value={profile.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                    />
                </Grid>

                {/* Save Changes Button */}
                <Grid item xs={12} className="btn-grid">
                    <Stack direction="row" justifyContent="center" marginTop="15px" className="btn">
                        <Button
                            variant="contained"
                            sx={{ textTransform: "capitalize", fontSize: "15px" }}
                            size={isSm ? "medium" : "small"}
                            className="change-btn"
                            onClick={handleSaveChanges}
                            disabled={isSaveDisabled}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}

export default EditProfile;
