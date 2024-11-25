import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

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

  const authToken = window.localStorage.getItem("auto");

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
    console.log(tog);
    
    if (tog) {
      e.preventDefault();

      // Validate file inputs manually
      if (!formData.img || !formData.audio) {
        setError('Both image and audio files are required');
        return; // Prevent form submission if validation fails
      }

      const formDataToSend = new FormData();
      formDataToSend.append('type', formData.type);
      formDataToSend.append('nameOfMusic', formData.nameOfMusic);
      formDataToSend.append('language', formData.language);
      formDataToSend.append('img', formData.img);
      formDataToSend.append('audio', formData.audio);

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
          setFormData({ type: '', nameOfMusic: '', language: '', img: null, audio: null });
          setImagePreview(null); // Clear the image preview after submit
          setAudioFileName(''); // Clear the audio file name after submit
        })
        .catch(err => {
          setIsSubmitting(false);
          setError('Failed to add music');
          console.error(err);
        });
    } else {

    }

  };

  // Handle deletion of music
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3005/publicmusic/Delete/${id}`)
      .then(() => {
        setMusicList(musicList.filter(music => music._id !== id)); // Remove deleted music from the list
      })
      .catch(err => {
        setError('Failed to delete music');
        console.error(err);
      });
  };

  // Handle updating music
  const handleUpdate = (music) => {
    setFormData(music);
    setImagePreview(music.img);
    // Extract the audio file name from the URL and set it
    if (music.audio) {
      const audioFileName = music.audio.split('/').pop(); // Extract the file name from the URL
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
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <TextField
            label="Music Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            sx={{
              width: '20%',
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
              width: '20%',
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
              width: '20%',
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

          <input
            type="file"
            name="img"
            id="upimg"
            accept="image/*"
            onChange={handleChange}
            required
            style={{ width: '20%', display: 'none' }}
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
            required
            style={{ width: '20%', display: 'none' }}
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
            {tog ? 'Add Music' :"Upload" }
          </Button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Box sx={{ marginTop: '40px', width: '100%' }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {musicList.map((music, index) => (
                <Box key={music._id} sx={{ marginBottom: '20px', width: '100%', display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" }}>
                  <img src={music.img} alt={music.nameOfMusic} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  <h4>{music.nameOfMusic}</h4>
                  <p>{music.language}</p>

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handlePlayPause(music.audio, index)}
                  >
                    {playingIndex === index ? 'Pause' : 'Play'}
                  </Button>

                  <Button variant="outlined" color="secondary" onClick={() => { handleUpdate(music); settog(false) }}>
                    Update
                  </Button>

                  <Button variant="outlined" color="error" onClick={() => handleDelete(music._id)} sx={{ marginLeft: '10px' }}>
                    Delete
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Add;
