import { Box } from '@mui/material';
import React, { useState } from 'react';
import Sidemanu from './Sidemanu/Sidemanu';
import Showdata from './Showdata';
import Cantrol from './Cantrol';
import Sidedata from './Sidedata';

function Home({data,setdata,dataofmu,setdataofmu,chengmusic,setchengmusic,data1}) {
 

    const handleNextMusic = () => {
        const currentIndex = data.listofmusic.findIndex(music => music.name === dataofmu.name);
        const nextMusic = data.listofmusic[(currentIndex + 1) % data.listofmusic.length];
        setdataofmu(nextMusic); // Update to next music
    };

    return (
        <Box sx={{ width: "100%", display: "flex", height: "100%" }}>
            <Sidemanu list={data} setdata={setdata} data={data1} />
            <Showdata list={data} setdataofmu={setdataofmu} dataofmu={dataofmu} chengmusic={chengmusic} setchengmusic={handleNextMusic} />
            <Sidedata dataofmu={dataofmu} data1={data1} setdata={setdata} data={data} setdataofmu={setdataofmu} />
            <Cantrol dataofmu={dataofmu} setchengmusic={handleNextMusic} />
        </Box>
    );
}

export default Home;
