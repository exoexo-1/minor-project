import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './audioplayer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AudioPlayer() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Check if there's a saved song in localStorage when the component mounts
    const savedSong = localStorage.getItem('currentSong');
    if (savedSong) {
      setCurrentSong(JSON.parse(savedSong));  // Parse the song data from localStorage
    } else {
      // If no song is saved, fetch a random one initially
      axios
        .get('http://localhost:8080/api/songs/all')
        .then((response) => {
          const randomSong = response.data[Math.floor(Math.random() * response.data.length)];
          setCurrentSong(randomSong);
        })
        .catch((error) => console.error('Error fetching songs:', error));
    }
  }, []);  // This only runs once on mount

  useEffect(() => {
    if (currentSong) {
      // Whenever currentSong changes, store it in localStorage
      localStorage.setItem('currentSong', JSON.stringify(currentSong));
      playSong(currentSong);  // Play the song after it's set
    }
  }, [currentSong]);  // This runs whenever currentSong changes

  const playSong = (song) => {
    // Pause and reset any current song
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    const fileName = song.filePath.replace("C:/minor1/music files mp3/", '').replace(/\\/g, '/').replace(/ /g, '%20');
    const songUrl = `http://localhost:8080/songs/${fileName}`;

    const newAudio = new Audio(songUrl);
    newAudio.onloadedmetadata = () => {
      setDuration(newAudio.duration);
      newAudio.play().catch((error) => {
        console.error('Error playing the audio:', error);
      });
      setIsPlaying(true);
    };

    newAudio.onerror = () => {
      console.error('Audio load error: Cannot play the file', songUrl);
    };

    newAudio.ontimeupdate = () => {
      setCurrentTime(newAudio.currentTime);
    };

    newAudio.onended = () => {
      handleNextSong();
    };

    setAudio(newAudio);
  };

  const handlePlayPause = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((error) => {
        console.error('Error playing the audio:', error);
      });
      setIsPlaying(true);
    }
  };

  const handleNextSong = () => {
    if (currentSong) {
      axios
        .get(`http://localhost:8080/api/songs/next/${currentSong.songId}`)
        .then((response) => {
          const nextSong = response.data;
          setCurrentSong(nextSong);
        })
        .catch((error) => console.error('Error fetching next song:', error));
    }
  };

  const handlePreviousSong = () => {
    if (currentSong) {
      axios
        .get(`http://localhost:8080/api/songs/previous/${currentSong.songId}`)
        .then((response) => {
          const previousSong = response.data;
          setCurrentSong(previousSong);
        })
        .catch((error) => console.error('Error fetching previous song:', error));
    }
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
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
