import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Loader from './Loader';

function Showdata({ list, setdataofmu, settog, dataofmu }) {
    const [durations, setDurations] = useState({});
    useEffect(() => {
        console.log(list);
    }, [list])
    useEffect(() => {

        if (list && list.playlists) {
            const newDurations = {};

            list.playlists.forEach((music) => {
                const audio = new Audio(music.audio);
                audio.onloadedmetadata = () => {
                    newDurations[music._id] = audio.duration;
                    setDurations((prev) => ({
                        ...prev,
                        [music._id]: audio.duration,
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

    const handleMusicSelect = (audio) => {
        settog(false);
        setdataofmu(audio);
    };

    if (!list) {
        return; // Handle the case where no data is selected
    }

    return (
        <Box sx={{ width: "100%", background: "linear-gradient(40deg, #DC2424, #4A569D)" }}>
            <Box sx={{ backgroundImage: `url(${list.bgimg})`, height: "250px", backgroundSize: "cover", width: "80%", margin: "auto", backgroundPosition: "center", backgroundColor: "rgba(0,0,0,0.3)", backgroundBlendMode: "multiply" }}>
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

            {list.playlists && list.playlists.length > 0 ? (
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
                            {list.playlists.map((audio, index) => (
                                <TableRow key={index} sx={{ borderBottom: "1px solid white " }} onClick={() => handleMusicSelect(audio)}>
                                    <TableCell component="th" scope="row" sx={{ textAlign: "left", color: "white", fontSize: "30px", borderBottom: "none" }}>
                                        {dataofmu != undefined && dataofmu._id == audio._id ? (
                                            <Box sx={{ width: "50px", height: "50px" }}>
                                                <Loader />
                                            </Box>
                                        ) : (
                                            index + 1
                                        )}
                                    </TableCell>
                                    <TableCell component="th" scope="row" sx={{ textAlign: "left", display: "flex", borderBottom: "none" }}>
                                        <Box sx={{ width: "50px" }} component="img" src={audio.img} />
                                    </TableCell>
                                    <TableCell sx={{ color: "white", borderBottom: "none" }}>
                                        {audio.nameOfMusic}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "left", borderBottom: "none", color: "white" }}>
                                        {/* Displaying the time/duration */}
                                        {durations[audio._id] ? formatDuration(durations[audio._id]) : 'Loading...'}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "left", borderBottom: "none" }}>
                                        <Link href={audio.audio} underline="none">
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
