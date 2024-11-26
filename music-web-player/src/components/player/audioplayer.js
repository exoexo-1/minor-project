import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './audioplayer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AudioPlayer() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audio, setAudio] = useState(null); 
  const navigate = useNavigate();

  // Fetch random song when no song is selected
  useEffect(() => {
    if (!currentSong) {
      axios
        .get('http://localhost:8080/api/songs/all')
        .then((response) => {
          const randomSong = response.data[Math.floor(Math.random() * response.data.length)];
          setCurrentSong(randomSong);
          playSong(randomSong);
        })
        .catch((error) => console.error('Error fetching songs:', error));
    }
  }, [currentSong]);

  // Handle song play/pause
  const handlePlayPause = () => {
    if (!audio) {
      return;
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((error) => {
        console.error("Error playing the audio:", error);
      });
      setIsPlaying(true);
    }
  };

  // Play song from URL
  const playSong = (song) => {
    if (audio) {
      audio.pause();  // Pause the current audio if any
    }
  
    // Ensure the file path uses forward slashes for URLs
    const songPath = song.filePath.replace(/\\/g, '/'); // Adjust path for URL format
  
    // Make sure the path is relative to the static folder served by Spring Boot
    const newAudio = new Audio(`http://localhost:8080/${songPath}`);
    setAudio(newAudio);  // Set the new audio object
    setDuration(newAudio.duration);
    setIsPlaying(true);
  
    newAudio.ontimeupdate = () => {
      setCurrentTime(newAudio.currentTime);
    };
  };
  

  // Fetch next song
  const handleNextSong = () => {
    if (currentSong) {
      axios
        .get(`http://localhost:8080/api/songs/next/${currentSong.songId}`)
        .then((response) => {
          const nextSong = response.data;
          setCurrentSong(nextSong);
          playSong(nextSong);
        })
        .catch((error) => console.error('Error fetching next song:', error));
    }
  };

  // Fetch previous song
  const handlePreviousSong = () => {
    if (currentSong) {
      axios
        .get(`http://localhost:8080/api/songs/previous/${currentSong.songId}`)
        .then((response) => {
          const previousSong = response.data;
          setCurrentSong(previousSong);
          playSong(previousSong);
        })
        .catch((error) => console.error('Error fetching previous song:', error));
    }
  };

  // Handle song progress change
  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Navigate to library after clicking play from search
  const handleSearchPlay = (song) => {
    setCurrentSong(song);
    playSong(song);
    navigate('/library');
  };

  return (
    <div className="audio-player">
      <div className="controls">
        <i className="fa-solid fa-backward control-icon" onClick={handlePreviousSong}></i>
        <i
          className={`fa-solid ${isPlaying ? 'fa-pause-circle' : 'fa-play-circle'} control-icon`}
          onClick={handlePlayPause}
        ></i>
        <i className="fa-solid fa-forward control-icon" onClick={handleNextSong}></i>
      </div>

      <div className="track-info">
        <p className="song-title">{currentSong ? currentSong.title : 'Loading...'}</p>
        <p className="artist-name">{currentSong ? `Artist ID: ${currentSong.artistId}` : ''}</p>
      </div>

      <div className="timer">
        <p className="current-time">{formatTime(currentTime)}</p>
        <input
          type="range"
          name="progress"
          className="progress-bar"
          value={currentTime}
          max={duration}
          onChange={handleProgressChange}
        />
        <p className="total-time">{formatTime(duration)}</p>
      </div>
    </div>
  );
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default AudioPlayer;
