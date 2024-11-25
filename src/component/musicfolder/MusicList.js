import React from 'react';
import { Box, Button, Switch, CircularProgress } from '@mui/material';

function MusicList({ 
  musicList, 
  isLoading, 
  playingIndex, 
  handlePlayPause, 
  handleChangeSwitch, 
  checked, 
  handleUpdate, 
  handleDelete, 
  settog 
}) {
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {musicList.map((music, index) => (
        <Box 
          key={music._id} 
          sx={{ 
            marginBottom: '20px', 
            width: '100%', 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            color: "white" 
          }}
        >
          <img 
            src={music.img} 
            alt={music.nameOfMusic} 
            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
          />
          <h4>{music.nameOfMusic}</h4>
          <p>{music.language}</p>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => handlePlayPause(music.audio, index)}
          >
            {playingIndex === index ? 'Pause' : 'Play'}
          </Button>
          
          <Switch
            checked={checked}
            onChange={handleChangeSwitch}
            inputProps={{ 'aria-label': 'controlled' }}
          />

          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => { handleUpdate(music); settog(false) }}
          >
            Update
          </Button>

          <Button 
            variant="outlined" 
            color="error" 
            onClick={() => handleDelete(music._id)} 
            sx={{ marginLeft: '10px' }}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
}

export default MusicList; 