import React, { useState } from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { FaCirclePlay } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdPlaylistAddCircle } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebartheme() {
    const [activeIndex, setActiveIndex] = useState(0);
    const ch = window.localStorage.getItem("auto");
    var sidebardata = [];
    if (ch) {
        sidebardata = [
            {
                name: "home",
                icon: <IoHomeSharp />,
                path: "/"
            },
            {
                name: "play",
                icon: <FaCirclePlay />,
                path: "/play"
            },
            {
                name: "Add",
                icon: <IoMdAdd />,
                path: "/Add"
            },
        ]

    } else {
        sidebardata = [
            {
                name: "home",
                icon: <IoHomeSharp />,
                path: "/"
            },
            {
                name: "play",
                icon: <FaCirclePlay />,
                path: "/play"
            }
        ]
    }

    return (
        <>
            <Box sx={{ width: { xs: "100%", md: "70px" }, height: { xs: "70px", md: "100%" }, position: "relative", zIndex: "1000", borderRight: { xs: "none", md: "1px solid #fbfbfb21" }, borderTop: { xs: "1px solid #fbfbfb21", md: "none" }, display: { xs: "flex", md: "block" }, alignItems: "center", justifyContent: "space-evenly" }}>
                {sidebardata.map((item, index) => (
                    <Link to={item.path} key={index} style={{ textDecoration: "none", color: "inherit" }}>
                        <Box
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "row", md: "column" },
                                alignItems: "center",
                                justifyContent: "center",
                                width: "70px",
                                height: "70px",
                                cursor: "pointer",
                                color: activeIndex === index ? "white" : "wheat",
                                '&>svg': {
                                    scale: activeIndex === index ? "1.2" : "1",
                                },
                                fontSize: "25px",
                                fontWeight: "900",
                                backgroundColor: activeIndex === index ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                '&:hover>svg': {
                                    scale: "1.2"
                                }
                            }}
                        >
                            {item.icon}
                        </Box>
                    </Link>
                ))}
            </Box>
        </>
    )
}

export default Sidebartheme