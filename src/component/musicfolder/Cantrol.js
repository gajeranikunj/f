import { Box, Slider } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import MusicControl from './MusicControl';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';

function Cantrol({ dataofmu, setchengmusic, id }) {
console.log(id);

    const [data, setData] = useState(dataofmu);
    const [audioDuration, setAudioDuration] = useState(null); // Audio duration
    const [volumeValue, setVolumeValue] = useState(50); // Volume level
    const [isPlaying, setIsPlaying] = useState(true); // Is the audio playing?
    const [currentTime, setCurrentTime] = useState(0); // Track current time of audio
    const audioRef = useRef(null); // Ref for the audio element

    useEffect(() => {
        setData(null);
        setTimeout(() => {
            setData(dataofmu);
        }, 100);
    }, [dataofmu]);

    // Set the audio duration when data changes
    useEffect(() => {
        if (data && data.audio) {
            const audio = new Audio(data.audio);
            audio.onloadedmetadata = () => {
                setAudioDuration(audio.duration); // Set the duration once metadata is loaded
                setCurrentTime(0);
            };
        }
    }, [data]);

    // Handle volume change
    const handleVolumeChange = (event, newValue) => {
        setVolumeValue(newValue);
        if (audioRef.current) {
            audioRef.current.volume = newValue / 100; // Normalize volume to 0-1 range
        }
    };

    // Handle play/pause toggle
    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Handle fast rewind (10 seconds)
    const handleFastRewind = () => {
        if (audioRef.current) {
            audioRef.current.currentTime -= 10; // Rewind 10 seconds
        }
    };

    // Handle fast forward (10 seconds)
    const handleFastForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime += 10; // Fast forward 10 seconds
        }
    };

    // Update current time during audio playback
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime); // Update current time on each time update
        }
    };

    // Sync audio time with the slider
    const handleSliderChange = (_, newTime) => {
        if (audioRef.current) {
            audioRef.current.currentTime = newTime; // Update the audio's current time based on the slider value
        }
        setCurrentTime(newTime); // Update the state with the new current time
    };

    // Handle audio ended (when the current music finishes)
    const handleAudioEnded = () => {
        if (setchengmusic) {
            setchengmusic({ listmu: true }); // Update the music in parent (set to the next music)
        }
    };

    return (
        <>
            {data && (
                <Box
                    sx={{
                        width: { xs: '100%', sm: 'calc(100% - 80px)' },
                        height: { xs: '140px', sm: '100px' },
                        display: "flex",
                        position: "fixed",
                        alignItems: "center",
                        bottom: { xs: 0, sm: "30px" },
                        left: { xs: 0, sm: 40 },
                        zIndex: "9999",
                        backgroundColor: "#202020",
                        padding: { xs: '10px', sm: '0px' },
                        flexDirection: { xs: 'column', sm: 'row' }
                    }}
                >
                    <Box sx={{ 
                        marginLeft: { xs: "0px", sm: "20px" }, 
                        display: "flex", 
                        alignItems: "center", 
                        width: "100%",
                        flexDirection: { xs: 'column', sm: 'row' }
                    }}>
                        <Box sx={{ 
                            width: { xs: "100%", sm: "30%" }, 
                            display: "flex", 
                            alignItems: "center",
                            marginBottom: { xs: '10px', sm: '0' }
                        }}>
                            <Box component="img" 
                                sx={{ width: { xs: "50px", sm: "70px" } }} 
                                src={data.img} 
                                alt={data.name} 
                            />
                            <Box sx={{ 
                                color: "white", 
                                fontSize: { xs: "16px", sm: "20px" }, 
                                marginLeft: "20px",
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: { xs: '200px', sm: '300px' }
                            }}>
                                Name: {data.nameOfMusic}
                            </Box>

                            <Box component="audio" ref={audioRef} controls sx={{ display: "none" }}
                                onTimeUpdate={handleTimeUpdate} onEnded={handleAudioEnded} autoPlay>
                                <source src={data.audio} type="audio/mpeg" />
                            </Box>
                        </Box>

                        <Box sx={{ 
                            width: { xs: "100%", sm: "50%" },
                            marginBottom: { xs: '10px', sm: '0' }
                        }}>
                            {data && (
                                <MusicControl 
                                    time={audioDuration ? audioDuration.toFixed(2) : 'Loading...'} 
                                    currentTime={currentTime} 
                                    onSliderChange={handleSliderChange} 
                                />
                            )}
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Box sx={{ color: "white" }}>
                                    <FastRewindIcon onClick={handleFastRewind} sx={{ color: "white", fontSize: { xs: "24px", sm: "28px" } }} />
                                    {isPlaying ? (
                                        <PauseIcon onClick={handlePlayPause} sx={{ fontSize: { xs: "26px", sm: "30px" }, color: "white" }} />
                                    ) : (
                                        <PlayArrowIcon onClick={handlePlayPause} sx={{ fontSize: { xs: "26px", sm: "30px" }, color: "white" }} />
                                    )}
                                    <FastForwardIcon onClick={handleFastForward} sx={{ color: "white", fontSize: { xs: "24px", sm: "28px" } }} />
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ 
                            display: "flex", 
                            color: "white", 
                            alignItems: "center",
                            justifyContent: { xs: 'center', sm: 'flex-start' },
                            width: { xs: '100%', sm: 'auto' }
                        }}>
                            {volumeValue === 0 ? (
                                <VolumeOffIcon sx={{ color: "white" }} />
                            ) : volumeValue < 50 ? (
                                <VolumeDown sx={{ color: "white" }} />
                            ) : (
                                <VolumeUp sx={{ color: "white" }} />
                            )}
                            <Slider
                                min={0}
                                max={100}
                                defaultValue={50}
                                aria-label="Volume"
                                valueLabelDisplay="auto"
                                value={volumeValue}
                                onChange={handleVolumeChange}
                                sx={{ 
                                    width: { xs: "150px", sm: "100px" }, 
                                    marginLeft: "15px", 
                                    color: "white" 
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default Cantrol;
