import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Sidemanu from './Sidemanu/Sidemanu';
import Showdata from './Showdata';
import Cantrol from './Cantrol';
import Sidedata from './Sidedata';

function Home({ data, setdata, dataofmu, setdataofmu, chengmusic, setchengmusic, data1, musiclist }) {
    const [tog, settog] = useState(true)


    const handleNextMusic = () => {
        if (tog) {
            if (musiclist && dataofmu) {
                // Find the index of current music
                const currentIndex = musiclist.findIndex(music => music._id === dataofmu._id);
                // If current music is found and it's not the last one
                if (currentIndex !== -1 && currentIndex < musiclist.length - 1) {
                    // Play next music
                    setdataofmu(musiclist[currentIndex + 1]);
                } else {
                    // If it's the last song, loop back to first song
                    setdataofmu(musiclist[0]);
                }
            }
        } else {
            // When music is changed from Showdata
            if (data && data.playlists && dataofmu) {
                const currentIndex = data.playlists.findIndex(music => music._id === dataofmu._id);
                if (currentIndex !== -1 && currentIndex < data.playlists.length - 1) {
                    setdataofmu(data.playlists[currentIndex + 1]);
                } else {
                    setdataofmu(data.playlists[0]);
                }
            }
        }
    };
    useEffect(() => {
        console.log(dataofmu);
    }, [dataofmu])
    const [a, seta] = useState(data1)
    useEffect(() => {
        seta(data1)
    }, [data1])
    return (
        <Box sx={{ width: "100%", display: "flex", height: "100%" }}>
            <Sidemanu list={data} setdata={setdata} data={a} />
            <Showdata settog={settog} list={data} setdataofmu={setdataofmu} dataofmu={dataofmu} chengmusic={chengmusic} setchengmusic={handleNextMusic} />
            <Sidedata dataofmu={dataofmu} data1={data1} setdata={setdata} data={data} setdataofmu={setdataofmu} musiclist={musiclist} />
            <Cantrol dataofmu={dataofmu} setchengmusic={handleNextMusic} id={dataofmu ? dataofmu._id : ""} />
        </Box>
    );
}

export default Home;
