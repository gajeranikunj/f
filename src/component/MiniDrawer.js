import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import useMediaQuery from '@mui/material/useMediaQuery';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListItemIcon from '@mui/material/ListItemIcon';
import Sidebartheme from './sidebar/Sidebartheme';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import CButton from './CButton';
import axios from 'axios';


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    backgroundColor: "black",
    display: "flex",
    height: window.innerWidth > 600 ? 'calc(100vh - 64px)' : 'calc(93vh - 64px)', // Subtracting AppBar height (64px is default MUI AppBar height)
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Mainbody = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [userdata, setuserdata] = useState(null)
  const navigate = useNavigate();
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  console.log("u=", userdata);

  const menuId = 'primary-search-account-menu';
  const data = [{
    name: userdata?.name ? userdata.name : "Profile",
    icon: userdata?.profile?.img ? <Avatar alt="Profile" src={userdata.profile.img} /> : <Avatar />,
    path: "/profile"
  }
  ]


  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {data.map((item, index) => (
        <Link to={item.path} key={index} style={{ textDecoration: "none", color: "inherit" }}>
          <MenuItem onClick={handleMenuClose}>
            {item.icon} {item.name}
          </MenuItem>
        </Link>
      ))}
      <Divider />

      <Link to="/profile/settings" style={{ textDecoration: "none", color: "inherit" }}>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
      </Link>

      <MenuItem onClick={() => {
        handleMenuClose();
        navigate("/")
        window.localStorage.removeItem("auto")
        window.location.reload();
      }}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {userdata ?
            <Box component={"img"} src={userdata} sx={{ width: "50px", height: "50px" }}>

            </Box>
            :
            <AccountCircle />
          }
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  useEffect(() => {
    var auto = window.localStorage.getItem("auto")
    console.log(auto);
    if (auto) {
      axios.get("http://localhost:3005/Loginsingup/data", {
        headers: {
          'Authorization': auto
        }
      }).then((res) => {
        console.log(res);
        setuserdata(res.data.data)
      }).catch((e) => {
        console.log(e);
      })
    }
  }, [])
  return (
    <>
      <Box sx={{ flexGrow: 1, position: "sticky", top: 0 }} zIndex={1030}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static"  >
            <Toolbar >
              <Stack spacing={1} direction="row" alignItems="center" sx={{ width: "20%" }}>
                <img
                  src="https://bootstrapmade.com/demo/templates/NiceAdmin/assets/img/logo.png"
                  alt="NiceAdminlogo"
                  width="25px"
                  height="25px"
                />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: '"Nunito", sans-serif',
                    fontSize: "24px",
                    color: "#fff",
                    textDecoration: 'none',
                  }}
                >
                  NiceAdmin
                </Typography>
              </Stack>

              <Box sx={{ flexGrow: 1 }} />
              <Search sx={{ width: { xs: "60%", sm: '40%' } }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  sx={{ border: 1, borderColor: 'grey.700', borderRadius: 1, width: '100%' }}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: "flex", alignItems: "center" }}>


                <CButton name={"signup"} />
                <Box sx={{ width: "5px" }}>

                </Box>
                <CButton name={"login"} />

              </Box>

              <Box sx={{ display: userdata && userdata.profile ? "block" : "none" }} >
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  disableRipple
                >
                  <Tooltip title="Account settings">
                    <Stack direction="row">
                      {
                        userdata && userdata.profile && userdata.profile.img == null ? <Box sx={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "gray", fontSize: "20px", display: "flex", justifyContent: "center", alignItems: "center", textTransform: "uppercase" }}>
                          {userdata.name[0]}
                        </Box> :
                          <Avatar alt="Profile" src={userdata && userdata.profile && userdata.profile.img}></Avatar>
                      }
                      <Button
                        size='small'
                        variant="contained"
                        disableElevation
                        endIcon={<KeyboardArrowDownIcon />}
                        disableRipple
                        sx={{ textTransform: 'capitalize', fontSize: "16px", paddingRight: "0px", bgcolor: 'transparent', display: { xs: 'none', md: 'flex' } }}
                        className='profileBTN'
                      >
                        {userdata && userdata.name}
                      </Button>
                    </Stack>
                  </Tooltip>
                </IconButton>
              </Box>

            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </ThemeProvider>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <CssBaseline />
        <Main open={open} sx={{ maxWidth: "100%", flexDirection: { xs: "column-reverse", md: "row" } }}>
          <Sidebartheme />
          <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
            <Outlet />
          </Box>
        </Main>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  )
}

export default Mainbody;