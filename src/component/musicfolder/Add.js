import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, CircularProgress, Switch, Typography } from '@mui/material';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';


function Add() {
  const [formData, setFormData] = useState({
    type: '',
    nameOfMusic: '',
    language: '',
    img: null,
    audio: null,
  });
  const [tog, settog] = useState(true)


  const [imagePreview, setImagePreview] = useState(null); // State to store image preview
  const [audioFileName, setAudioFileName] = useState(''); // State to store selected audio file name
  const [musicList, setMusicList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [playingIndex, setPlayingIndex] = useState(null); // State to track the index of the currently playing audio
  const [audioRefs, setAudioRefs] = useState([]); // To store references to all audio elements
  const [checked, setChecked] = React.useState(true);
  const authToken = window.localStorage.getItem("auto");
  const [editId, seteditId] = useState()
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };

  // Fetch music list on component mount
  useEffect(() => {
    axios.get('http://localhost:3005/publicmusic/mymusic', {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log(response);
        setMusicList(response.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch music list');
        setIsLoading(false);
      });
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img' || name === 'audio') {
      if (name === 'img' && files[0]) {
        setImagePreview(URL.createObjectURL(files[0]));
      }
      if (name === 'audio' && files[0]) {
        setAudioFileName(files[0].name); // Store audio file name
      }
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tog);

    if (tog) {
      // For new music submission
      if (!formData.img || !formData.audio) {
        setError('Both image and audio files are required');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('type', formData.type);
      formDataToSend.append('nameOfMusic', formData.nameOfMusic);
      formDataToSend.append('language', formData.language);
      formDataToSend.append('img', formData.img);
      formDataToSend.append('audio', formData.audio);
      formDataToSend.append('publicmusic', checked); // Add the public/private status

      setIsSubmitting(true);

      axios.post('http://localhost:3005/publicmusic/create', formDataToSend, {
        headers: {
          'Authorization': authToken,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          setIsSubmitting(false);
          setMusicList([response.data.data, ...musicList]);
          // Reset form
          setFormData({ type: '', nameOfMusic: '', language: '', img: null, audio: null });
          setImagePreview(null);
          setAudioFileName('');
          setError('');
        })
        .catch(err => {
          setIsSubmitting(false);
          setError('Failed to add music');
          console.error(err);
        });
    } else {
      // For updating existing music
      const formDataToUpdate = new FormData();
      formDataToUpdate.append('type', formData.type);
      formDataToUpdate.append('nameOfMusic', formData.nameOfMusic);
      formDataToUpdate.append('language', formData.language);
      formDataToUpdate.append('publicmusic', checked);

      // Only append files if they are new File objects
      if (formData.img instanceof File) {
        formDataToUpdate.append('img', formData.img);
      }
      if (formData.audio instanceof File) {
        formDataToUpdate.append('audio', formData.audio);
      }

      setIsSubmitting(true);

      axios.patch(`http://localhost:3005/publicmusic/updete/${editId}`, formDataToUpdate, {
        headers: {
          'Authorization': authToken,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          setIsSubmitting(false);
          if (response.data.status === 'success') {
            // Update the music list with the updated item
            setMusicList(musicList.map(music =>
              music._id === editId ? response.data.data : music
            ));

            // Reset form
            setFormData({ type: '', nameOfMusic: '', language: '', img: null, audio: null });
            setImagePreview(null);
            setAudioFileName('');
            settog(true);
            setError('');
          }
        })
        .catch((err) => {
          setIsSubmitting(false);
          setError(err.response?.data?.message || 'Error updating music');
          console.error(err);
        });
    }
  };

  // Handle deletion of music
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3005/publicmusic/Delete/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((data) => {
        console.log(data);

        setMusicList(musicList.filter(music => music._id !== id)); // Remove deleted music from the list
      })
      .catch(err => {
        setError('Failed to delete music');
        console.error(err);
      });
  };

  // Handle updating music
  const handleUpdate = (music) => {
    seteditId(music._id);
    setFormData({
      type: music.type,
      nameOfMusic: music.nameOfMusic,
      language: music.language,
      img: music.img,
      audio: music.audio
    });
    setImagePreview(music.img);
    setChecked(music.publicmusic);
    settog(false);

    if (music.audio) {
      const audioFileName = music.audio.split('/').pop();
      setAudioFileName(audioFileName);
    }
  };

  // Handle play/pause button click
  const handlePlayPause = (audioFile, index) => {

    // If the clicked song is already playing, pause it
    if (playingIndex === index) {
      audioRefs[index].pause();
      setPlayingIndex(null);
    } else {
      // Pause any previously playing audio
      if (playingIndex !== null) {
        audioRefs[playingIndex].pause();
      }

      // Play the new audio
      const audio = new Audio(audioFile);
      audio.play();
      // Save the reference to the audio element in the audioRefs array
      setAudioRefs((prev) => {
        const newRefs = [...prev];
        newRefs[index] = audio;
        return newRefs;
      });

      setPlayingIndex(index); // Update the playing index
    }
  };

  return (
    <Box sx={{ width: '90%', margin: '40px auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: '10px', 
          alignItems: isMobile ? 'stretch' : 'center' 
        }}>
          <TextField
            label="Music Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            sx={{
              width: isMobile ? '100%' : '20%',
              '& .MuiInputBase-root': {
                color: 'white', // Text color inside the input field
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Label color
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Border color (optional)
              },
            }}
            margin="normal"
          />

          <TextField
            label="Music Name"
            name="nameOfMusic"
            value={formData.nameOfMusic}
            onChange={handleChange}
            required
            sx={{
              width: isMobile ? '100%' : '20%',
              '& .MuiInputBase-root': {
                color: 'white', // Text color inside the input field
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Label color
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Border color (optional)
              },
            }}
            margin="normal"
          />

          <TextField
            label="Language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
            sx={{
              width: isMobile ? '100%' : '20%',
              '& .MuiInputBase-root': {
                color: 'white', // Text color inside the input field
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Label color
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Border color (optional)
              },
            }}
            margin="normal"
          />
          <Switch
            checked={checked}
            onChange={handleChangeSwitch}
            inputProps={{ 'aria-label': 'controlled' }}
          />

          <input
            type="file"
            name="img"
            id="upimg"
            accept="image/*"
            onChange={handleChange}
            style={{ display: 'none' }}
          />

          {imagePreview || formData.img ? (
            <label htmlFor="upimg">
              <Box sx={{ marginTop: '10px' }}>
                <img src={imagePreview || formData.img} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              </Box>
            </label>
          ) : (
            <label htmlFor="upimg">
              <Box sx={{ width: '150px', backgroundColor: 'white', height: "50px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                Upload Image
              </Box>
            </label>
          )}

          <input
            type="file"
            name="audio"
            accept="audio/*"
            id="audioUpload"
            onChange={handleChange}
            style={{ display: 'none' }}
          />

          {audioFileName || formData.audio ? (
            <label htmlFor="audioUpload">
              <Box sx={{ width: '150px', backgroundColor: 'white', height: "50px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {audioFileName || formData.audio.split('/').pop()}
              </Box>
            </label>
          ) : (
            <label htmlFor="audioUpload">
              <Box sx={{ width: '150px', backgroundColor: 'white', height: "50px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                Upload Audio
              </Box>
            </label>
          )}

          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }} disabled={isSubmitting}>
            {tog ? 'Add Music' : "Upload"}
          </Button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Box sx={{ marginTop: '40px', width: '100%' }}>
          {isLoading ? (
            <CircularProgress />
          ) : isMobile ? (
            // Mobile Card View
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {musicList.map((music, index) => (
                <Box
                  key={music._id}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img
                      src={music.img}
                      alt={music.nameOfMusic}
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                        {music.nameOfMusic}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 0.5 }}>
                        {music.language}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Type: {music.type}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Box
                      sx={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: music.publicmusic ? "green" : "red"
                      }}
                    />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {music.publicmusic ? "Public" : "Private"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() => handlePlayPause(music.audio, index)}
                      fullWidth
                    >
                      {playingIndex === index ? 'Pause' : 'Play'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="secondary"
                      onClick={() => { handleUpdate(music); settog(false) }}
                      fullWidth
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(music._id)}
                      fullWidth
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            // Desktop Table View
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #444' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Image</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Language</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {musicList.map((music, index) => (
                  <tr key={music._id} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '12px' }}>
                      <img
                        src={music.img}
                        alt={music.nameOfMusic}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '12px' }}>{music.nameOfMusic}</td>
                    <td style={{ padding: '12px' }}>{music.language}</td>
                    <td style={{ padding: '12px' }}>{music.type}</td>
                    <td style={{ padding: '12px' }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: "10px",
                            height: "10px",
                            marginRight: "10px",
                            borderRadius: "50%",
                            backgroundColor: music.publicmusic ? "green" : "red"
                          }}
                        />
                        {music.publicmusic ? "Public" : "Private"}
                      </Box>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          onClick={() => handlePlayPause(music.audio, index)}
                        >
                          {playingIndex === index ? 'Pause' : 'Play'}
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="secondary"
                          onClick={() => { handleUpdate(music); settog(false) }}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(music._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Add;
