import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Loader from './Loader';

function Showdata({ list, setdataofmu, dataofmu }) {
    const [durations, setDurations] = useState({});

    useEffect(() => {
        if (list && list.listofmusic) {
            const newDurations = {};

            list.listofmusic.forEach((music) => {
                const audio = new Audio(music.music);
                audio.onloadedmetadata = () => {
                    newDurations[music.name] = audio.duration;
                    setDurations((prev) => ({
                        ...prev,
                        [music.name]: audio.duration,
                    }));
                };
            });
        }
    }, [list]);

    const formatDuration = (value) => {
        const minute = Math.floor(value / 60);
        const secondLeft = Math.round(value - minute * 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    };

    if (!list) {
        return; // Handle the case where no data is selected
    }

    return (
        <Box sx={{ width: "100%", background: "linear-gradient(40deg, #DC2424, #4A569D)" }}>
            <Box sx={{ backgroundImage: `url(${list.img2})`, height: "250px", backgroundSize: "cover", width: "80%", margin: "auto", backgroundPosition: "center", backgroundColor: "rgba(0,0,0,0.3)", backgroundBlendMode: "multiply" }}>
                <Box sx={{ color: 'white', fontWeight: '900', padding: "20px", marginTop: "20px", fontSize: "30px", paddingBottom: "10px" }}>
                    Name: {list.name}
                </Box>
                <Box sx={{ fontSize: "25px", marginLeft: "20px", color: "white" }}>
                    {list.type}
                </Box>
                <Box sx={{ fontSize: "20px", marginLeft: "20px", color: "white" }}>
                    About: {list.about}
                </Box>
            </Box>

            {list.listofmusic && list.listofmusic.length > 0 ? (
                <TableContainer component={Box} sx={{ width: "80%", margin: "auto" }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "white", fontSize: "20px", width: "30px", borderBottom: "none" }}>No</TableCell>
                                <TableCell sx={{ color: "white", fontSize: "20px", borderBottom: "none" }}>Image</TableCell>
                                <TableCell sx={{ color: "white", fontSize: "20px", borderBottom: "none" }}>Music Name</TableCell>
                                <TableCell sx={{ color: "white", fontSize: "20px", borderBottom: "none" }}>Time</TableCell>
                                <TableCell sx={{ color: "white", fontSize: "20px", borderBottom: "none" }}>Listen</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.listofmusic.map((music, index) => (
                                <TableRow key={index} sx={{ borderBottom: "1px solid white " }} onClick={() => setdataofmu(music)}>
                                    <TableCell component="th" scope="row" sx={{ textAlign: "left", color: "white", fontSize: "30px", borderBottom: "none" }}>
                                        {dataofmu != undefined && dataofmu.name == music.name ? (
                                            <Box sx={{ width: "50px", height: "50px" }}>
                                                <Loader />
                                            </Box>
                                        ) : (
                                            index + 1
                                        )}
                                    </TableCell>
                                    <TableCell component="th" scope="row" sx={{ textAlign: "left", display: "flex", borderBottom: "none" }}>
                                        <Box sx={{ width: "50px" }} component="img" src={music.img} />
                                    </TableCell>
                                    <TableCell sx={{ color: "white", borderBottom: "none" }}>
                                        {music.name}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "left", borderBottom: "none", color: "white" }}>
                                        {/* Displaying the time/duration */}
                                        {durations[music.name] ? formatDuration(durations[music.name]) : 'Loading...'}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "left", borderBottom: "none" }}>
                                        <Link href={music.music} underline="none">
                                            <Typography variant="body1" component="a" sx={{ color: 'white' }}>
                                                Listen
                                            </Typography>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                ""
            )}
        </Box>
    );
}

export default Showdata;
