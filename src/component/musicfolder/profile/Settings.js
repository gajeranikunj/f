import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, FormGroup, FormControlLabel, Button, Stack, Switch } from '@mui/material'
import axios from 'axios'

function Settings({ isSm, userdata }) {
    const [state, setState] = useState(userdata?.profile?.publicsong || false);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
    const profiledata = userdata?.profile;

    useEffect(() => {
        if (state !== userdata?.profile?.publicsong) {
            setIsSaveButtonDisabled(false);
        } else {
            setIsSaveButtonDisabled(true);
        }
    }, [state, userdata]);

    function checkProfileDataFilled() {
        if (profiledata && profiledata.name && profiledata.img && profiledata.country && profiledata.email && profiledata.about) {
            setState(!state);
        } else {
            alert("To do this, make sure your profile data is filled");
        }
    }

    const saveChanges = () => {
        const formData = { ...userdata.profile };

        formData.publicsong = state;

        const authToken = window.localStorage.getItem("auto");
        console.log(formData);


        axios.post(`http://localhost:3005/profile/setprofile/${profiledata._id}`, formData, {
            headers: {
                'Authorization': authToken,
                'Content-Type': 'multipart/form-data'  // Assuming formData might include files, otherwise 'application/json' may be more appropriate
            },
        })
            .then(response => {
                console.log("Settings updated successfully:", response.data);
                window.location.reload();  // Uncomment if you want to reload the page after updating
            })
            .catch(error => {
                console.error("Failed to update settings:", error);
                alert("Failed to update settings");
            });
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item sm={3} xs={12}>
                    <Typography className='nunito-sans' fontWeight={700} color="rgba(1, 41, 112, 0.6)">
                        Ensure to live a song
                    </Typography>
                </Grid>
                <Grid item sm={9} xs={12}>
                    <FormGroup className='form-group'>
                        <FormControlLabel
                            control={<Switch checked={state} onChange={checkProfileDataFilled} name="gilad" />}
                            label="To do this, make sure your profile data is filled"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} className='btn-grid'>
                    <Stack direction="row" justifyContent="center" marginTop="15px" className='btn'>
                        <Button
                            variant="contained"
                            sx={{ textTransform: "capitalize", fontSize: "15px" }}
                            size={isSm ? "medium" : "small"}
                            className='change-btn'
                            onClick={saveChanges}
                            disabled={isSaveButtonDisabled}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Settings