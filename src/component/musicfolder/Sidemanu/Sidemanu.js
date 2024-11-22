import { Avatar, Box, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";

function Sidemanu({ setdata, data }) {
    const [normaldata, setnormaldata] = useState(data);
    return (
        <>
            <Box sx={{ width: "300px", height: "100%", border: "1px solid #fbfbfb21", display: { xs: "none", md: "inline-block" } }}>
                <Box sx={{
                    width: "100%", height: "70px", border: "1px solid #fbfbfb21", display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                                marginLeft: "10px"
                            }}
                        >
                            NiceAdmin
                        </Typography>
                    </Box>
                    <Box sx={{ fontSize: "30px", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconButton aria-label="Add" size="large" sx={{ color: "white", '&:hover': { scale: "1.1" } }}>
                            <IoMdAdd fontSize="inherit" />
                        </IconButton>
                    </Box>
                </Box>
                {normaldata && (
                    <Box sx={{ width: "100%", color: "white", textAlign: "center", fontSize: "21px" }}>
                        Popular artists
                    </Box>
                )}
                {normaldata && (
                    <Box>
                        {normaldata.map((item, index) => (
                            <Box sx={{ width: "100%", color: "white", display: "flex", alignItems: "center", paddingLeft: "15px", margin: "10px 0px", '&:hover': { backgroundColor: "#fbfbfb21", scale: "1.02" }, cursor: "pointer" }} key={index} onClick={() => setdata(item)}>
                                <Avatar
                                    alt={item.name}
                                    src={item.img}
                                    sx={{ width: "50px", height: "50px" }}
                                />
                                <Box>
                                    <Box sx={{ marginLeft: "10px", fontSize: "20px" }}>
                                        {item.name}
                                    </Box>
                                    <Box sx={{ marginLeft: "10px", fontSize: "15px", color: "#808080" }}>
                                        {item.type}
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </>
    )
}

export default Sidemanu