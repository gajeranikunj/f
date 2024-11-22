import { Box, Typography, Grid, Stack } from '@mui/material'
import React from 'react'

function Overview({ isSm, userdata }) {
  return (
    <Box >
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" className='nunito-sans' color="#012970" fontWeight={600} marginBottom="15px">
            About
          </Typography>
          <Typography fontSize="14.5px" gutterBottom>
            {userdata && userdata.profile.about != null ? userdata.profile.about : "unset About data"}
          </Typography>

        </Box>
        <Box>
          <Typography variant="h6" className='nunito-sans' color="#012970" fontWeight={600} marginBottom="15px">
            Profile Details
          </Typography>
          <Grid container alignItems="center" spacing={isSm ? 1 : 0}>
            <Grid item sm={3} xs={12} >
              <Typography variant="subtitle1" className='nunito-sans' marginBottom={isSm ? "5.6px" : "0px"} color="rgba(1, 41, 112, 0.6)" fontWeight={700}>
                Name
              </Typography>

            </Grid>
            <Grid item sm={9} xs={12}>
              <Typography variant="body1" marginBottom={isSm ? "5.6px" : "12px"} color="#000">
                {userdata && userdata.name}
              </Typography>

            </Grid>


            <Grid item sm={3} xs={12} >
              <Typography variant="subtitle1" className='nunito-sans' marginBottom={isSm ? "5.6px" : "0px"} color="rgba(1, 41, 112, 0.6)" fontWeight={700}>
                Country
              </Typography>
            </Grid>
            <Grid item sm={9} xs={12}>
              <Typography variant="body1" marginBottom={isSm ? "5.6px" : "12px"} color="#000">
                {userdata && userdata.profile.country != null? userdata.profile.country : "undefined control"}
              </Typography>
            </Grid>

            <Grid item sm={3} xs={12} >
              <Typography variant="subtitle1" className='nunito-sans' marginBottom={isSm ? "5.6px" : "0px"} color="rgba(1, 41, 112, 0.6)" fontWeight={700}>
                Email
              </Typography>
            </Grid>
            <Grid item sm={9} xs={12}>
              <Typography variant="body1" marginBottom={isSm ? "5.6px" : "12px"} color="#000">
                {userdata && userdata.email}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  )
}

export default Overview