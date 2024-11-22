import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, styled, Paper, Stack, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import { BsTwitter, BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import PropTypes from 'prop-types';
import Overview from './Overview';
import Editprofile from './Editprofile';
import Settings from './Settings';
import Changepassword from './Changepassword';
import { Route, Routes, useNavigate } from 'react-router-dom'; // Updated import to use Routes instead of Switch
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2.5),
  color: theme.palette.text.secondary,
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Profile() {
  const [value, setValue] = React.useState(0);
  const [bind, setBind] = React.useState(true);
  const [userdata, setuserdata] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (bind) {
      if (value === 0) {
        navigate("/profile/overview");
      } else if (value === 1) {
        navigate("/profile/editprofile");
      } else if (value === 2) {
        navigate("/profile/settings");
      } else if (value === 3) {
        navigate("/profile/changepassword");
      }
    }
  }, [value]);

  useEffect(() => {
    setBind(false);
    console.log(window.location.href);
    if (window.location.href.includes("overview")) {
      setValue(0);
    } else if (window.location.href.includes("editprofile")) {
      setValue(1);
    } else if (window.location.href.includes("settings")) {
      setValue(2);
    } else if (window.location.href.includes("changepassword")) {
      setValue(3);
    }
    setTimeout(() => {
      setBind(true);
    }, 100);
  }, [window.location.href]);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    var auto = window.localStorage.getItem("auto");
    console.log(auto);
    if (auto) {
      axios
        .get("http://localhost:3005/Loginsingup/data", {
          headers: {
            'Authorization': auto
          }
        })
        .then((res) => {
          console.log(res);

          setuserdata(res.data.data); // Make sure you are using res.data here
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);


  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <Item>
            <Stack alignItems="center" padding="5px" spacing={1.5}>

              {
                userdata && userdata.profile && userdata.profile.img == null ? <Box sx={{ width: "120px", height: "120px", borderRadius: "50%", backgroundColor: "gray", fontSize: "50px", display: "flex", justifyContent: "center", alignItems: "center", textTransform: "uppercase",color:"white" }}>
                  {userdata.name[0]}
                </Box> :
                <Box sx={{width:"120px",height:"120px",backgroundImage:`url(${userdata && userdata.profile && userdata.profile.img})`,backgroundSize:"cover",borderRadius:"50%"}}>
                </Box>     
              }
              <Box>
                <Typography variant="h5" fontWeight={700} className="nunito-sans" color="#2c384e">
                  {userdata?.name || "User Name"}
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <a href="#a" className="social-icon"><BsTwitter size={20} /></a>
                <a href="#dff" className="social-icon"><BsFacebook size={20} /></a>
                <a href="#fg" className="social-icon"><BsInstagram size={20} /></a>
                <a href="#fgg" className="social-icon"><BsLinkedin size={20} /></a>
              </Stack>
            </Stack>
          </Item>
        </Grid>

        <Grid item md={8} xs={12}>
          <Item>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Overview" />
                  <Tab label="Edit Profile" />
                  <Tab label="Settings" />
                  <Tab label="Change Password" />
                </Tabs>
              </Box>

              <Routes>
                <Route path="overview" element={<Overview isSm={isSm} userdata={userdata} />} />
                <Route path="editprofile" element={<Editprofile isSm={isSm} userdata={userdata} />} />
                <Route path="settings" element={<Settings isSm={isSm} userdata={userdata} />} />
                <Route path="changepassword" element={<Changepassword isSm={isSm} />} />
              </Routes>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
