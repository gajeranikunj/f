import { Box } from '@mui/material'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";


function Sidedata({ data1, setdata, data, setdataofmu }) {
    return (
        <>
            {data == undefined ?
                data1 && (
                    <Box sx={{ margin: "auto", marginTop: "25px", width: "90%" }}>
                        <Box sx={{ color: "white", paddingLeft: "20px", fontSize: "20px", marginBottom: "10px" }}>
                            Popular artists:
                        </Box>
                        <Box sx={{ margin: "auto", display: "flex" }}>
                            {
                                data1.map((item) => (
                                    <Box sx={{ paddingLeft: "20px" }} onClick={() => setdata(item)}>
                                        <Box sx={{ width: "150px", height: "150px", backgroundImage: `url(${item.img})`, backgroundSize: "cover" }}>
                                        </Box>
                                        <Box sx={{ color: "white" }}>
                                            {item.name}
                                        </Box>

                                    </Box>
                                ))
                            }
                            {/* {data.name} */}
                        </Box>
                        <Box sx={{ marginTop: "20px" }}>
                            <Box sx={{ color: "white", paddingLeft: "20px", fontSize: "20px", marginBottom: "10px" }}>
                                Popular music:
                            </Box>
                            <Swiper style={{ width: window.innerWidth - 370 }} watchSlidesProgress={true} slidesPerView={window.innerWidth<400?2:5} className="mySwiper">
                                {
                                    data1.map((item1) => (
                                        item1.listofmusic.map((item) => (
                                            <SwiperSlide>
                                                <Box sx={{ paddingLeft: "20px" }} onClick={() => { setdataofmu(item); setdata(item1) }}>
                                                    <Box sx={{ width: "150px", height: "150px", backgroundImage: `url(${item.img})`, backgroundSize: "cover" }} />
                                                    <Box sx={{ color: "white" }}>
                                                        {item.name}
                                                    </Box>
                                                </Box>
                                            </SwiperSlide>
                                        ))
                                    ))
                                }

                            </Swiper>

                        </Box>
                    </Box>
                ) : ""
            }
        </>
    )
}

export default Sidedata
